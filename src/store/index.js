import Vue from 'vue';
import Vuex from 'vuex';
import marvelService from '@/api/services/marvelAPI/marvelService';
import LocalService from "@/api/services/LocalService";
import * as notifications from '@/store/modules/notifications/notifications'

import i18n from "@/i18n";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notifications,
    },
    state: {
        isLocalStorageReady: false,
        loadingList: false,
        heroList: [],
        favoriteHeroList: [],
        filteredFavoriteHeroList: [],
        pages: {
            favorites: 0,
            allHeroes: 0,
        },
        totalItems: 0,
        maxPage: 0,
        searchValue: '',
        limit: 20,
        orderBy: 'name',
        heroesDisplay: 'card',
        fatalError: false,
    },
    mutations: {
        //* Local storage
        CREATE_HEROES_LOCAL_STORAGE(state) {
            localStorage.setItem('savedHeroes', '[]');
            localStorage.setItem('total', '0');
            state.isLocalStorageReady = true;
        },
        SET_LOCAL_STORAGE_STATE(state, localeStorageState) {
            state.isLocalStorageReady = localeStorageState;
        },

        //*Loading
        SET_LOADING_LIST(state, isLoading) {
            state.loadingList = isLoading;
        },

        //* HeroList
        SET_HEROES_LIST(state, heroList) {
            state.heroList = [];
            heroList.forEach(hero => {
                state.heroList.push(Object.assign({}, hero))
            });
        },
        EDIT_ONE_HERO_REFERENCE(state, {hero, index}) {
            state.heroList.splice(index, 1, hero);
        },
        SET_FATAL_ERROR(state) {
            state.fatalError = true
        },

        //* LocalStorage
        SET_FAVORITE_LIST(state, heroes) {
            state.favoriteHeroList = heroes;
        },
        SET_FILTERED_FAVORITE_LIST(state, list) {
            state.filteredFavoriteHeroList = list
        },
        ADD_HERO(state, hero) {
            state.favoriteHeroList.push(hero);
        },
        REMOVE_HERO(state, idHero) {
            state.favoriteHeroList = state.favoriteHeroList.filter(hero => {
                return hero.id !== idHero
            });
        },
        EDIT_HERO(state, {hero, index}) {
            state.favoriteHeroList.splice(index, 1, hero);
        },
        RESET_HERO(state, hero) {
            const heroToReset = state.favoriteHeroList.find(favHero => {
                return favHero.id === hero.id
            });
            Object.assign(heroToReset, hero);
        },

        //* Pagination
        SET_TOTAL_ITEMS(state, nbItems) {
            state.totalItems = nbItems;
        },
        SET_MAX_PAGE(state, nbItems) {
            console.log('MaxPage => ', nbItems , state.limit, nbItems / state.limit)
            state.maxPage = Math.ceil(nbItems / state.limit);
        },
        SET_CURRENT_PAGE(state, {shiftValue, targetPage}) {
            state[targetPage] += shiftValue;
        },
        CHANGE_PAGE(state, {pageIndex, pageName}) {
            state.pages[pageName] = pageIndex;
        },

        //* Query
        SET_LIMIT(state, limit) {
            state.limit = limit;
        },
        SET_SEARCH_VALUE(state, searchValue) {
            state.searchValue = searchValue;
        },
        SET_ORDER_BY(state, orderBy) {
            state.orderBy = orderBy;
        },
        SET_HEROES_DISPLAY(state, display) {
            state.heroesDisplay = display
        }
    },
    actions: {
        //* Fetch Marvel's API
        fetchAllHeroes({commit, dispatch, state, getters}) {
            commit('SET_LOADING_LIST', true);
            marvelService.getAllHeroes({
                limit: state.limit,
                offset: (state.limit * state.pages.allHeroes),
                nameStartsWith: state.searchValue,
                orderBy: state.orderBy
            })
                .then(response => {
                    commit('SET_TOTAL_ITEMS', response.data.data.total); //? Might do the dot notation in the 'commit'...
                    commit('SET_MAX_PAGE', response.data.data.total);
                    const syncListWithLocalStorage = response.data.data.results;
                    syncListWithLocalStorage.forEach((hero, i) => {
                        if (getters.getHeroById(hero.id, true)) {
                            syncListWithLocalStorage.splice(i, 1, getters.getHeroById(hero.id, true));
                        }
                    })
                    commit('SET_HEROES_LIST', syncListWithLocalStorage);
                    commit('SET_LOADING_LIST', false);
                })
                .catch((err) => {
                    console.log('ERR => ', err)
                    const notification = {
                        type: 'error',
                        message: i18n.t('notifications.fetch.error'),
                    }
                    dispatch('notifications/add', notification, {root: true})
                    commit('SET_FATAL_ERROR')
                })
        },
        fetchOneHero({commit}, id) {
            return marvelService.getHeroById(id)
                .then(response => {
                    commit('SET_HEROES_LIST', [response.data.data.results[0]])
                })
        },

        //* LocalStorage
        createHeroesLocalStorage({commit}) {
            if (!("savedHeroes" in localStorage)) {
                commit('CREATE_HEROES_LOCAL_STORAGE',);
                commit('SET_LOCAL_STORAGE_STATE', true)
            } else {
                commit('SET_LOCAL_STORAGE_STATE', true)
            }
        },
        fetchDashboardHeroes({commit, state, dispatch}) {
            commit('SET_LOADING_LIST', true);
            return LocalService.fetchHeroes(state.searchValue, state.limit, state.orderBy)
                .then((localStorageHeroes => {
                    commit('SET_FAVORITE_LIST', localStorageHeroes);
                    // commit('SET_TOTAL_ITEMS', localStorageHeroes.length);
                    commit('SET_MAX_PAGE', localStorageHeroes.length)
                    dispatch('filterFavoriteHeroList')
                }))
        },
        filterFavoriteHeroList({commit, state}) {
            const filteredList = LocalService.filterList(state.favoriteHeroList, state.limit, (state.limit * state.pages.favorites), state.searchValue, state.orderBy);
            commit('SET_FILTERED_FAVORITE_LIST', filteredList);
            console.log('filteredLIst => ', state.favoriteHeroList)
            commit('SET_MAX_PAGE', state.searchValue.length ? filteredList : state.favoriteHeroList.length);

            commit('SET_LOADING_LIST', false);
        },

        //* Modification Hero
        addOneHero({commit, dispatch, getters}, hero) {
            Vue.set(hero, 'edited', false);
            Vue.set(hero, 'savedDate', new Date());
            const toSend = Object.assign({}, hero);
            return LocalService.addHero(toSend)
                .then(() => {
                    const notification = {
                        type: 'success',
                        message: i18n.t('notifications.add.success'),
                    }
                    if (getters.getHeroById(hero.id)) {
                        dispatch('editOneHeroReference', hero)
                    }
                    dispatch('notifications/add', notification, {root: true})
                    commit('ADD_HERO', hero);
                    dispatch('filterFavoriteHeroList')
                    return true;
                })
        },
        removeOneHero({commit, dispatch}, idHero) {
            return LocalService.removeHero(idHero)
                .then(() => {
                    const notification = {
                        type: 'success',
                        message: i18n.t('notifications.remove.success')
                    }
                    commit('REMOVE_HERO', idHero);
                    dispatch('filterFavoriteHeroList');
                    dispatch('notifications/add', notification, {root: true})
                    return marvelService.getHeroById(idHero)
                        .then(response => {
                            dispatch('editOneHeroReference', response.data.data.results[0])
                        })
                })
                .catch((err) => {
                    console.log('WHY CATCH => ', err)
                    const notification = {
                        type: 'error',
                        message: i18n.t('notifications.remove.error')
                    }
                    dispatch('filterFavoriteHeroList');
                    dispatch('notifications/add', notification, {root: true})
                });
        },
        editHero({commit, dispatch, getters}, hero) {
            if (hero.savedDate) {
                return LocalService.editHero(hero)
                    .then(hero => {
                        const notification = {
                            type: 'success',
                            message: hero.name + ' ' + i18n.t('notifications.edit.success')
                        };
                        commit('EDIT_HERO', {hero, index: getters.getHeroIndex(hero.id, true),});
                        dispatch('filterFavoriteHeroList')
                        if (getters.getHeroIndex(hero.id)) {
                            commit('EDIT_ONE_HERO_REFERENCE', {hero, index: getters.getHeroIndex(hero.id)})
                        }
                        dispatch('notifications/add', notification, {root: true});
                        return hero;
                    });
            } else {
                hero.savedDate = new Date();
                return LocalService.addHero(hero)
                    .then(hero => {
                        const notification = {
                            type: 'success',
                            message: hero.name + ' ' + i18n.t('notifications.add.success')
                        }
                        commit('ADD_HERO', hero);
                        dispatch('filterFavoriteHeroList')
                        commit('EDIT_ONE_HERO_REFERENCE', {hero, index: getters.getHeroIndex(hero.id)})
                        dispatch('notifications/add', notification, {root: true});
                        return hero;
                    })
            }
        },
        resetHero({commit, dispatch, getters}, editedHero) {
            return marvelService.getHeroById(editedHero.id)
                .then(response => {
                    const standardHero = response.data.data.results[0];
                    standardHero.savedDate = editedHero.savedDate;
                    standardHero.edited = false;
                    return LocalService.editHero(standardHero)
                        .then(hero => {
                            const notification = {
                                type: 'success',
                                message: hero.name + ' ' + i18n.t('notifications.reset.success')
                            }
                            commit('RESET_HERO', hero);
                            commit('EDIT_ONE_HERO_REFERENCE', {hero, index: getters.getHeroIndex(hero.id)})
                            dispatch('notifications/add', notification, {root: true});
                            return hero;
                        })
                })
                .catch(() => {
                    const notification = {
                        type: 'error',
                        message: i18n.t('notifications.reset.error') + ' ' + editedHero.name
                    }
                    dispatch('notifications/add', notification, {root: true});

                })
        },
        editOneHeroReference({commit, getters}, hero) {
            commit('EDIT_ONE_HERO_REFERENCE', {hero, index: getters.getHeroIndex(hero.id)});
        },

        //* Pagination
        changePageIndex({commit}, {pageIndex, pageName}) {
            commit('CHANGE_PAGE', {pageIndex, pageName});
        },
        setMaxPage({commit}, nbItems) {
            commit('SET_MAX_PAGE', nbItems);
        },

        //* Query
        setQuery({commit}, {searchValue, limit, orderBy}) {
            commit('SET_LIMIT', limit);
            commit('SET_SEARCH_VALUE', searchValue);
            commit('SET_ORDER_BY', orderBy)
        },
        setRequestedName({commit}, name) {
            commit('SET_REQUESTED_NAME', name);
        },
        setHeroesDisplay({commit}, display) {
            commit('SET_HEROES_DISPLAY', display)
        },
    },
    getters: {
        getHeroIndex: state => (id, localStorage = false) => {
            return state[localStorage ? 'favoriteHeroList' : 'heroList']
                .map(hero => {
                    return hero.id
                })
                .indexOf(id);
        },
        getHeroById: state => (id, localStorage = false) => {
            return state[localStorage ? 'favoriteHeroList' : 'heroList'].find(hero => {
                return (hero ? hero.id : -1) === id;
            })
        },
    },
})
