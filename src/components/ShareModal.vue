<template>
    <portal to="shareModal">
        <div class="modal is-active" @click="handleCancel">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Partager sur les réseaux</p>
                <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                <!-- <div @click.stop class="modal-content"> -->
                    <!-- <div class="box"> -->
                    <p>Voici une image vous pouvez la copier ou l'enregistré avec un clique droit dessus</p>
                    <SmallDefinition :definition="definition"/>
                    <p>1. clique droit sur l'image ci-dessus</p>
                    <p>2. puis clique sur copier limage</p>
                    <p>3. puis clique sur le boutton twitter et clique
                        droit et colle dans l'encart twitter l'image copier precédemment</p>
                    <br>
                    <a
                        target="_blank"
                        :href="'https://twitter.com/intent/tweet?text='+ definition.word.name"
                        class="button is-primary">share on twitter</a>
                </section>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </portal>
</template>
<script>
import { mapActions } from 'vuex'
import SmallDefinition from '@/components/SmallDefinition'

export default {
    name: 'shareModal',
    components: {
        SmallDefinition
    },
    props: {
        visible: Boolean,
        definition: Object
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: { 
        ...mapActions({
            signIn: 'auth/signIn'
        }),
        handleOk() {
            this.$emit('onHandleOk')
        },
        handleCancel() {
            this.$emit('onHandleCancel')
        },
        submit() {
            this.signIn(this.form).then(() => {
                this.$emit('onHandleOk')
                this.$router.replace({
                    name: 'dashboard'
                }).catch(() => {
                    console.log('failed')
                })
            })
        }
    }
}
</script>