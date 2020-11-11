<template>
    <div style="background-color: #ececec; padding: 20px;">
        <template>
            <div v-if="definition">
                <Definition :definition="definition"/>
            </div>
        </template>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import Definition from '../components/Definition.vue'


    export default {
        name: 'dasboard',
        components: {
            Definition
            //'a-row': Row
        },
        created () {
            // fetch the data when the view is created and the data is
            // already being observed
            this.getDefinitionAction()
        },
        data() {
            return {
                form: {
                    name: '',
                    text: ''
                },
                definition: {}
            }
        },
        methods: { 
            ...mapActions({
                getDefinition: 'definition/get'
            }),
            async getDefinitionAction() {
                let response = await this.getDefinition({
                    id: this.$route.params.id
                })
                this.definition = response.data.data
                return this.definition
            },
        }
    }
</script>