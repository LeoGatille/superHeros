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
        displayedList: 'dashboard',
        heroList: [],
        favoriteHeroList: [],
        allHeroesPage: 0,
        pages: {
            favorites: 0,
            allHeroes: 0,
        },
        dashboardPage: 0,
        totalItems: 0,
        requestedName: '',
        maxPage: 0,
        showSettings: false,
        searchValue: '',
        limit: 20,
        orderBy: 'name',
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
        //* Displayed List
        SET_DISPLAYED_LIST(state, listType) {
            state.displayedList = listType;
        },
        //*Loading
        SET_LOADING_LIST(state, isLoading) {
            state.loadingList = isLoading;
        },
        //*State items
        SET_HEROES_LIST(state, heroList) {
            state.heroList = [];
            heroList.forEach(hero => {
                state.heroList.push(Object.assign({}, hero))
            });
            // state.heroList = heroList;
        },
        SET_TOTAL_ITEMS(state, nbItems) {
            state.totalItems = nbItems;
        },
        SET_MAX_PAGE(state, nbItems) {
            state.maxPage = Math.floor(nbItems / state.limit);
        },
        //* Favorites Heroes
        SET_FAVORITE_LIST(state, heroes) {
            state.favoriteHeroList = heroes;
        },
        SET_CURRENT_PAGE(state, {shiftValue, targetPage}) {
            state[targetPage] += shiftValue;
        },
        SET_REQUESTED_NAME(state, name) {
            state.requestedName = name;
        },
        SET_SETTINGS_DISPLAY(state) {
            state.showSettings = !state.showSettings
        },
        CHANGE_PAGE(state, {pageIndex, pageName}) {
            state.pages[pageName] = pageIndex;
        },
        //? I'll see later how to handle notifications
        // SET_NOTIFICATION(state, payload) {
        //   state.notification
        // }
        ADD_HERO(state, hero) {
            state.favoriteHeroList.push(hero);
        },
        REMOVE_HERO(state, idHero) {
            state.favoriteHeroList = state.favoriteHeroList.filter(hero => {
                return hero.id !== idHero
            })
        },
        EDIT_HERO(state, hero) {
            const heroToUpdate = state.favoriteHeroList.find(favHero => {
                return favHero.id === hero.id
            });
            Object.assign(heroToUpdate, hero);
        },
        RESET_HERO(state, hero) {
            const heroToReset = state.favoriteHeroList.find(favHero => {
                return favHero.id === hero.id
            });
            Object.assign(heroToReset, hero);
        },
        SET_LIMIT(state, limit) {
            state.limit = limit;
        },
        SET_SEARCH_VALUE(state, searchValue) {
            state.searchValue = searchValue;
        },
        SET_ORDER_BY(state, orderBy) {
            state.orderBy = orderBy;
        }
    },
    actions: {
        createHeroesLocalStorage({commit}) {
            if (!("savedHeroes" in localStorage)) {
                commit('CREATE_HEROES_LOCAL_STORAGE',);
                commit('SET_LOCAL_STORAGE_STATE', true)
            } else {
                commit('SET_LOCAL_STORAGE_STATE', true)
            }
        },
        setDisplayedList({commit}, listType) {
            commit('SET_DISPLAYED_LIST', listType);
        },
        fetchAllHeroes({commit, dispatch, state}) {
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
                    commit('SET_HEROES_LIST', response.data.data.results);
                    commit('SET_LOADING_LIST', false);
                })
                .catch(() => {
                    const notification = {
                        type: 'error',
                        message: i18n.t('notifications.fetch.error'),
                    }
                    dispatch('notifications/add', notification, {root: true})
                })
        },
        addOneHero({commit, dispatch}, hero) {
            hero.edited = false;
            hero.savedDate = new Date();
            const toSend = Object.assign({}, hero);
            return LocalService.addHero(toSend)
                .then(() => {
                    const notification = {
                        type: 'success',
                        message: i18n.t('notifications.add.success'),
                    }
                    dispatch('notifications/add', notification, {root: true})
                    commit('ADD_HERO', hero);
                    return true;
                })
        },
        removeOneHero({commit, dispatch}, idHero) {
            //! Change idHero to hero
            LocalService.removeHero(idHero)
                .then(() => {
                    const notification = {
                        type: 'success',
                        message: i18n.t('notifications.remove.success')
                    }
                    commit('REMOVE_HERO', idHero);
                    dispatch('notifications/add', notification, {root: true})
                })
                .catch((err) => {
                    console.log('WHY CATCH => ', err)
                    const notification = {
                        type: 'error',
                        message: i18n.t('notifications.remove.error')
                    }
                    dispatch('notifications/add', notification, {root: true})
                });
        },
        fetchDashboardHeroes({commit}) {
            commit('SET_LOADING_LIST', true);
            return LocalService.fetchHeroes()
                .then((localStorageHeroes => {
                    commit('SET_FAVORITE_LIST', localStorageHeroes);
                    commit('SET_TOTAL_ITEMS', localStorageHeroes.length);
                    commit('SET_MAX_PAGE', localStorageHeroes.length);
                    commit('SET_LOADING_LIST', false);
                }))
        },
        editHero({commit, dispatch}, hero) {
            if (hero.savedDate) {
                return LocalService.editHero(hero)
                    .then(hero => {
                        const notification = {
                            type: 'success',
                            message: hero.name + ' ' + i18n.t('notifications.edit.success')
                        };
                        commit('EDIT_HERO', hero);
                        dispatch('notifications/add', notification, {root: true});
                        return hero;
                    });
            } else {
                //! selection of the mutation should be done in the component
                hero.savedDate = new Date();
                return LocalService.addHero(hero)
                    .then(hero => {
                        const notification = {
                            type: 'success',
                            message: hero.name + ' ' + i18n.t('notifications.add.success')
                        }
                        commit('ADD_HERO', hero);
                        dispatch('notifications/add', notification, {root: true});
                        return hero;
                    })
            }
        },
        resetHero({commit, dispatch}, editedHero) {
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
        changePageIndex({commit}, {pageIndex, pageName}) {
            commit('CHANGE_PAGE', {pageIndex, pageName});
        },
        setRequestedName({commit}, name) {
            commit('SET_REQUESTED_NAME', name);
        },
        setSettingsDisplay({commit}) {
            commit('SET_SETTINGS_DISPLAY');
        },
        setQuery({commit}, {searchValue, limit, orderBy}) {
            commit('SET_LIMIT', limit);
            commit('SET_SEARCH_VALUE', searchValue);
            commit('SET_ORDER_BY', orderBy)
        }
    },
    getters: {
        getheroListByName: state => name => {
            return state[name];
        },
        getHeroBydId: state => (id, localStorage = false) => {
            return state[localStorage ? 'favoriteHeroList' : 'heroList'].find(hero => {
                return (hero ? hero.id : -1) === id;
            })
        },
        getRandomHero: state => {
            return state.heroList[1];
        }
    },
})
