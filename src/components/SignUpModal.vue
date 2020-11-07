<template>
    <portal to="modals">
        <div v-show="visible" class="modal is-active" @click="handleCancel">
            <div class="modal-background"></div>
            <div @click.stop class="modal-content">
                <div class="box">
                    <form @submit.prevent="submit">
                        <div class="field">
                            <label for="name" class="label">
                                Name
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
                                Password
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
        name: 'dasboard',
        props: {
            visible: Boolean
        },
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    name: ''
                }
            }
        },
        methods: { 
            ...mapActions({
                signUp: 'auth/signUp'
            }),
            handleOk() {
                this.$emit('onHandleOk')
            },
            handleCancel() {
                this.$emit('onHandleCancel')
            },
            submit() {
                this.signUp(this.form).then(() => {
                    
                })
            }
        }
    }
</script>