
<template>
    <div class="card" :style="{ marginBottom: '20px', marginTop: '20px' }" ref="printMe">
        <div class="card-content">
            <p class="title">
                <router-link :to="{
                        name: 'dashboard',
                        query: {
                            q: data.word.name
                        }
                    }" append>{{ data.word.name }}</router-link>
            </p>
            <div class="content">
                <p class="subtitle definition">{{ data.text }}</p>
                <p class="subtitle exemple" :style="{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.5rem'
                }">{{ data.exemple }}</p>
                <div v-if="data.media_url">
                    <img :src="data.media_url"/>
                    <p><a :href="data.media_url">via giphy</a></p>
                    <br>
                </div>
                <p>
                    <span v-for="tag in data.tags" :key="tag.id" :style="{marginRight: '10px'}">
                        <router-link :to="{
                            name: 'tag',
                            params: {
                                id: tag.id,
                                text: tag.text
                            }
                        }">#{{ tag.text }}</router-link>
                    </span>
                </p>
                <br>
                par <router-link :to="{
                        name: 'profile',
                        params: {
                            id: data.user.id
                        }
                    }">{{ data.user.name }}</router-link>
            </div>
            <div class="field has-addons">
                <p class="control">
                    <a
                        @click.prevent="likeAction"
                        :class="{button: true, up: true, active: data.user_reaction === 'like'}">
                        <span class="icon is-small">
                            <i class="fas fa-thumbs-up"></i>
                        </span>
                        <span>{{data.user.id + (data.text.length > 100 ? (100 - data.word.name.length) : data.text.length + 50) + data.like }}</span>
                    </a>
                </p>
                <p class="control">
                    <a
                        @click.prevent="dislikeAction"
                        :class="{button: true, down: true, active: data.user_reaction === 'dislike'}">
                        <span class="icon is-small">
                            <i class="fas fa-thumbs-down"></i>
                        </span>
                        <span>{{data.user.id + (data.text.length > 50 ? (50 - data.word.name.length) : data.text.length) + data.dislike}}</span>
                    </a>
                </p>
            </div>
            <div :style="{ position: 'absolute', bottom: '40px', right: '20px'}">
                <a class="is-small is-twitter social-link-tpd" v-on:click.prevent="print('twitter')">
                    <span class="icon">
                    <i class="fab fa-twitter fa-lg"></i>
                    </span>
                </a>
                <a class="is-small is-instagram social-link-tpd" v-on:click.prevent="print('instagram')">
                    <span class="icon">
                    <i class="fab fa-instagram fa-lg"></i>
                    </span>
                </a>
                <!-- <a class="button is-small is-twitter" >
                    <span class="icon">
                        <i class="fas fa-twitter fa-lg"></i>
                    </span>
                </a>
                <a class="button is-small is-instagram" >
                    <span class="icon">
                        <i class="fas fa-instagram fa-lg"></i>
                    </span>
                </a> -->
            </div>
            <a class="button delete-button is-white"
                @click.prevent="deleteAction"
                v-if="(user || {}).id === data.user.id">
                <i class="fas fa-trash"/>
            </a>
        </div>
        <ShareModal v-if="modalVisible"
            :visible="modalVisible"
            @onHandleOk="onHandleOk"
            :type="type"
            @onHandleCancel="onHandleCancel"
            :definition="data" />
    </div>
</template> 
<script>
    import { mapActions, mapGetters } from 'vuex'

    import ShareModal from '@/components/ShareModal.vue'

    export default {
        props: ['definition'],
        data() {
            return {
                modalVisible: false,
                data: {
                    ...this.definition
                }
            }
        },
        components: {
            ShareModal
        },
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        },
        methods: {
            ...mapActions({
                like: 'user/like',
                dislike: 'user/dislike',
                showSignUpOrInModal: 'modal/showSignUpOrInModal',
                delete: 'definition/delete'
                // user: 'auth/user'
            }),
            async print(type) {
                // const el = this.$refs.printMe;
                // add option type to get the image version
                // if not provided the promise will return 
                // the canvas.
                this.modalVisible = true
                this.type = type
                // const options = {
                //     type: 'dataURL'
                // }
                // this.output = await this.$html2canvas(el, options);
                // console.log(this.output)
            },
            deleteAction() {
                this.delete({
                    id: this.data.id
                })
            },
            likeAction() {
                if (!this.authenticated) {
                    this.showSignUpOrInModal()
                    return
                }
                if (this.data.user_reaction === 'dislike')  {
                    this.data.dislike -= 1
                }
                if (this.data.user_reaction !== 'like') {
                    this.data.user_reaction = 'like'
                    this.data.like += 1
                    this.like({ id: this.data.id })
                }
            },
            dislikeAction() {
                if (!this.authenticated) {
                    this.showSignUpOrInModal()
                    return
                }
                if (this.data.user_reaction === 'like')  {
                    this.data.like -= 1
                }
                if (this.data.user_reaction !== 'dislike') {
                    this.data.user_reaction = 'dislike'
                    this.data.dislike += 1
                    this.dislike({ id: this.data.id })
                }
            },
            onHandleOk() {
                this.modalVisible = false
            },
            onHandleCancel() {
                this.modalVisible = false
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
        /* font-weight: 500; */
    }
    .subtitle.exemple {
        white-space: pre-wrap;
        font-family: Helvetica, sans-serif;
        font-weight: 300;
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
    .delete-button {
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .social-link-tpd {
        color: #363636
    }
    /* font-family: 'Bree Serif', serif;
    font-family: 'Copse', serif;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-family: 'Quicksand', sans-serif; */
</style>
