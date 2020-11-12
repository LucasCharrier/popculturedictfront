<template>
    <portal to="signInModal">
        <div v-show="visible || showModal" class="modal is-active">
            <div class="modal-background"  @click="handleCancel"></div>
            <div @click.stop class="modal-content">
                <div class="box">
                    <form @submit.prevent="submit">
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
    name: 'signin',
    components: {

    },
    computed: {
        ...mapGetters({
            showModal: 'modal/signInVisible',
        })
    },
    props: {
        visible: Boolean
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: { 
        ...mapActions({
            signIn: 'auth/signIn',
            hideSignInModal: 'modal/hideSignUpModal'
        }),
        handleOk() {
            this.$emit('onHandleOk')
            this.hideSignInModal()
        },
        handleCancel() {
            this.$emit('onHandleCancel')
            this.hideSignInModal()
        },
        submit() {
            this.signIn(this.form).then(() => {
                this.$emit('onHandleOk')
                this.$router.replace({
                    name: 'dashboard'
                }).catch(() => {
                    console.log('failed')
                })
            })
        }
    }
}
</script>