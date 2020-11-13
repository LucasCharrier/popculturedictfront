<template>
        <div class="rating">
            <div class="banner-content box">
                <p>Votre vie privée</p>
                <p>
                    Nous utilisons des cookies et d'autres technologies similaires afin de 
                    personnaliser notre contenu, mesurer l'efficacité de nos publicités 
                    et améliorer leur pertinence, ainsi que proposer une meilleure expérience.
                    En cliquant sur OK ou en activant une option dans Préférences de cookies, vous acceptez les conditions énoncées dans notre Politique en matière de cookies. Pour modifier vos préférences ou retirer votre consentement, vous devez mettre à jour vos Préférences de cookies.
                </p>
                <br>
                <div class="buttons are-medium">
                    <button class="button" @click="onClick">Préférences de cookies</button>
                    <button class="button is-primary" @click="onClickOk">Ok</button>
                </div>
            </div>
        </div>
</template>
<script>
    import Vue from 'vue'
    import { mapActions, mapGetters } from 'vuex'

    import ModalCookieSettings from '@/components/ModalCookieSettings.vue'

    export default {
        data() {
            return {email: 0}
        },
        computed: {
            ...mapGetters({
                consentPackageConfig: 'auth/consentPackageConfig',
            }),
        },
        methods: {
            ...mapActions({
                setConsentAll: 'cookie/setConsentAll',
                setConsent: 'cookie/setConsent'
            }),
            onClickOk() {
                this.setConsentAll()
            },
            onClick() {
                console.log('LCS ON CLICK')
                var RatingComponentClass = Vue.extend(ModalCookieSettings)
                var instance = new RatingComponentClass({
                    methods: {
                        sentData: (consentPackageConfig) => {
                            this.setConsent(consentPackageConfig)
                            this.$swal.close()
                        }
                    }, 
                    // data() {
                    //     return {
                    //         listPackage: this.consentPackageConfig || {}
                    //     }
                    // }
                })

                // let component = RatingComponent.$mount(wrapper)
                window.component = instance
                console.log(component)
                this.$swal({
                    content: instance.$mount().$el,
                    buttons: false
                })
            }
        },
        // watch: {
        //     email (newVal) { state.note = newVal }
        // }
    }
</script>
<style>
    .rating {
        position: fixed;
        bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        width: '100%';
        padding: 10px;
        z-index: 2;
    }
    .banner-content {
        border-radius: 20;
        width: '100%';
        height: '100%';
    }
</style>