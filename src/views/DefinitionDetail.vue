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
        metaInfo() {
            if (this.definitions && this.definitions.length) {
                return { 
                    title: `${this.definitions[0].word.name} : ${this.definitions[0].text}`,
                    meta: [
                        { name: 'description', content: `${this.definitions[0].text}`},
                        { property: 'og:title', content: `${this.definitions[0].text}`},
                        { property: 'og:site_name', content: 'The Pop Dictionnaire'},
                        {property: 'og:type', content: 'website'},    
                        {name: 'robots', content: 'index,follow'} 
                    ]
                }
            }
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