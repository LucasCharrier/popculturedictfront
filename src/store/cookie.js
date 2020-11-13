import axios from 'axios'
import Vue from 'vue'
import { COOKIE_NAMES } from '@/config'

export default {
    namespaced: true,
    state: () => { 
        return {
        consentPackageConfig: {
            'cookie:consent:google-analytics': localStorage ? localStorage.getItem('cookie:consent:google-analytics') : false,
            'cookie:consent:thepopdictionnaire': localStorage ? localStorage.getItem('cookie:consent:thepopdictionnaire') : false,
            'cookie:modal-shown': localStorage ? localStorage.getItem('cookie:modal-shown') : false,
        },
        shownModal: false,
    }},
    getters: {
        consentPackageConfig(state) {
            // const consentPackageConfig = {}
            // COOKIE_NAMES.forEach(key => {
            //     state.consentPackageConfig[key] = localStorage.getItem(key)
            // })
            // console.log('LCS GET CONSENT PACKAGE', consentPackageConfig)
            return state.consentPackageConfig
        }
    },
    mutations: {
        SET_CONSENT(state, consentPackageConfig) {
            Object.keys(consentPackageConfig).forEach(key => {
                if (consentPackageConfig[key]) {
                    Vue.set(state.consentPackageConfig, key, true)
                    localStorage.setItem(key, true)
                } else {
                    localStorage.setItem(key, false)
                    Vue.set(state.consentPackageConfig, key, false)
                }
            })
            if (consentPackageConfig['cookie:consent:google-analytics']) {
                gtag('consent', 'update', {'analytics_storage': 'granted'});
            }
            Vue.set(state.consentPackageConfig, 'cookie:modal-shown', true)
            localStorage.setItem('cookie:modal-shown', true)
        },
        SET_CONSENT_ALL(state) {
            COOKIE_NAMES.forEach(key => {
                Vue.set(state.consentPackageConfig, key, true)
                localStorage.setItem(key, true)
            })
            gtag('consent', 'update', {'analytics_storage': 'granted'});
        },
    },
    actions: {
        async setConsentAll ({ commit }) {
            return commit('SET_CONSENT_ALL')
        },
        async setConsent ({ commit }, consentPackageConfig) {
            console.log("LCS SET CONSENT 0", consentPackageConfig)
            return commit('SET_CONSENT', consentPackageConfig)
        },
    }
}