<template>
    <portal to="signInModal">
        <div v-show="visible" class="modal is-active" @click="handleCancel">
            <div class="modal-background"></div>
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
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link" type="submit" >Sign In</button>
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
import { mapActions } from 'vuex'
export default {
    name: 'signin',
    components: {

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
            signIn: 'auth/signIn'
        }),
        handleOk() {
            this.$emit('onHandleOk')
        },
        handleCancel() {
            this.$emit('onHandleCancel')
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