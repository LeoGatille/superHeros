import marvelService from '@/api/services/marvelAPI/marvelService'
import Vue from 'vue'
import Vuex from 'vuex'

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
    dashboardPage:0,
    totalItems: 0,
    requestedName: '',
    maxPage: 0,
    showSettings: false,
  },
  getters: {
    getHeroesListByName: state => name => {
      return state[name];
    }
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
    //*State items
    SET_HEROES_LIST(state, heroesList) {
      state.heroesList = heroesList;
    },
    SET_TOTAL_ITEMS(state, nbItems) {
      state.totalItems = nbItems;
    },
    SET_MAX_PAGE(state, nbItems) {
      state.maxPage = Math.round(nbItems / state.maxItemsPerPage);
    },
    //* Favorites Heroes
    ADD_ONE_DASHBOARD_HERO(state, hero) {
      const savedHeroesList = JSON.parse(localStorage.getItem("savedHeroes"));
      savedHeroesList.push(hero);
      localStorage.setItem("savedHeroes", JSON.stringify(savedHeroesList));
    },
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
    SHIFT_PAGE(state, {shiftValue, page}) {
      state[page] = shiftValue
    }
    //? I'll see later how to handle notifications
    // SET_NOTIFICATION(state, payload) {
    //   state.notification
    // }
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
    fetchAllHeroes({commit}) {
      commit('SET_LOADING_LIST', true);
      marvelService.getAllHeroes(
          this.state.limit,
          (this.state.maxItemsPerPage * this.state.allHeroesPage)
          )
          .then(response => {
            commit('SET_TOTAL_ITEMS', response.data.data.total); //? Might do the dot notation in the 'commit'...
            commit('SET_MAX_PAGE', response.data.data.total);
            commit('SET_HEROES_LIST', response.data.data.results);
            commit('SET_LOADING_LIST', false);
          })
          .catch(err => {
            // commit('SET_NOTIFICATION', {type: 'error', message: 'Something went wrong ;('});
            console.log('ERROR OBJ => ', err);
          })
    },
    addOneDashboardHero({commit}, hero) {
      //? Might create a class Hero & CustomHero...
      hero.savedDate = new Date();
      hero.edited = false;
      commit('ADD_ONE_DASHBOARD_HERO', hero);
    },
    fetchDashboardHeroes({commit}) {
      commit('SET_LOADING_LIST', true);
      const savedHeroes = JSON.parse(localStorage.getItem('savedHeroes'));
      commit('SET_DASHBOARD_HEROES', savedHeroes);
      commit('SET_TOTAL_ITEMS', savedHeroes.length);
      commit('SET_MAX_PAGE', savedHeroes.length);
      setTimeout(() => {
        //* Simulate request time
        //? Might use a Promise...
        commit('SET_LOADING_LIST', false);
      }, 500);
    },
    shiftPage({commit}, {shiftValue, page}) {
      commit('SHIFT_PAGE', {shiftValue, page});
    },
    setRequestedName({commit}, name) {
      commit('SET_REQUESTED_NAME', name);
    },
    setSettingsDisplay({commit}) {
      commit('SET_SETTINGS_DISPLAY');
    }
  },
  modules: {
  }
})
