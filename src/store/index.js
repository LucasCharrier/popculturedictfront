import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import tag from './tag'
import user from './user'
import modal from './modal'
import definition from './definition'
import { create } from 'core-js/fn/object'

Vue.use(Vuex)

const createStore = (state) => {
    let create = (obj, key) => {
        let de = obj
        if (state && state[key]) {
            de = {
                ...obj,
                state: state[key]
            }
        }
        return de
    }

    return new Vuex.Store({
        state,
        mutations: {
    
        },
        actions: {
    
        },
        modules: {
            auth,
            definition: create(definition, 'definition'),
            modal,
            tag,
            user
        }
    });
};

export default createStore;
