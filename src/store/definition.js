import axios from 'axios'

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
    actions: {
        async create (_, credentials) {
            let response = await axios.post('definitions', credentials)
            return response
        },
        async get (_, credentials) {
            let response = await axios.get(`definitions/${credentials.id}`)
            return response
        },
        async getcollection (_, credentials) {
            console.log('LCS GET COLLECTION', credentials)
            let response = await axios.get('definitions', { params: credentials})
            return response
        },
        async getCollectionByTag (_, credentials) {
            let response = await axios.get(`tags/${credentials.tagId}/definitions`)
            return response
        },
        async collectionForUser (_, credentials) {
            let response = await axios.get(`users/${credentials.userId}/definitions`)
            return response
        }
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