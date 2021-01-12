import Vue from 'vue'
import VueRouter from 'vue-router'
import HeroList from "@/views/HeroList";
import HeroDetail from "@/views/HeroDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HeroList,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: HeroList,
    props: {isFavorite: true},
  },
  {
    path: '/hero/:heroId',
    name: 'hero-detail',
    component: HeroDetail,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
