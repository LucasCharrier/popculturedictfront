<template>
    <portal to="createDefModal">
        <div v-show="visible" class="modal is-active" @click="handleCancel">
            <div class="modal-background"></div>
            <div @click.stop class="modal-content">
                <div class="box">
                    <form @submit.prevent="submit">
                        <div class="field">
                            <label class="label" for="name">
                                Mot
                            </label>
                            <input class="input" type="text" name="name" id="name" v-model="form.name">
                        </div>
                        <div class="field">
                            <label class="label" for="text">
                                Definition
                            </label>
                            <textarea class="textarea" type="text" name="text" id="text" v-model="form.text"/>
                        </div>
                        <div class="field">
                            <label class="label" for="text">
                                Exemple
                            </label>
                            <textarea class="textarea" type="text" name="exemple" id="exemple" v-model="form.exemple"/>
                        </div>
                            <div class="field">
                            <label class="label" for="text">
                                Hashtags
                            </label>
                            <textarea class="textarea" type="text" name="exemple" id="exemple" v-model="form.tags"/>
                        </div>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link" type="submit" >Submit</button>
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
                    name: '',
                    text: '',
                    tags: '',
                    exemple: ''
                },
            }
        },
        methods: { 
            ...mapActions({
                createDefinition: 'definition/create',
                getTags: 'tag/getCollection',
            }),
            handleCancel() {
                this.$emit('onHandleCancel')
            },
            submit() {
                this.$emit('onHandleOk')
                this.createDefinition({
                    ...this.form,
                    tags: this.form.tags.split(',').map(t => t.trim()).filter(t => t)
                })
            },
            handleChange(e) {
                console.log(e)
                this.form.tags = e
            },
            async handleSearch(params) {
                let response = await this.getTags({ q: params })
                console.log('les toto', response.data.data)
                this.tags = response.data.data
            },
            async getTagsAction(params) {
                let response = await this.getTags({ q: params})
                this.tags = response.data.data
            }
        }
    }
</script>