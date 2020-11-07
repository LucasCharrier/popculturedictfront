<template>    
    <a-card :title="definition.word.name" :style="{ width: '300px', margin: '10px' }">
        <p>{{ definition.text }}</p>
        <p>
            <router-link :to="{
                    name: 'profile',
                    params: {
                        id: definition.user.id
                    }
                }">
                <a-icon type="appstore" />
                {{ definition.user.name }}
            </router-link>
        </p>
        <p>
            {{ definition.exemple }}
        </p>
        <p>
            <span v-for="tag in definition.tags" :key="tag.id" :style="{marginRight: '10px'}">
                <router-link :to="{
                    name: 'tag',
                    params: {
                        id: tag.id
                    }
                }">#{{ tag.text }}</router-link>
            </span>
        </p>
    </a-card>
</template>    
<script>
    import { 
        Card,
        Icon
    } from 'ant-design-vue';

    export default {
        components: {
            'a-card': Card,
            'a-icon': Icon
            //'a-row': Row
        },
        props: ['definition']
    }
</script>