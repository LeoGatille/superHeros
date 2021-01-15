import Vue from 'vue';
import Vuex from 'vuex';
import marvelService from '@/api/services/marvelAPI/marvelService';
import LocalService from "@/api/services/LocalService";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLocalStorageReady: false,
        loadingList: false,
        displayedList: 'dashboard',
        heroList: [],
        favoriteHeroList: [],
        maxItemsPerPage: 20,
        // currentPage: 0, Must be removed when safe
        allHeroesPage: 0,
        pages: {
            dashboardHeroes: 0,
            allHeroes: 0,
        },
        dashboardPage: 0,
        totalItems: 0,
        requestedName: '',
        maxPage: 0,
        showSettings: false,
        searchValue: '',
        limit: 20,
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
            state.maxPage = Math.round(nbItems / state.maxItemsPerPage);
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
            const indexToRemove = state.favoriteHeroList
                .map(hero => {
                    return hero.id;
                })
                .indexOf(idHero);
            state.favoriteHeroList.splice(indexToRemove, 1);

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
        fetchAllHeroes({commit, state}) {
            commit('SET_LOADING_LIST', true);
            marvelService.getAllHeroes(
                state.limit,
                (state.limit * state.pages.allHeroes),
                state.searchValue,
            )
                .then(response => {
                    commit('SET_TOTAL_ITEMS', response.data.data.total); //? Might do the dot notation in the 'commit'...
                    commit('SET_MAX_PAGE', response.data.data.total);
                    commit('SET_HEROES_LIST', response.data.data.results);
                    commit('SET_LOADING_LIST', false);
                })
                .catch(err => {
                    console.log('fetchAllHeroes ERROR => ', err)
                    // commit('SET_NOTIFICATION', {type: 'error', message: 'Something went wrong ;('});
                })
        },
        addOneHero({commit}, hero) {
            hero.edited = false;
            hero.savedDate = new Date();
            const toSend = Object.assign({}, hero);
            return LocalService.addHero(toSend)
                .then(() => {
                    commit('ADD_HERO')
                    return true;
                })
        },
        removeOneHero({commit}, idHero) {
            LocalService.removeHero(idHero)
                .then(() => {
                    commit('REMOVE_HERO', idHero);
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
        editHero({commit}, hero) {
            if (hero.savedDate) {
                return LocalService.editHero(hero)
                    .then(hero => {
                        commit('EDIT_HERO', hero);
                        return hero;
                    });
            } else {
                hero.savedDate = new Date();
                return LocalService.addHero(hero)
                    .then(hero => {
                        commit('ADD_HERO', hero);
                        return hero;
                    })
            }
        },
        resetHero({commit}, editedHero) {
            return marvelService.getHeroById(editedHero.id)
                .then(response => {
                    const standardHero = response.data.data.results[0];
                    standardHero.savedDate = editedHero.savedDate;
                    standardHero.edited = false;
                    return LocalService.editHero(standardHero)
                        .then(hero => {
                            commit('RESET_HERO', hero);
                            return hero;
                        })
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
        setQuery({commit}, {searchValue, limit, pageName}) {
            console.log('setLIMIT => ',limit)
            commit('SET_LIMIT', limit);
            commit('SET_SEARCH_VALUE', searchValue);
            if(searchValue.length) {
                console.log('changePage')
                commit('CHANGE_PAGE', {pageIndex:0, pageName});
            }
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
