import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Profile from '@/views/Profile.vue'
import DefinitionDetail from '@/views/DefinitionDetail.vue'
import AlphabeticalDefinitions from '@/views/AlphabeticalDefinitions.vue'
import TagDefinitions from '@/views/TagDefinitions.vue'
import Tags from '@/views/Tags.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import CGU from '@/views/CGU.vue'
// import store from '../store'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'dashboard',
    //     component: Home,
    // },
    {
        path: '/profile/:id',
        name: 'profile',
        component: Profile
    },
    {
        path: '/definition/:id',
        name: 'definition',
        component: DefinitionDetail
    },
    {
        path: '/tags',
        name: 'tags',
        component: Tags
    },
    {
        path: '/tag/:text-:id',
        name: 'tag',
        component: TagDefinitions
    },
    {
        path: '/cgu',
        name: 'cgu',
        component: CGU
    },
    {
        path: '/privacy_policy',
        name: 'privacy_policy',
        component: PrivacyPolicy
    },
    {
        path: '/populaire',
        name: 'popular',
        component: AlphabeticalDefinitions
    },
    {
        path: '/:query?',
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