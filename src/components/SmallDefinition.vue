
<template>
    <div :style="{
        position: 'relative',
        width: '365px',
        minHeight: '365px',
        marginRight: 'auto',
        padding: '5px',

        marginLeft: 'auto' }" ref="printMe">
        <div class="card" :style="{
            border: '1px solid #ccc',
            minHeight: '365px',
            maxWidth: '365px',
            position: 'relative'}">
            <div class="card-content">
                <p class="title">
                    <router-link :to="{
                            name: 'dashboard',
                            query: {
                                q: definition.word.name
                            }
                        }" append>{{ definition.word.name }}</router-link>
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
                                id: tag.id,
                                text: tag.text
                            }
                        }">#{{ tag.text }}</router-link>
                    </span>
                    <a :style="{ position: 'absolute', bottom: '5px', right: '10px', color: '#363636'}">www.thepopdictionnaire.com</a>
                    <!-- <br>
                    par <router-link :to="{
                            name: 'profile',
                            params: {
                                id: definition.user.id
                            }
                        }">{{ definition.user.name }}</router-link> -->
                </div>
            </div>
        </div>
        <img v-if="output" :src="output" class="small-definition-image">
    </div>
</template> 
<script>
    export default {
        props: ['definition'],
        mounted(){
            this.print()
        },
        data() {
            return {
                'output': ''
            }
        },
        methods: {
            async print() {
                console.log('LCS ON MOUNTED')
                const el = this.$refs.printMe;
                // add option type to get the image version
                // if not provided the promise will return 
                // the canvas.
                const options = {
                    type: 'dataURL'
                }
                this.output = await this.$html2canvas(el, options);
                console.log(this.output)
            }
        }
    }
</script>
<style scoped>
    .small-definition-image {
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>