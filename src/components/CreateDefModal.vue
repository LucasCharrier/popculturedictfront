<template>
    <portal to="createDefModal">
        <div v-show="visible" class="modal is-active" >
            <div class="modal-background" @click="handleCancel"></div>
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
                        <div class="field">
                            <div class="control has-icons-left">
                                <input
                                        class="input"
                                        type="text"
                                        v-on:keyup="onSearch" placeholder="Chercher un gif" v-model="searchedValue">
                                <span class="icon is-large is-left">
                                    <img src="data:image/png;base64,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" class="powered-by-giphy">
                                </span>
                            </div>
                        </div>
                        <div class="gif-item-container" v-if="(gifs || []).length">
                            <div
                                v-on:click="selectGif(gif)"
                                :class="{'gif-item': true, 'gif-item-active': selectedGif.id === gif.id}"
                                v-for="gif in gifs" :key="gif.id">
                                <img :src="gif.images.fixed_height.url"/>
                            </div>
                        </div>
                        <br>
                        <div class="control">
                            <label class="radio">
                                <input type="radio"  id="public" value="PUBLIC" v-model="form.visibility">
                                Publique
                            </label>
                            <label class="radio">
                                <input type="radio"  id="private" value="PRIVATE" v-model="form.visibility">
                                Privé (pour des private jock)
                            </label>
                        </div>
                        <div class="field is-grouped is-grouped-right">
                            <div class="control">
                                <button class="button is-primary" type="submit" @click="submit">Créer definition</button>
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
                    gif: undefined,
                    visibility: 'PUBLIC'
                },
                selectedGif: {},
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
                this.$emit('onHandleOk')
                this.$toasted.success('La définition a été créée ! 🥳 ', {
                    theme: 'outline',
                    duration: 2000,
                    className: 'toaster-tpd',
                    action : {
                        text : 'Fermer',
                        onClick : (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    }
                })
                
            },
            async onSearch(e) {
                if (e.keyCode === 13 && this.searchedValue) {
                    const gf = new GiphyFetch('xcsLkMrSQUyNFpU7Zk0SdPmK7asHkHS1')
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
    .control.has-icons-left .input {
        padding-left: 110px;
    }
    .control.has-icons-left .icon {
        width: 100px;
    }
</style>
