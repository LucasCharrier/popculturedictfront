import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Profile from '../views/Profile'
import Definition from '../views/Definition'
import Definitions from '../views/Definitions'
import Tags from '../views/Tags'
// import store from '../store'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
    {
        path: '/profile/:id',
        name: 'profile',
        component: Profile
    },
    {
        path: '/definition/:id',
        name: 'definition',
        component: Definition
    },
    {
        path: '/tags',
        name: 'tags',
        component: Tags
    },
    {
        path: '/tag/:id',
        name: 'tag',
        component: Definitions
    },
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        // beforeEnter: (to, from, next) => {
        //     console.log(store.getters['auth/authenticated'])
        //     if (!store.getters['auth/authenticated']) {
        //         return next({
        //             name: 'signin'
        //         })
        //     }
        //     next()
        // }
    },
  ]
  
  const router = new VueRouter({
    mode: 'history',
    routes
  })

export default router