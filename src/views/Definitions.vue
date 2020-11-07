<template>
    <div>
        <template>
            <div style="background-color: #ececec; padding: 20px;">
                <template>
                    <div v-for="definition in definitions" :key="definition">
                        <Definition :definition="definition"/>
                    </div>
                </template>
                <!-- </a-row> -->
            </div>
        </template>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

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
    methods: { 
        ...mapActions({
            getDefinitionCollectionsByTag: 'definition/getCollectionByTag'
        }),
        async getDefinitions() {
            let response = await this.getDefinitionCollectionsByTag({
                tagId: this.$route.params.id
            })
            this.definitions = response.data.data
        }
    }
}
</script>