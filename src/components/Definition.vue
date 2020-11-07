
<template>
    <div class="card" :style="{ marginBottom: '20px', marginTop: '20px' }">
        <div class="card-content">
            <p class="title">
                {{ definition.word.name }}
            </p>
            <div class="content">
                <p class="subtitle">
                    {{ definition.text }}
                </p>
                <p class="subtitle" :style="{ fontStyle: 'italic' }">
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
                by <router-link :to="{
                        name: 'profile',
                        params: {
                            id: definition.user.id
                        }
                    }">#{{ definition.user.name }}</router-link>
                    <time datetime="2016-1-1">{{ definition.createdAt }}</time>
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