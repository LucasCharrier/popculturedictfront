<template>
    <portal to="signUpOrInModal">
        <div v-show="visible || this.showModal" class="modal is-active" @click="handleCancel">
            <div class="modal-background"></div>
            <div @click.stop class="modal-content">
                <div class="box">
                    <a v-if="state" @click.prevent="state=undefined"><i class="fas fa-arrow-left"></i> {{"retour"}}</a>
                    <br>
                    <br>
                    <template v-if="!state">
                        <p :style="{textAlign: 'center'}">Connectez vous ou inscrivez vous !</p>
                        <br>
                        <br>
                        <div class="field is-grouped is-grouped-centered">
                            <p class="control">
                                <button class="button is-primary is-large" type="submit" @click="state = 'isSignUp'">Sign Up</button>
                            </p>
                            <p class="control">
                                <button class="button is-primary is-large" type="submit" @click="state = 'isSignIn'">Log In</button>
                            </p>
                        </div>
                    </template>
                    <form @submit.prevent="submit" v-if="state" >
                        <div v-if="state === 'isSignUp'" class="field">
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
                            J'accepte les <a :href="document.location.origin + '/cgu.html'" target="_blank">CGUs</a> et <a :href="document.location.origin + '/privacy_policy.html'" target="_blank">la politique de confidentialité</a>
                        </label>
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <button class="button is-primary" type="submit" v-if="state === 'isSignUp'">Sign Up</button>
                                <button class="button is-primary" type="submit" v-if="state === 'isSignIn'">Log In</button>
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
                showModal: 'modal/signUpOrInVisible',
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
                state: undefined,
                document: document
            }
        },
        methods: { 
            ...mapActions({
                signUp: 'auth/signUp',
                signIn: 'auth/signIn',
                hideSignUpOrInModal: 'modal/hideSignUpOrInModal'
            }),
            handleOk() {
                this.$emit('onHandleOk')
                this.hideSignUpOrInModal()
                this.state = undefined
            },
            handleCancel() {
                this.$emit('onHandleCancel')
                this.hideSignUpOrInModal()
                this.state = undefined
            },
            submit() {
                if (this.state === 'isSignUp') {
                    if (!this.form.accepted) {
                        alert('Il faut accepter la politique de confidentialité et les CGUs')
                        return
                    }
                    this.signUp(this.form).then(() => {
                        this.$emit('onHandleOk')
                        this.hideSignUpOrInModal()
                        this.state = undefined
                    })
                } else {
                    this.signIn(this.form).then(() => {
                        this.$emit('onHandleOk')
                        this.hideSignUpOrInModal()
                        this.state = undefined
                    })
                }
            }
        }
    }
</script>