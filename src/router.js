import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'principal',
      component: () => import(/* webpackChunkName: "landing" */ './views/Landing.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/search',
      name: 'buscar',
      component: Home
    },
    {
      path: '/registrar/canchita',
      name: 'registro',
      component: () => import(/* webpackChunkName: "registrocancha" */ './views/RegistroCanchas.vue')
    },
    {
      path: '/registrar/local',
      name: 'regLocal',
      component: () => import(/* webpackChunkName: "registrolocal" */ './views/RegistrarLocales.vue')
    },
    {
      path: '/locales',
      name: 'misLocales',
      component: () => import(/* webpackChunkName: "misLocales" */ './views/MisLocales.vue')
    },
    {
      path: '/canchitas',
      name: 'misCanchitas',
      component: () => import(/* webpackChunkName: "misCanchitas" */ './views/MisCanchas.vue')
    },
    {
      path: '/canchitas/galeria',
      name: 'misFotos',
      component: () => import(/* webpackChunkName: "misFotos" */ './views/Galeria.vue')
    },
    {
      path: '/canchitas/horarios',
      name: 'misHorarios',
      component: () => import(/* webpackChunkName: "misHorarios" */ './views/Horarios.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ './views/Testing.vue')
    },
    {
      path: '/reservar',
      name: 'reservar',
      component: () => import(/* webpackChunkName: "reservar" */ './views/Reservar.vue')
    },
    {
      path: '/horarios',
      name: 'horariosFijos',
      component: () => import(/* webpackChunkName: "horariosFijos" */ './views/HorarioFijo.vue')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  
})
