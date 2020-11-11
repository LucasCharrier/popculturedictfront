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

import Definition from '../components/Definition.vue'

export default {
    name: 'profile',
    components: {
        Definition,
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        //this.getDefinitions()
    },
    data() {
        return {
            definitions: (this.$store.state.definition.definitions.userProfile || {}).data,
            next: ((this.$store.state.definition.definitions.userProfile || {}).links || {}).next,
            isLoadingMore: false,
            hasMore: true
        }
    },
    watch: {
        '$route' (to, from) {
            if(from.params.id !== to.params.id){ 
                this.getDefinitions()
            }    
        }
    },
    serverPrefetch() {
        return this.getDefinitions(true)
    },
    mounted() {
        console.log('LCS ON MOUNT')
        if (window) {
            this.scroll()
        }
        if (!this.definitions) {
            this.getDefinitions(this.$route.query.q)
        } else {
            this.clearCollectionForUser()
        }
    },
    methods: { 
        ...mapActions({
            getDefinitionCollectionsForUser: 'definition/collectionForUser',
            clearCollectionForUser: 'definition/clearCollectionForUser'
        }),
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
                            console.log(this.next)
                        }, 2000)
                    }).catch(() => {
                        this.isLoadingMore = false
                    })
                }
            };
        },
        async getDefinitions(prefetched) {
            // console.log('LCS GET DEFINITIION ', this.$route.params.id, )
            console.log('LCS IF TOTO', this.$route.params.id)
            this.isLoadingMore = true
            this.hasMore = true
            this.definitions = []

            // if (this.$route.params.id) {
            let response = await this.getDefinitionCollectionsForUser({
                userId: this.$route.params.id,
                prefetched
            })
            // }
            this.definitions = response.data.data
            this.next = response.data.links.next
            this.isLoadingMore = false
            if (!this.next) {
                this.hasMore = false
            }
            return
        },
    }
}
</script>