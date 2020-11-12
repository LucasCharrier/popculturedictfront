<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{
                    name: 'dashboard'
                }">
                <img src="/public/logo.png" height="28">
                <!-- <img src="@/assets/images/logo.png" height="28"> -->
                </router-link>
                <template>
                    <a role="button" class="navbar-burger burger navbar-central-button" aria-label="menu" @click.prevent="showModal">
                        <i class="fa fa-plus-circle"/> Ajouter une définition
                    </a>
                </template>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item is-hidden-mobile is-hidden-tablet-only" key="addDef" @click.prevent="showModal">Ajouter une définition</a>
                    <router-link :to="{
                    name: 'cgu'}" class="navbar-item is-hidden-desktop-only is-hidden-widescreen-only">CGU</router-link>
                    <router-link :to="{
                    name: 'privacy_policy'}" class="navbar-item is-hidden-desktop-only is-hidden-widescreen-only">Politique de confidentialité</router-link>
                
                </div>
                <div class="navbar-end">
                    <div class="navbar-item" v-if="authenticated">
                        <router-link class="navbar-item"  :to="{
                            name: 'profile',
                            params: {
                                id: user.id
                            }
                        }">
                            {{ user.name }}
                        </router-link>
                    </div>
                    <div class="navbar-item">
                        <div class="buttons">
                            <template v-if="authenticated">
                                <a class="button is-light" key="signout" @click.prevent="signOut">
                                    Sign Out
                                </a>
                            </template>
                            <template v-else>
                                <a class="button is-light"  @click.prevent="showSignUpModal">
                                    Sign Up
                                </a>
                                <a class="button is-light" @click.prevent="showSignInModal">
                                    Log in
                                </a>
                            </template>
                        </div>
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
        <SignInModal
            :visible="visibleSignInModal"
            @onHandleOk="handleOkSignInModal"
            @onHandleCancel="handleCancelSignInModal"/>
        <SignUpOrInModal
            :visible="visibleSignUpOrInModal"
            @onHandleOk="handleOkSignUpOrInModal"
            @onHandleCancel="handleCancelSignUpOrInModal"/>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import CreateDefModal from '../components/CreateDefModal.vue'
    import SignUpModal from '@/components/SignUpModal.vue'
    import SignInModal from '@/components/SignInModal.vue'
    import SignUpOrInModal from '@/components/SignUpOrInModal.vue'

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
                visibleSignInModal: false,
                visibleSignUpOrInModal: false,
                document: ''
            }
        },
        mounted() {
            this.document = document
            this.setBugerMenu()
        },
        components: {
            CreateDefModal,
            SignUpModal,
            SignInModal,
            SignUpOrInModal
        },
        methods: {
            ...mapActions({
                signOutAction: 'auth/signOut',
                showSignUpOrInModal: 'modal/showSignUpOrInModal'
            }),
            showModal() {
                if (!this.authenticated) {
                    this.showSignUpOrInModal()
                } else {
                    this.visible = true
                }
            },
            showSignUpModal() {
                this.visibleSignUpModal = true;
            },
            showSignInModal() {
                this.visibleSignInModal = true;
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
            handleOkSignInModal() {
                this.visibleSignInModal = false;
            },
            handleCancelSignInModal() {
                this.visibleSignInModal = false;
            },
            handleOkSignUpOrInModal() {
                this.visibleSignUpOrInModal = false;
            },
            handleCancelSignUpOrInModal() {
                this.visibleSignUpOrInModal = false;
            },
            signOut() {
                this.signOutAction().then(() => {
                })
            },
            setBugerMenu() {
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
                // Check if there are any navbar burgers
                if ($navbarBurgers.length > 0) {

                    // Add a click event on each of them
                    $navbarBurgers.forEach( el => {
                        el.addEventListener('click', () => {

                            // Get the target from the "data-target" attribute
                            const target = el.dataset.target;
                            const $target = document.getElementById(target);

                            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                            el.classList.toggle('is-active');
                            $target.classList.toggle('is-active');

                        });
                    });
                }
            }
        }
    }
</script>
<style>
    .navbar {
        background-color: mediumaquamarine;
    }
    .navbar-burger.navbar-central-button {
        width: auto;
        line-height: 3.25rem;
        color: #363636;
    }
    .navbar-burger.button {
        margin-right: .5rem;
        margin-bottom: .5rem;
        margin-top: .5rem;
        height: 2.25rem;
        width: auto;
    }
    .navbar-burger {
       color: #363636;
    }
</style>