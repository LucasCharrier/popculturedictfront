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
                        { rel: 'canonical', href: `https://www.thepopdictionnaire.com${this.$route.fullPath}` },
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