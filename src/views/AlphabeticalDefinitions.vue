<template>
    <div :style="{marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px'}">
        <h1 class="main-title-prefix">Le dictionnaire de la</h1>
        <h1 class="main-title-pop-culture">PopCulture</h1>
        <div class="box">
            <h2 class="subtitle">Top des mots commençant par {{ this.$route.query.character }}</h2>

            <div class="columns">
                <div class="column">
                    <ul>
                        <li v-for="definition in definitions" :key="definition.id">
                            <router-link :to="{
                                name: 'dashboard',
                                query: {
                                    q: definition.word.name
                                }
                            }">{{ definition.word.name }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="!hasMore || !definitions.length" :style="{ maxWidth: '600px', margin: '10px', textAlign: 'center' }">
                <p>Fin des résultats</p>
            </div>
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
        Definition,
        // 'a-col': Col,
        //'a-row': Row
    },
    metaInfo() {
        if (!this.$route.query.character) {
            return { 
                title: `The Pop Dictionnaire : le dictionnaire de la pop culture`,
                meta: [
                    { property: 'og:title', content: `The Pop Dictionnaire : le dictionnaire de la pop culture`},
                    { name: 'description', content: `Le dictionnaire de la pop culture et des sub cultures. Dictionnaire urbain et participatifs. Créez vos définitions !`},
                    { property: 'og:site_name', content: 'The Pop Dictionnaire'},
                    { name: 'robots', content: 'index,follow' },
                    { property: 'twitter:title', content: `The Pop Dictionnaire : le dictionnaire de la pop culture`},
                    { property: 'twitter:description', content: `Le dictionnaire de la pop culture et des sub cultures. Dictionnaire urbain et participatifs. Créez vos définitions !`},
                    { property: 'twitter:site', content: 'The Pop Dictionnaire'},
                    { property: 'og:type', content: 'website' },    
                    { name: 'robots', content: 'index,follow' },
                ],
                link: [
                    { rel: 'canonical', href: this.$route.path },
                ]
            }
        } else {
            return { 
                title: `The Pop Dictionnaire : le top des mots commençant par ${this.$route.query.character}`,
                meta: [
                    { property: 'og:title', content: `The Pop Dictionnaire : le top des mots commençant par ${this.$route.query.character}`},
                    { name: 'description', content: `Le dictionnaire de la pop culture et des sub cultures. Dictionnaire urbain et participatifs. Créez vos définitions !`},
                    { property: 'og:site_name', content: 'The Pop Dictionnaire'},
                    { name: 'robots', content: 'index,follow' },
                    { property: 'twitter:title', content: `The Pop Dictionnaire : le dictionnaire de la pop culture`},
                    { property: 'twitter:description', content: `Le dictionnaire de la pop culture et des sub cultures. Dictionnaire urbain et participatifs. Créez vos définitions !`},
                    { property: 'twitter:site', content: 'The Pop Dictionnaire'},
                    { property: 'og:type', content: 'website' },    
                    { name: 'robots', content: 'index,follow' },
                ],
                link: [
                    { rel: 'canonical', href: this.$route.path },
                ]
            }
        }
    },
    serverPrefetch() {
        return this.getDefinitions(true)
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        // console.log('LCS IS THIS CREATED ON FRONT')
        //this.getDefinitions(this.$route.query.q)
    },
    mounted () {
        // console.log('LCS IS THIS CALLED ON FRONT')
        if (window) {
            this.scroll()
        }
        if (!this.definitions) {
            this.getDefinitions(this.$route.query.character)
        } else {
            this.refetchInitialDefinitions()
            this.clearCollectionForDashboard()
        }
        // If we didn't already do it on the server
        // we fetch the item (will first show the loading text)
                //this.scroll();

        // console.log('LCS START MOUNTED ?', this.definitions)
        // if (!this.definitions) {
        //     console.log('LCS START MOUNTED ?')
        //     this.getDefinitions(this.$route.query.q)
        // }
    },

    // metaInfo() {
    //     if (!this.definitions.length) {
    //         return {}
    //     }
    //     // console.log(this.definitions[0])
    //     // return {
    //     //     title: `${this.definitions[0].word.name} - Epiloge`,
    //     //     meta: [
    //     //         { name: 'description', content: this.definitions[0].text },
    //     //         { property: 'og:title', content: this.definitions[0].word.name},
    //     //         { property: 'og:site_name', content: 'The Pop Dictionnaire'},
    //     //         { property: 'og:description', content: this.definitions[0].text },
    //     //         {property: 'og:type', content: 'profile'},
    //     //         // {property: 'og:url', content: 'https://epiloge.com/@' + this.userData.username},
    //     //         // {property: 'og:image', content: this.aws_url + '/users/' + this.userData.profileurl + '-main.jpg' }    
    //     //     ]
    //     // }
    // },
    data() {
        // console.log('LCS VALUE OF THIS DEFINITION', this.definitions)
        return {
            // definitions: this.definitions ? [] : this.definitions,
            definitions: (this.$store.state.definition.definitions.dashboard || {}).data,
            next: ((this.$store.state.definition.definitions.dashboard || {}).links || {}).next,
            searchedValue: '',
            isLoadingMore: false,
            hasMore: true
        }
    },
    watch: {
        '$route' (to, from) {
            if(from.query.character !== to.query.character){ 
                this.getDefinitions()
            }    
        }
    },
    methods: { 
        ...mapActions({
            getDefinitionCollections: 'definition/getcollection',
            clearCollectionForDashboard: 'definition/clearCollectionForDashboard'
        }),
        scroll () {
            window.onscroll = () => {
                let appElement = document.getElementById('app');
                // console.log('LCS DASHBAPRD VUE ON FRONT', this.next, this.isLoadingMore, !this.hasMore)
                if (!this.hasMore || this.isLoadingMore) {
                    return
                }
                // console.log(appElement.offsetHeight)
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= appElement.offsetHeight - 150;
                if (bottomOfWindow && this.next) {
                    this.isLoadingMore = true
                    const nextUrl = this.next
                    this.isLoadingMore
                    this.next = null
                    axios.get(`${nextUrl}`)
                    .then(response => {
                        // console.log('LCS RESPONSE')
                        setTimeout(() => {
                            this.isLoadingMore = false
                            this.definitions = [...this.definitions, ...response.data.data];
                            this.next = response.data.links.next
                            if (!this.next) {
                                this.hasMore = false
                            }
                            // console.log(this.next)
                        }, 1000)
                    }).catch(() => {
                        this.isLoadingMore = false
                    })
                }
            };
        },
        onSearch(e) {
            if (e.keyCode === 13) {
                this.$router.push({
                    // name: 'dashboard',
                    query: { character: this.searchedValue }
                }).catch((e) => {
                    console.log('failed', e)
                })
            }
        },
        async refetchInitialDefinitions() {
            let response = await this.getDefinitionCollections({ character: this.$route.query.character })
            this.definitions = response.data.data
            this.next = response.data.links.next
        },
        async getDefinitions(prefetched) {
            this.isLoadingMore = true
            this.hasMore = true
            this.definitions = []
            let response = await this.getDefinitionCollections({ character: this.$route.query.character, prefetched })
            this.definitions = response.data.data
            this.next = response.data.links.next
            this.isLoadingMore = false
            if (!this.next) {
                this.hasMore = false
            }
            return
        }
    }
}
</script>
<style scoped>
    .main-title-pop-culture {
        font-family: 'Pacifico', cursive;
        margin-bottom: 10px;
        font-size: 2.5rem;
        text-align: center;
    }
    .main-title-prefix {
        font-size: 100%;
        text-align: center;
        font-family: 'Quicksand';
        top: 10px;
        position: relative;
    }
</style>