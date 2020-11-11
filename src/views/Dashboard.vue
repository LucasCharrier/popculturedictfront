<template>
    <div :style="{marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px'}">
        <div class="field">
            <div class="control">
                <input
                    class="input"
                    type="text"
                    v-on:keyup="onSearch" placeholder="Chercher une définition" v-model="searchedValue">
            </div>
        </div>
        <template>
            <div v-for="definition in definitions" :key="definition.id">
                <Definition :definition="definition"/>
            </div>
        </template>
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
        Definition,
        // 'a-col': Col,
        //'a-row': Row
    },
    serverPrefetch() {
        console.log('LCS TEST GET DEFINITION WITH QUERY', this.$route.query.q)
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
            this.getDefinitions(this.$route.query.q)
        } else {
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
            if(from.query.q !== to.query.q){ 
                this.getDefinitions(to.query.q)
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
                        }, 2000)
                    }).catch(() => {
                        this.isLoadingMore = false
                    })
                }
            };
        },
        onSearch(e) {
            if (e.keyCode === 13 && this.searchedValue) {
                                this.getDefinitions(this.searchedValue)
                this.$router.push({
                    // name: 'dashboard',
                    query: { q: this.searchedValue }
                }).catch((e) => {
                    console.log('failed', e)
                })
            }
        },
        async getDefinitions(prefetched) {
            this.isLoadingMore = true
            this.hasMore = true
            this.definitions = []
            let response = await this.getDefinitionCollections({ q: this.$route.query.q, prefetched })
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