import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
// import VueI18n from "vue-i18n/dist/vue-i18n";
import i18n from './i18n'

//* Font-awesome
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

//* i18n
// Vue.use(VueI18n);
// const i18n = new VueI18n({
//   locale: 'fr',
//   fallbackLocale: 'fr',
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
