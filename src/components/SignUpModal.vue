<template>
    <portal to="signUpModal">
        <div v-show="visible || this.showModal" class="modal is-active" @click="handleCancel">
            <div class="modal-background"></div>
            <div @click.stop class="modal-content">
                <div class="box">
                    <form @submit.prevent="submit">
                        <div class="field">
                            <label for="name" class="label">
                                Username
                            </label>
                            <input class="input"  type="text" name="name" id="name" v-model="form.name">
                        </div>
                        <div class="field">
                            <label for="email" class="label">
                                Email
                            </label>
                            <input class="input"  type="text" name="email" id="email" v-model="form.email">
                        </div>
                        <div class="field">
                            <label for="password" class="label">
                                Mot de passe
                            </label>
                            <input class="input"  type="password" name="password" id="password" v-model="form.password">
                        </div>
                        <label class="checkbox">
                            <input type="checkbox" v-model="form.accepted">
                            J'accepte les <router-link :to="{ name: 'cgu'}" target="_blank">CGUs</router-link> et <router-link :to="{ name: 'privacy_policy'}">la politique de confidentialité</router-link>
                        </label>
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <button class="button is-primary" type="submit" >Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </portal>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'dasboard',
        props: {
            visible: Boolean
        },
        computed: {
            ...mapGetters({
                showModal: 'modal/signUpVisible',
            })
        },
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    name: '',
                   accepted: false
                },
                // document: document
            }
        },
        methods: { 
            ...mapActions({
                signUp: 'auth/signUp',
                hideSignUpModal: 'modal/hideSignUpModal'
            }),
            handleOk() {
                this.$emit('onHandleOk')
                this.hideSignUpModal()
            },
            handleCancel() {
                this.$emit('onHandleCancel')
                this.hideSignUpModal()
            },
            submit() {
                if (!this.form.accepted) {
                    alert('Il faut accepter la politique de confidentialité et les CGUs')
                    return
                }
                this.signUp(this.form).then(() => {
                    
                })
            }
        }
    }
</script>