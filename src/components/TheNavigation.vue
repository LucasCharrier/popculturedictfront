<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{
                    name: 'dashboard'
                }">
                    <img src="@/assets/images/logo.png" height="28">
                </router-link>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link class="navbar-item" :to="{
                        name: 'tags'
                    }">
                        Tags
                    </router-link>
                    <template v-if="authenticated">
                        <a class="navbar-item" key="addDef" @click.prevent="showModal">Ajouter une définition</a>
                        <router-link class="navbar-item"  :to="{
                            name: 'profile',
                            params: {
                                id: user.id
                            }
                        }">
                            {{ user.name }}
                        </router-link>
                    </template>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                        More
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item">
                                Jobs
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <template v-if="authenticated">
                            <a class="button is-light" key="signout" @click.prevent="signOut">
                                Sign Out
                            </a>
                        </template>
                        <template v-else>
                            <router-link class="button is-primary" :to="{
                                name: 'signin'
                            }">
                                signin
                            </router-link>
                            <a class="button is-light" @click.prevent="showSignUpModal">
                                Log in
                            </a>
                        </template>
                    </div>
                </div>
            </div>
        </nav>
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
                visibleSignUpModal: false
            }
        },
        components: {
            // 'a-menu': Menu,
            // 'a-menu-item': Menu.Item,
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
            signOut() {
                this.signOutAction().then(() => {
                })
            }
        }
    }
</script>