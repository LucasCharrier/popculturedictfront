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
                <li><a :href="document.location.origin + '/cgu.html'">CGU</a></li>
                <li><a :href="document.location.origin + '/privacy_policy.html'">Politique de confidentialité</a></li>
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
        data() {
            return { document: document }
        }
    }

    </script>
    <style>
        body {
            font-family: 'Quicksand', sans-serif;
            background-color:ghostwhite;
        }
        .floating-utils-box {
            position: fixed;
            right: 10px;
            bottom: 10px;
        }
        /* font-family: 'Bree Serif', serif;
        font-family: 'Copse', serif;
        font-family: 'Montserrat', sans-serif;
        font-family: 'Open Sans', sans-serif;P
        font-family: 'Quicksand', sans-serif; */
</style>
