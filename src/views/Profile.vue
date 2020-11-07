<template>
    <div :style="{marginLeft: 'auto', marginRight: 'auto', width: '300px'}">
        <div v-for="definition in definitions" :key="definition.id">
            <Definition :definition="definition"/>
        </div>
        <div v-if="isLoadingMore" :style="{ width: '300px', margin: '10px', textAlign: 'center' }">
            <p>Loading</p>
        </div>
        <div v-if="!hasMore" :style="{ width: '300px', margin: '10px', textAlign: 'center' }">
            <p>Plus de résultat</p>
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
        Definition,
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getDefinitions()
    },
    data() {
        return {
            definitions: [],
            isLoadingMore: false,
            hasMore: true
        }
    },
    mounted() {
        console.log('LCS ON MOUNT')
        this.scroll();
    },
    methods: { 
        ...mapActions({
            getDefinitionCollectionsForUser: 'definition/collectionForUser'
        }),
        scroll () {
            window.onscroll = () => {
                let appElement = document.getElementById('app');
                if (!this.hasMore || this.isLoadingMore) {
                    return
                }
                console.log(appElement.offsetHeight)
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= appElement.offsetHeight - 150;
                if (bottomOfWindow && this.next) {
                    this.isLoadingMore = true
                    console.log('LCS ON LOAD MORE')
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
            let response = await this.getDefinitionCollectionsForUser({
                userId: this.$route.params.id
            })
            this.definitions = response.data.data
            this.next = response.data.links.next
            if (!this.next) {
                this.hasMore = false
            }
        },
    }
}
</script>