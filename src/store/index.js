import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import tag from './tag'
import user from './user'
import modal from './modal'
import definition from './definition'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        auth,
        definition,
        modal,
        tag,
        user
    }
})