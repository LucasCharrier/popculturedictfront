export default {
    namespaced: true,
    state: {
        signUpVisible: false,
        signInVisible: false,
        signUpOrInVisible: false
    },
    getters: {
        signUpVisible (state) {
            return state.signUpVisible
        },
        signInVisible (state) {
            return state.signInVisible
        },
        signUpOrInVisible (state) {
            return state.signUpOrInVisible
        },
        createdDefVisible (state) {
            return state.createdDefVisible
        }
    },
    mutations: {
        SET_SHOW_SIGN_UP_MODAL(state, isVisible) {
            state.signUpVisible = isVisible
        },
        SET_SHOW_SIGN_IN_MODAL(state, isVisible) {
            state.signInVisible = isVisible
        },
        SET_SHOW_SIGN_UP_OR_IN_MODAL(state, isVisible) {
            state.signUpOrInVisible = isVisible
        },
        SET_SHOW_CREATE_DEF_MODAL(state, isVisible) {
            state.createdDefVisible = isVisible
        }
    },
    actions: {
        showSignUpModal ({ commit }) {
            commit('SET_SHOW_SIGN_UP_MODAL', true)
        },
        hideSignUpModal ({ commit }) {
            commit('SET_SHOW_SIGN_UP_MODAL', false)
        },
        showSignInModal ({ commit }) {
            commit('SET_SHOW_SIGN_UP_MODAL', true)
        },
        hideSignInModal ({ commit }) {
            commit('SET_SHOW_SIGN_UP_MODAL', false)
        },
        showSignUpOrInModal ({ commit }) {
            commit('SET_SHOW_SIGN_UP_OR_IN_MODAL', true)
        },
        hideSignUpOrInModal ({ commit }) {
            commit('SET_SHOW_SIGN_UP_OR_IN_MODAL', false)
        },
        showCreateDefModal ({ commit }) {
            commit('SET_SHOW_CREATE_DEF_MODAL', true)
        },
        hideCreateDefModal ({ commit }) {
            commit('SET_SHOW_CREATE_DEF_MODAL', false)
        },
    }
}