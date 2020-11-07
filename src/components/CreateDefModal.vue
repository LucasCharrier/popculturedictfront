<template>
    <portal to="modals">
        <div v-show="visible" class="modal is-active" @click="handleCancel">
            <div class="modal-background"></div>
            <div @click.stop class="modal-content">
                <div class="box">
                    <form @submit.prevent="submit">
                        <div class="field">
                            <label class="label" for="name">
                                word
                            </label>
                            <input class="input" type="text" name="name" id="name" v-model="form.name">
                        </div>
                        <div class="field">
                            <label class="label" for="text">
                                definition
                            </label>
                            <textarea class="textarea" type="text" name="text" id="text" v-model="form.text"/>
                        </div>
                        <div class="field">
                            <label class="label" for="text">
                                exemple
                            </label>
                            <textarea class="textarea" type="text" name="exemple" id="exemple" v-model="form.exemple"/>
                        </div>
                            <div class="field">
                            <label class="label" for="text">
                                hashtags
                            </label>
                            <textarea class="textarea" type="text" name="exemple" id="exemple" v-model="form.tags"/>
                        </div>
                        <!-- <a-select mode="tags" style="width: 100%" :token-separators="[',']" @search="handleSearch" @change="handleChange">
                            <a-select-option v-for="tag in tags" :key="tag.id">
                                {{ tag.name }}
                            </a-select-option>
                        </a-select> -->
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
                    tags: [],
                    exemple: ''
                },
                tags: ''
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
                    tags: this.tags.split(',').map(t => t.trim())
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