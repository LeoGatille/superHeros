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
    heroesList: [],
    maxItemsPerPage: 20,
    // currentPage: 0, Must be removed when safe
    allHeroesPage:0,
    pages: {
      dashboardHeroes:0,
      allHeroes:0,
    },
    dashboardPage:0,
    totalItems: 0,
    requestedName: '',
    maxPage: 0,
    showSettings: false,
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
    SET_HEROES_LIST(state, heroesList) {
      state.heroesList = [];
      heroesList.forEach(hero => {
        state.heroesList.push(Object.assign({},hero))
      });
      // state.heroesList = heroesList;
    },
    SET_TOTAL_ITEMS(state, nbItems) {
      state.totalItems = nbItems;
    },
    SET_MAX_PAGE(state, nbItems) {
      state.maxPage = Math.round(nbItems / state.maxItemsPerPage);
    },
    //* Favorites Heroes
    // ADD_ONE_HERO(state, hero) {
    //   const savedHeroesList = JSON.parse(localStorage.getItem("savedHeroes"));
    //   savedHeroesList.push(hero);
    //   localStorage.setItem("savedHeroes", JSON.stringify(savedHeroesList));
    // },
    SET_DASHBOARD_HEROES(state, heroes) {
      state.heroesList = heroes;
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
    DO_NOTHING() {

    }
  },
  actions: {
    createHeroesLocalStorage({commit}) {
      if(!("savedHeroes" in localStorage)) {
        commit('CREATE_HEROES_LOCAL_STORAGE',);
        commit('SET_LOCAL_STORAGE_STATE', true)
      } else {
        commit('SET_LOCAL_STORAGE_STATE', true)
      }
    },
    setDisplayedList({commit}, listType) {
      commit('SET_DISPLAYED_LIST', listType);
    },
    fetchAllHeroes({commit}) {
      commit('SET_LOADING_LIST', true);
      marvelService.getAllHeroes(
          this.state.limit,
          (this.state.maxItemsPerPage * this.state.pages.allHeroes)
          )
          .then(response => {
            commit('SET_TOTAL_ITEMS', response.data.data.total); //? Might do the dot notation in the 'commit'...
            commit('SET_MAX_PAGE', response.data.data.total);
            commit('SET_HEROES_LIST', response.data.data.results);
            commit('SET_LOADING_LIST', false);
          })
          .catch(err => {
            console.log('ERROR => ', err)
            // commit('SET_NOTIFICATION', {type: 'error', message: 'Something went wrong ;('});
          })
    },
    addOneHero({commit, getters}, idHero) {
       const toSend = Object.assign({}, getters.getHeroBydId(idHero));
      // const savedHeroesList = JSON.parse(localStorage.getItem("savedHeroes"));
      // savedHeroesList.push(hero);
      // localStorage.setItem("savedHeroes", JSON.stringify(savedHeroesList));
      // commit('DO_NOTHING')
      return LocalService.addHero(toSend)
          .then(res => {
            console.log('AddHero res => ', res)
            commit('DO_NOTHING')
            return true;
            // commit('ADD_ONE_HERO', hero);
          })
    },
    removeOneHero({commit, state}, idHero) {
      LocalService.removeHero(idHero)
          .then(res => {
            console.log('Remove RES => ', res);
            if (state.displayedList === 'dashboardHeroes') {
            commit('SET_DASHBOARD_HEROES', res);
            }
          });
    },
    fetchDashboardHeroes({commit}) {
      commit('SET_LOADING_LIST', true);
      LocalService.fetchHeroes().then((localStorageHeroes => {
      commit('SET_DASHBOARD_HEROES', localStorageHeroes);
      commit('SET_TOTAL_ITEMS', localStorageHeroes.length);
      commit('SET_MAX_PAGE', localStorageHeroes.length);
      setTimeout(() => {
        //* Simulate request time
        commit('SET_LOADING_LIST', false);
      }, 500);
      }) )
    },
    changePageIndex({commit}, {pageIndex, pageName}) {
      commit('CHANGE_PAGE', {pageIndex, pageName});
    },
    setRequestedName({commit}, name) {
      commit('SET_REQUESTED_NAME', name);
    },
    setSettingsDisplay({commit}) {
      commit('SET_SETTINGS_DISPLAY');
    }
  },
  getters: {
    getHeroesListByName: state => name => {
      return state[name];
    },
    getHeroBydId: state => id => {
      return state.heroesList.find(hero => {
        return hero.id === id;
      })
    },
    getRandomHero: state => {
      return state.heroesList[1];
    }
  },
})
