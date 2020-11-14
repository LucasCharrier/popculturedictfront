
<template>
    <div style='position: relative;'>
        <div :style="{
            position: 'relative',
            minHeight: type === 'twitter' ? 'auto' : '365px',
            maxWidth: type === 'twitter' ? '530px' : '365px',
            marginRight: 'auto',
            padding: '5px',

            marginLeft: 'auto' }" ref="printMe">
            <div class="card" :style="{
                border: '1px solid #ccc',
                minHeight: type === 'twitter' ? 'auto' : '365px',
                maxWidth: type === 'twitter' ? '530px' : '365px',
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
                        <p :class="{'subtitle definition': true, 'definition-twitter': type === 'twitter' }">{{ definition.text }}</p>
                        <p v-if="!removeExemple" :class="{'subtitle exemple': true, 'exemple-twitter': type === 'twitter' }" :style="{ fontStyle: 'italic' }">{{ definition.exemple }}</p>
                        <!-- <span v-for="tag in definition.tags" :key="tag.id" :style="{marginRight: '10px'}">
                            <router-link :to="{
                                name: 'tag',
                                params: {
                                    id: tag.id,
                                    text: tag.text
                                }
                            }">#{{ tag.text }}</router-link>
                        </span> -->
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
            
        </div>
        <div  class="small-definition-image">
            <img v-if="output" :src="output">
        </div>
    </div>
</template> 
<script>
    export default {
        props: ['definition'],
        mounted(){
            this.print()
        },
        props: {
            type: {
                type: String,
                default: 'twitter'
            },
            definition: {
                type: Object
            },
            removeExemple: {
                type: Boolean
            }
        },
        watch: { 
            removeExemple: function(newVal, oldVal) { // watch it
                this.print()
            },
            type: function(newVal, oldVal) { // watch it
                this.print()
            },
        },
        data() {
            return {
                'output': ''
            }
        },
        methods: {
            async print() {
                console.log('LCS ON MOUNTED')
                this.output = null
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
        width: 100%;
        text-align: center;
        height: 100%;
        background-color: white;
    }
    .description-twitter {
        /* overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5; 
        -webkit-box-orient: vertical; */
    }
    .exemple-twitter {
        /* overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5; number of lines to show
        -webkit-box-orient: vertical; */
    }
</style>