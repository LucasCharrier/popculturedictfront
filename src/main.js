import Vue from 'vue'
import axios from 'axios'
import PortalVue from 'portal-vue'

import router from './router'
import store from './store'
import App from './App.vue'
import { API_BASE_URL } from './config'

require('@/store/subscriber')

axios.defaults.baseURL = API_BASE_URL
Vue.config.productionTip = false
Vue.use(PortalVue)

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
