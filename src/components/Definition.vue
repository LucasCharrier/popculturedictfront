
<template>
    <div class="card" :style="{ marginBottom: '20px', marginTop: '20px' }" ref="printMe">
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
                <br>
                par <router-link :to="{
                        name: 'profile',
                        params: {
                            id: definition.user.id
                        }
                    }">{{ definition.user.name }}</router-link>
            </div>
            <div class="field has-addons">
                <p class="control">
                    <a
                        @click.prevent="likeAction"
                        :class="{button: true, up: true, active: definition.user_reaction === 'like'}">
                        <span class="icon is-small">
                            <i class="fas fa-thumbs-up"></i>
                        </span>
                        <span>{{definition.user.id + (definition.text.length > 100 ? (100 - definition.word.name.length) : definition.text.length) + definition.like }}</span>
                    </a>
                </p>
                <p class="control">
                    <a
                        @click.prevent="dislikeAction"
                        :class="{button: true, down: true, active: definition.user_reaction === 'dislike'}">
                        <span class="icon is-small">
                            <i class="fas fa-thumbs-down"></i>
                        </span>
                        <span>{{definition.user.id + (definition.text.length > 50 ? (50 + definition.word.name.length) : definition.text.length) + definition.dislike}}</span>
                    </a>
                </p>
            </div>
        </div>
        <!-- <footer class="card-footer">

            <p class="card-footer-item">
            <span>
                View on <a href="" @click.prevent="print">Twitter</a>
            </span>
            </p>
            <p class="card-footer-item">
            <span>
                Share on <a href="#">Facebook</a>
            </span>
            </p>
        </footer> -->
        <ShareModal v-if="visible"
            :visible="visible"
            @onHandleOk="onHandleOk"
            @onHandleCancel="onHandleCancel"
            :definition="definition" />
    </div>
</template> 
<script>
    import { mapActions } from 'vuex'

    import ShareModal from '@/components/ShareModal'

    export default {
        props: ['definition'],
        data() {
            return {
                visible: false
            }
        },
        components: {
            ShareModal
        },
        methods: {
            ...mapActions({
                like: 'user/like',
                dislike: 'user/dislike',
            }),
            async print() {
                // const el = this.$refs.printMe;
                // add option type to get the image version
                // if not provided the promise will return 
                // the canvas.
                console.log('LCS DEFINITION PRINT')
                this.visible = true
                // const options = {
                //     type: 'dataURL'
                // }
                // this.output = await this.$html2canvas(el, options);
                // console.log(this.output)
            },
            likeAction() {
                console.log('LCS TEST LIKE')
                this.like({ id: this.definition.id })
            },
            dislikeAction() {
                console.log('LCS TEST DISLIKE')
                this.dislike({ id: this.definition.id })
            },
            onHandleOk() {

            },
            onHandleCancel() {

            }
        }
    }
</script>
<style>
    .title{
        font-family: 'Copse', serif;
    }
    .subtitle.definition {
        font-family: 'Quicksand', sans-serif;
        white-space: pre-wrap;
    }
    .subtitle.exemple {
        font-family: 'Quicksand', sans-serif;
        white-space: pre-wrap;
    }
    .card {
        border-radius: 10px;
    }
    .title a {
        color: #363636;
    }
    .button.up, .button.down {
        box-shadow: 0 2px 0 black;
        border: 1px #000 solid;
    }
    .button.up.active, .button.down.active {
        box-shadow: 0 0 0 black;
        position: relative;
        top: 2px;
        background-color: mediumaquamarine;
        /* background-color: #05ff56; */
        /* background-color: #EFFF00; */
    }
    /* font-family: 'Bree Serif', serif;
    font-family: 'Copse', serif;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Quicksand', sans-serif; */
</style>