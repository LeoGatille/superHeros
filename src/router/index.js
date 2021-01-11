import Vue from 'vue'
import VueRouter from 'vue-router'
import HerosList from "@/views/HeroesList/HerosList";

Vue.use(VueRouter)

const routes = [
  {
    path: '/:typeList',
    name: 'heroes-list',
    component: HerosList,
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
