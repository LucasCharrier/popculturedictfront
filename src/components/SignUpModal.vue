<template>
    <a-modal
        title="Title"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <form @submit.prevent="submit">
            {{ form }}
            <div>
                <label for="name">
                    Name
                </label>
                <input type="text" name="name" id="name" v-model="form.name">
            </div>
            <div>
                <label for="email">
                    Email
                </label>
                <input type="text" name="email" id="email" v-model="form.email">
            </div>
            <div>
                <label for="password">
                    Password
                </label>
                <input type="password" name="password" id="password" v-model="form.password">
            </div>
            <div>
                <button type="submit">
                    signin
                </button>
            </div>
        </form>
    </a-modal>
</template>
<script>
    import { mapActions } from 'vuex'
    import { 
        Modal,
    } from 'ant-design-vue'

    export default {
        name: 'dasboard',
        components: {
            'a-modal': Modal,
        },
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