import axios from 'axios'
import Vue from 'vue'

export default {
    namespaced: true,
    // state: {
    //     token: null,
    //     user: null
    // },
    // getters: {
    //     authenticated(state) {
    //         return state.token && state.user
    //     },
    //     user (state) {
    //         return state.user
    //     }
    // },
    // mutations: {
    //     SET_TOKEN(state, token) {
    //         state.token = token
    //     },
    //     SET_USER(state, user) {
    //         state.user = user
    //     }
    // },
    state: () => ({
        definitions: {
        }
    }),
    mutations: {
        SET_DASHBOARD_DEFINITIONS (state, { data }) {
            Vue.set(state.definitions, 'dashboard', data)
        },
        SET_USER_PROFILE_DEFINITIONS (state, { data }) {
            Vue.set(state.definitions, 'userProfile', data)
        },
        SET_TAG_DEFINITIONS (state, { data }) {
            Vue.set(state.definitions, 'tags', data)
        },
        CLEAR_TAG_DEFINITIONS(state) {
            Vue.delete(state.definitions, 'tags')
        },
        CLEAR_USER_PROFILE_DEFINITIONS(state) {
            Vue.delete(state.definitions, 'userProfile')
        },
        CLEAR_DASHBOARD_DEFINITIONS(state) {
            Vue.delete(state.definitions, 'dashboard')
        },
    },
    actions: {
        async create (_, credentials) {
            let response = await axios.post('definitions', credentials)
            return response
        },
        async get (_, credentials) {
            let response = await axios.get(`definitions/${credentials.id}`)
            return response
        },
        async delete(_, credentials) {
            let response = await axios.post(`definitions/${credentials.id}`)
            return response
        },
        async getcollection ({ commit }, credentials) {
            console.log('LCS GET COLLECTION', credentials)
            let response = await axios.get('definitions', { params: credentials})
            if (credentials.prefetched) {
                commit('SET_DASHBOARD_DEFINITIONS', { data: response.data })
            }
            return response
        },
        async getCollectionByTag ({ commit }, credentials) {
            let response = await axios.get(`tags/${credentials.tagId}/definitions`)
            if (credentials.prefetched) {
                commit('SET_TAG_DEFINITIONS', { data: response.data })
            }
            return response
        },
        async collectionForUser ({ commit }, credentials) {
            console.log('LCS COLLECTIO USER ID', credentials.userId)
            let response = await axios.get(`users/${credentials.userId}/definitions`)
            if (credentials.prefetched) {
                commit('SET_USER_PROFILE_DEFINITIONS', { data: response.data })
            }
            return response
        },
        async clearCollectionByTag ({ commit }) {
            commit('CLEAR_TAG_DEFINITIONS')
        },
        async clearCollectionForUser ({ commit }) {
            commit('CLEAR_USER_PROFILE_DEFINITIONS')
        },
        async clearCollectionForDashboard({ commit }) {
            commit('CLEAR_DASHBOARD_DEFINITIONS')
        },
        // async attempt({ commit, state }, token) {
        //     if (token) {
        //         commit('SET_TOKEN', token)
        //     }
        //     if (!state.token) {
        //         return
        //     }
        //     // subsriber set token in header
        //     try {
        //         let response = await axios.get('auth/me')
        //         commit('SET_USER', response.data)
        //         console.log(response.data)
        //     } catch (e) {
        //         commit('SET_TOKEN', null)
        //         commit('SET_USER', null)
        //     }
        // },
        // signOut ({ commit }) {
        //     return axios.post('auth/signout').then(() => {
        //         commit('SET_TOKEN', null)
        //         commit('SET_USER', null)
        //     })
        // } 
    }
}