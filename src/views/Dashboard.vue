<template>
    <div :style="{marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px'}">
        <template>
            <div v-for="definition in definitions" :key="definition.id">
                <Definition :definition="definition"/>
            </div>
        </template>
        <div v-if="isLoadingMore" :style="{ maxWidth: '600px', margin: '10px', textAlign: 'center' }">
            <a-spin size="large" />
        </div>
        <div v-if="!hasMore" :style="{ maxWidth: '600px', margin: '10px', textAlign: 'center' }">
            <p>Plus de résultat</p>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'

import {
    Spin
} from 'ant-design-vue'

import Definition from '@/components/Definition'

export default {
    name: 'dasboard',
    components: {
        Definition,
        'a-spin': Spin
        // 'a-col': Col,
        //'a-row': Row
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.$route.query.q
        this.getDefinitions(this.$route.query.q)
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
    watch: {
        '$route' (to, from) {
         if(from.query.q && to.query.q){ 
            this.$router.go()
           }    
       }
    },
    methods: { 
        ...mapActions({
            getDefinitionCollections: 'definition/getcollection'
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
        async getDefinitions(q) {
            console.log('LCS DASHBOARD VUE', q)
            let response = await this.getDefinitionCollections({ q })
            this.definitions = response.data.data
            this.next = response.data.links.next
            if (!this.next) {
                this.hasMore = false
            }
        }
    }
}
</script>