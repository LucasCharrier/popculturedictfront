<template>
    <div>
        <a-menu mode="horizontal">
            <a-menu-item key="home"> 
                <router-link :to="{
                    name: 'dashboard'
                }">
                    Le Dictionnaire Urbain
                </router-link>
            </a-menu-item>
            <a-menu-item>
                <a-input-search placeholder="Chercher une définition" style="width: 200px" @search="onSearch" v-model="searchedValue" />
            </a-menu-item>
            <a-menu-item key="tag"> 
                <router-link :to="{
                    name: 'tags'
                }">
                    Tags
                </router-link>
            </a-menu-item>
            <template v-if="authenticated">
                <a-menu-item key="addDef" @click="showModal"><a-icon type="appstore" />Ajouter une définition</a-menu-item>
                <a-menu-item key="username">
                    <router-link :to="{
                        name: 'profile',
                        params: {
                            id: user.id
                        }
                    }">
                        <a-icon type="appstore" />
                        {{ user.name }}
                    </router-link>        
                </a-menu-item>
                
                <a-menu-item key="signout"> 
                    <a href="#" @click.prevent="signOut">
                        Sign Out
                    </a>
                </a-menu-item>
            </template>
            <template v-else>
                <a-menu-item key="signin" :style="{ float: 'right' }"> 
                    <router-link :to="{
                        name: 'signin'
                    }">
                        signin
                    </router-link>
                </a-menu-item>
                <a-menu-item key="signup" :style="{ float: 'right' }" @click="showSignUpModal"> 
                    signup
                </a-menu-item>
            </template>
        </a-menu>
        <CreateDefModal
            :visible="visible"
            @onHandleOk="handleOk"
            @onHandleCancel="handleCancel"/>
        <SignUpModal
            :visible="visibleSignUpModal"
            @onHandleOk="handleOkSignUpModal"
            @onHandleCancel="handleCancelSignUpModal"/>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import { Menu, Input, Icon }  from 'ant-design-vue'
    import CreateDefModal from '@/components/CreateDefModal.vue'
    import SignUpModal from '@/components/SignUpModal.vue'
    export default {
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        },
        data() {
            return {
                visible: false,
                visibleSignUpModal: false,
                searchedValue: ''
            }
        },
        components: {
            'a-menu': Menu,
            'a-menu-item': Menu.Item,
            'a-icon': Icon,
            'a-input-search': Input.Search,
            'CreateDefModal': CreateDefModal,
            SignUpModal
            // 'a-sub-menu': Sub.menu
        },
        methods: {
            ...mapActions({
                signOutAction: 'auth/signOut'
            }),
            showModal() {
                this.visible = true;
            },
            showSignUpModal() {
                this.visibleSignUpModal = true;
            },
            handleOk() {
                this.visible = false;
                this.confirmLoading = false;
            },
            handleCancel() {
                this.visible = false;
            },
            handleOkSignUpModal() {
                this.visibleSignUpModal = false;
            },
            handleCancelSignUpModal() {
                this.visibleSignUpModal = false;
            },
            onSearch() {
                if (this.searchedValue) {
                    console.log('LCS TEST TOTO', this.searchedValue)
                    this.$router.push({
                        // name: 'dashboard',
                        query: { q: this.searchedValue }
                    }).catch((e) => {
                        console.log('failed', e)
                    })
                }
            },
            signOut() {
                this.signOutAction().then(() => {
                })
            }
        }
    }
</script>