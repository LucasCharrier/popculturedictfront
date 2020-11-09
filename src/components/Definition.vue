
<template>
    <div class="card" :style="{ marginBottom: '20px', marginTop: '20px' }">
        <div class="card-content">
            <p class="title">
                {{ definition.word.name }}
            </p>
            <div class="content">
                <p class="subtitle definition">
                    {{ definition.text }}
                </p>
                <p class="subtitle exemple" :style="{ fontStyle: 'italic' }">
                    {{ definition.exemple }}
                </p>
                <span v-for="tag in definition.tags" :key="tag.id" :style="{marginRight: '10px'}">
                    <router-link :to="{
                        name: 'tag',
                        params: {
                            id: tag.id
                        }
                    }">#{{ tag.text }}</router-link>
                </span>
                <br>
                par <router-link :to="{
                        name: 'profile',
                        params: {
                            id: definition.user.id
                        }
                    }">#{{ definition.user.name }}</router-link>
            </div>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">
            <span>
                View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
            </span>
            </p>
            <p class="card-footer-item">
            <span>
                Share on <a href="#">Facebook</a>
            </span>
            </p>
        </footer>
    </div>
</template> 
<script>
    export default {
        props: ['definition']
    }
</script>
<style>
    .title{
        font-family: 'Copse', serif;
    }
    .subtitle.definition {
        font-family: 'Quicksand', sans-serif;
    }
    .subtitle.exemple {
        font-family: 'Quicksand', sans-serif;
    }
    .card {
        border-radius: 10px;
    }
/* font-family: 'Bree Serif', serif;
font-family: 'Copse', serif;
font-family: 'Montserrat', sans-serif;
font-family: 'Open Sans', sans-serif;
font-family: 'Quicksand', sans-serif; */
</style>