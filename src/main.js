import Vue from 'vue'
import axios from 'axios'
import PortalVue from 'portal-vue'
import VueHtml2Canvas from 'vue-html2canvas';
import Toasted from 'vue-toasted'
import VueSwal from 'vue-swal'

import router from './router'
import store from './store'
import App from './App.vue'
import { API_BASE_URL } from './config'

require('@/store/subscriber')

axios.defaults.baseURL = API_BASE_URL
Vue.config.productionTip = false
Vue.use(PortalVue)
Vue.use(VueHtml2Canvas)
Vue.use(Toasted)
Vue.use(VueSwal)

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
