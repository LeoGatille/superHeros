import marvelService from '@/api/services/marvelAPI/marvelService'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingList: false,
    heroesList: [],
    // dashboardList: [],
    // allHeroesList: [],
    maxItemsPerPage: 20,
    totalItems: 0,

  },
  getters: {
    getHeroesListByName: state => name => {
      return state[name];
    }
  },
  mutations: {
    SET_LOADING_LIST(state, isLoading) {
      state.loadingList = isLoading;
    },
    SET_HEROES_LIST(state, heroesList) {
      state.heroesList = heroesList;
    },
    SET_TOTAL_ITEMS(state, total) {
      state.totalItems = total
    },
    //? I'll see later how to handle notifications
    // SET_NOTIFICATION(state, payload) {
    //   state.notfication
    // }
  },
  actions: {
    getAllHeroes({commit}) {
      commit('SET_LOADING_LIST', true);
      marvelService.getAllHeroes()
          .then(response => {
            commit('SET_TOTAL_ITEMS', response.data.data.total); //? Might do the dot notation in the 'commit'
            // commit('SET_ALL_HEROES_LIST', response.data.data.results);
            commit('SET_HEROES_LIST', response.data.data.results);
            commit('SET_LOADING_LIST', false);
          })
          .catch(err => {
            // commit('SET_NOTIFICATION', {type: 'error', message: 'Something went wrong ;('});
            console.log('ERROR OBJ => ', err);
          })
    },
    getFavoritesHeroes({commit}) {
      return ''
    }
  },
  modules: {
  }
})
