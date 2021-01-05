import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'en'
  },
  mutations: {
    SET_LANG(lang, i18n) {
      i18n.locale = lang //! might just be useless
      //? might be stored in localStorage too
    }
  },
  actions: {
    changeLang({commit}, {lang, i18n}) {
      commit('SET_LANG', lang, i18n);
    }
  },
  modules: {
  }
})
