import Vue from 'vue'
import axios from 'axios'
import PortalVue from 'portal-vue'
import VueHtml2Canvas from 'vue-html2canvas'
import VueMeta from 'vue-meta'

import router from './router'
import createStore from './store'
import App from './App.vue'
import { API_BASE_URL } from './config'

import storeSubscribe from './store/subscriber'

axios.defaults.baseURL = 'https://api-therealdictionnary.herokuapp.com/api' //'http://localhost:8000/api' //API_BASE_URL 'https://api-therealdictionnary.herokuapp.com/api' //
Vue.config.productionTip = false
Vue.use(PortalVue)
Vue.use(VueHtml2Canvas)
Vue.use(VueMeta);


export const createApp = (context) =>  {
  const store = createStore(context.state);
  storeSubscribe(store)
  const app = new Vue({
      store,
      router,
      render: h => h(App),
  });
 
  return {app, router, store};
};