import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:listType',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/hero/:idHero',
    name: 'one-hero',
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
