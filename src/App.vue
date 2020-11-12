<template>
    <div id="app">
        <TheNavigation />
        <div class="container">
            <router-view :style="{marginTop: '20px'}"/>
        </div>
        <portal-target name="signInModal"/>
        <portal-target name="signUpModal"/>
        <portal-target name="createDefModal"/>
        <portal-target name="shareModal"/>
        <portal-target name="signUpOrInModal" />
        <div class="is-hidden-mobile is-hidden-tablet-only floating-utils-box">
            <ul>
                <li>
                    <router-link :to="{name: 'cgu'}" >CGU</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'privacy_policy'}">Politique de confidentialité</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import TheNavigation from '@/components/TheNavigation.vue'

    export default {
        components: {
            TheNavigation 
        },
        metaInfo() {
            return { 
                title: "The Pop Dictionnaire - Le dictionnaire de la pop culture",
                meta: [
                    { name: 'description', content:  'Le dictionnaire de la pop culture, le top 100 des meilleurs mots pop de la pop culture définis par la communauté.'},
                    { property: 'og:title', content: "The Pop Dictionnaire - Le dictionnaire de la pop culture"},
                    { property: 'og:description', content: "Le dictionnaire de la pop culture, le top 100 des meilleurs mots pop de la pop culture définis par la communauté."},
                    { property: 'og:site_name', content: 'The Pop Dictionnaire'},
                    { property: 'og:type', content: 'website' },    
                    { name: 'robots', content: 'index,follow' },
                    { property: 'twitter:title', content: "The Pop Dictionnaire - Le dictionnaire de la pop culture"},
                    { property: 'twitter:description', content: "Le dictionnaire de la pop culture, le top 100 des meilleurs mots pop de la pop culture définis par la communauté."},
                    { property: 'twitter:site', content: 'The Pop Dictionnaire'},
                    { property: 'og:type', content: 'website' },    
                    { name: 'robots', content: 'index,follow' },
                ],
                link: [
                    { rel: 'canonical', href: 'http://www.thepopdictionnaire.com/' },
                ]
            }
        },
        mounted() {
            this.document = this.document
        },
        data() {
            return { 
                document: ''
            }
        }
    }

</script>
<style lang='css'>
    body {
        font-family: 'Quicksand', sans-serif;
        background-color:ghostwhite;
    }
    .floating-utils-box {
        position: fixed;
        right: 10px;
        bottom: 10px;
    }
    .toasted.toaster-tpd.toasted-primary.success {
        background-color: mediumaquamarine;
    }
    .toasted.toaster-tpd.outline.success {
        color: #363636;
        box-shadow: 0 2px 0 black;
        border-color: black;
    }
    /* font-family: 'Bree Serif', serif;
    font-family: 'Copse', serif;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;P
    font-family: 'Quicksand', sans-serif; */
</style>
