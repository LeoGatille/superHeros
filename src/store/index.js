import marvelService from '@/api/services/marvelAPI/marvelService'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLocalStorageReady: false,
    loadingList: false,
    heroesList: [],
    maxItemsPerPage: 10,
    currentPage: 3,
    totalItems: 0,
    maxPage: 0,
  },
  getters: {
    getHeroesListByName: state => name => {
      return state[name];
    }
  },
  mutations: {
    CREATE_HEROES_LOCAL_STORAGE(state) {
      localStorage.setItem('savedHeroes', '[]');
      localStorage.setItem('total', '0');
      state.isLocalStorageReady = true;
    },
    SET_LOCAL_STORAGE_STATE(state, localeStorageState) {
      state.isLocalStorageReady = localeStorageState;
    },
    SET_LOADING_LIST(state, isLoading) {
      state.loadingList = isLoading;
    },
    SET_HEROES_LIST(state, heroesList) {
      state.heroesList = heroesList;
    },
    SET_TOTAL_ITEMS(state, nbItems) {
      state.totalItems = nbItems;
    },
    SET_MAX_PAGE(state, nbItems) {
      state.maxPage = Math.round(nbItems / state.maxItemsPerPage);
    },
    ADD_ONE_FAVORITE_HERO(state, hero) {
      const savedHeroesList = JSON.parse(localStorage.getItem("savedHeroes"));
      savedHeroesList.push(hero);
      localStorage.setItem("savedHeroes", JSON.stringify(savedHeroesList));
    },
    SET_FAVORITES_HEROES(state, heroes) {
      state.heroesList = heroes;
    }
    //? I'll see later how to handle notifications
    // SET_NOTIFICATION(state, payload) {
    //   state.notfication
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
          (this.state.maxItemsPerPage * this.state.currentPage)
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
    addOneFavoriteHero({commit}, hero) {
      //? Might create a class Hero & CustomHero...
      hero.savedDate = new Date();
      hero.edited = false;
      commit('ADD_ONE_FAVORITE_HERO', hero);
    },
    fetchFavoritesHeroes({commit}) {
      commit('SET_LOADING_LIST', true);
      const savedHeroes = JSON.parse(localStorage.getItem('savedHeroes'));
      commit('SET_FAVORITES_HEROES', savedHeroes);
      setTimeout(() => {
        //* Simulate request time
        //? Might use a Promise...
        commit('SET_LOADING_LIST', false);
      }, 500);
    }
  },
  modules: {
  }
})
