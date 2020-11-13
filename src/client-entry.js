// client-entry.js    
import { createApp } from './app'
import Toasted from 'vue-toasted'
import Swal from 'vue-swal'
import Vue from 'vue'
import cookie from '@/store/cookie'

Vue.use(Toasted)
Vue.use(Swal)

const { app, router, store} = createApp({state: window.__INITIAL_STATE__}, { cookie });


store.dispatch('auth/attempt', localStorage.getItem('token'))

console.log(window.__INITIAL_STATE__)
// import './assets/style.scss';
//In the client entry, we call createApp(), passing the initial state injected by the server. 
//After the router has completed the initial navigation, we mount the app to the DOM.
//Also in this file, you can import global styles and initialize directives or plugins that work with the DOM.
router.onReady(() => {
   app.$mount('#app');
});