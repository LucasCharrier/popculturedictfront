<template>
    <portal to="createDefModal">
        <div v-show="visible" class="modal is-active" @click="handleCancel">
            <div class="modal-background"></div>
            <div @click.stop class="modal-content">
                <div class="box">
                    <div>
                        <div class="field">
                            <label class="label" for="name">
                                Mot
                            </label>
                            <input
                                class="input" type="text" name="name" id="name" v-model="form.name">
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
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <button class="button is-primary" type="submit" @click="submit">Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </portal>
</template>
<script>
    import { GiphyFetch } from '@giphy/js-fetch-api'
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
                    exemple: '',
                    gif: undefined
                },
                selectedGif: undefined,
                gifs: [],
                searchedValue: ''
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
            async submit() {
                await this.createDefinition({
                    ...this.form,
                    media_url: this.selectedGif ? this.selectedGif.images.fixed_height.url : undefined,
                    tags: this.form.tags.split(',').map(t => t.trim()).filter(t => t)
                })
                this.$toasted.success('La définition a été créée ! 🥳 ', {
                    theme: 'outline',
                    duration: 2000,
                    action : {
                        text : 'Fermer',
                        onClick : (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    }
                })
                this.$emit('onHandleOk')
                
            },
            async onSearch(e) {
                if (e.keyCode === 13 && this.searchedValue) {
                    const gf = new GiphyFetch('xTiTnqgmM4AmDS6T9C' || 'dc6zaTOxFJmzC')
                    // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
                    const fetchGifs = await gf.search(this.searchedValue, { sort: 'relevant', limit: 10, type: 'gifs' })
                    this.gifs = fetchGifs.data
                }
            },
            handleChange(e) {
                console.log(e)
                this.form.tags = e
            },
            selectGif(gif) {
                console.log('LCS SELECT FIG')
                this.selectedGif = gif
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
<style>
    .gif-item-container {
        overflow: scroll;
        white-space: nowrap;
    }
    .gif-item {
        max-width: 200px;
        display: inline-block;
        vertical-align: middle;
        border: 2px solid transparent;
        text-align: center;
        border: 1px solid #ccc;
        margin: 5px;
        cursor: pointer;
    }
    .gif-item.gif-item-active {
        border: 4px solid #66cdaa;
    }
</style>