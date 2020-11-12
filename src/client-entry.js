// client-entry.js    
import { createApp } from './app'
import Toasted from 'vue-toasted'
import Vue from 'vue'
Vue.use(Toasted)

const { app, router, store} = createApp({state: window.__INITIAL_STATE__});


store.dispatch('auth/attempt', localStorage.getItem('token'))

console.log(window.__INITIAL_STATE__)
// import './assets/style.scss';
//In the client entry, we call createApp(), passing the initial state injected by the server. 
//After the router has completed the initial navigation, we mount the app to the DOM.
//Also in this file, you can import global styles and initialize directives or plugins that work with the DOM.
router.onReady(() => {
   app.$mount('#app');
});