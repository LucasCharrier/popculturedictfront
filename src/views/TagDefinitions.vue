<template>
    <div :style="{marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px'}">
        <div v-for="definition in definitions" :key="definition.id">
            <Definition :definition="definition"/>
        </div>
        <div v-if="isLoadingMore" :style="{ maxWidth: '600px', margin: '10px', textAlign: 'center' }">
            <p>Loading...</p>
        </div>
        <div v-if="!hasMore" :style="{ maxWidth: '600px', margin: '10px', textAlign: 'center' }">
            <p>Fin des résultats</p>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'

import Definition from '@/components/Definition.vue'

export default {
    name: 'dasboard',
    components: {
        Definition
        //'a-row': Row
    },
    metaInfo() {
        if (this.definitions && this.definitions.length) {
            return { 
                title: `${this.definitions[0].word.name} : ${this.definitions[0].text}`,
                meta: [
                    { property: 'og:title', content: `${this.definitions[0].text}`},
                    { name: 'description', content: `${this.definitions[0].text}`},
                    { property: 'og:site_name', content: 'The Pop Dictionnaire'},
                    { name: 'robots', content: 'index,follow' },
                    { property: 'twitter:title', content: `${this.definitions[0].word.name}`},
                    { property: 'twitter:description', content: `${this.definitions[0].text}`},
                    { property: 'twitter:site', content: 'The Pop Dictionnaire'},
                    { property: 'og:type', content: 'article' },    
                    { name: 'robots', content: 'index,follow' },
                ],
                link: [
                    { rel: 'canonical', href: this.$route.path },
                ]
            }
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        // this.getDefinitions()
    },
    serverPrefetch() {
        return this.getDefinitions(true)
    },
    watch: {
        '$route' (to, from) {
            if(from.params.id !== to.params.id){ 
                this.getDefinitions()
            }    
        }
    },
    data() {
        return {
            form: {
                name: '',
                text: ''
            },
            isLoadingMore: false,
            hasMore: true,
            definitions: (this.$store.state.definition.definitions.tags || {}).data,
            next: ((this.$store.state.definition.definitions.tags || {}).links || {}).next,
        }
    },
    mounted() {
        if (window) {
            this.scroll();
        }
        if (!this.definitions) {
            this.getDefinitions()
        } else {
            this.clearCollectionsByTag()
        }
    },
    methods: { 
        ...mapActions({
            getDefinitionCollectionsByTag: 'definition/getCollectionByTag',
            clearCollectionsByTag:'definition/clearCollectionByTag'
        }),
        // async buildDefinitions() {
        //     console.log('LCS BUILD DEFINITIONS')
        //     this.isLoadingMore = true
        //     this.hasMore = true
        //     this.definitions = []
        //     let response = await this.getDefinitionCollectionsByTag({
        //         tagId: this.$route.params.id
        //     })
        //     this.definitions = response.data.data
        //     this.next = response.data.links.next
        //     this.isLoadingMore = false
        //     if (!this.next) {
        //         this.hasMore = false
        //     }
        // },
        // async getDefinitions() {
        //     let response = await this.getDefinitionCollectionsByTag({
        //         tagId: this.$route.params.id
        //     })
        //     this.definitions = response.data.data
        // },
        scroll () {
            window.onscroll = () => {
                let appElement = document.getElementById('app');
                if (!this.hasMore || this.isLoadingMore) {
                    return
                }
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= appElement.offsetHeight - 150;
                if (bottomOfWindow && this.next) {
                    this.isLoadingMore = true
                    const nextUrl = this.next
                    this.isLoadingMore
                    this.next = null
                    axios.get(`${nextUrl}`)
                    .then(response => {
                        setTimeout(() => {
                            this.isLoadingMore = false
                            this.definitions = [...this.definitions, ...response.data.data];
                            this.next = response.data.links.next
                            if (!this.next) {
                                this.hasMore = false
                            }
                        }, 1000)
                    }).catch(() => {
                        this.isLoadingMore = false
                    })
                }
            };
        },
        async getDefinitions(prefetched) {
            this.isLoadingMore = true
            this.hasMore = true
            this.definitions = []
            let response = await this.getDefinitionCollectionsByTag({
                tagId: this.$route.params.id,
                prefetched
            })
            // return response
            this.definitions = response.data.data
            this.next = response.data.links.next
            this.isLoadingMore = false
            if (!this.next) {
                this.hasMore = false
            }
        }
    }
}
</script>