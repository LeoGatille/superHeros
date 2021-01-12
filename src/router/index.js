import Vue from 'vue'
import VueRouter from 'vue-router'
import HerosList from "@/views/HeroesList/HerosList";
import HeroOne from "@/views/HeroOne";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HerosList,
  },
  {
    path: '/home/:typeList',
    name: 'heroes-list',
    component: HerosList,
    props: true,
  },
  {
    path: '/hero/:idHero',
    name: 'one-hero',
    component: HeroOne,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
