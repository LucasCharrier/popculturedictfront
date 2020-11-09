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

import Definition from '@/components/Definition'

export default {
    name: 'dasboard',
    components: {
        Definition
        //'a-row': Row
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getDefinitions()
    },
    data() {
        return {
            form: {
                name: '',
                text: ''
            },
            definitions: []
        }
    },
    mounted() {
        this.scroll();
    },
    methods: { 
        ...mapActions({
            getDefinitionCollectionsByTag: 'definition/getCollectionByTag'
        }),
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
                            console.log(this.next)
                        }, 2000)
                    }).catch(() => {
                        this.isLoadingMore = false
                    })
                }
            };
        },
        async getDefinitions() {
            this.isLoadingMore = true
            this.hasMore = true
            this.definitions = []
            let response = await this.getDefinitionCollectionsByTag({
                tagId: this.$route.params.id
            })
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