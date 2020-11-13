<template>
        <div>
            <h1 class='title'>Votre confidentialité</h1>
            <p>Lorsque vous consultez un site web, certaines informations peuvent être stockées ou récupérées, principalement sous la forme de cookies. Ces informations peuvent être relatives à vos préférences, à l'appareil que vous utilisez ou vous concerner personnellement. Elles sont principalement utilisées pour faire en sorte que le site fonctionne conformément à vos attentes. Elles ne permettent généralement pas de vous identifier directement, mais elles peuvent vous offrir une expérience de navigation plus personnalisée sur le site. Comme nous respectons votre droit à la vie privée, vous pouvez choisir de ne pas autoriser certains types de cookies. Cliquez sur les différents en-têtes de catégorie pour en savoir plus et modifier nos paramètres par défaut. Sachez toutefois que le blocage de certains types de cookies peut avoir un impact sur votre utilisation du site et sur les services que nous pouvons offrir.
            </p>
            <br>
            <h2 class="subtitle">Cookies strictement nécessaires</h2>
            <p>
                Ces cookies sont nécessaires au fonctionnement du site web et ne peuvent être désactivés dans nos systèmes. Ils sont généralement uniquement déposés en réponse à des actions de votre part correspondant à une demande de services, comme définir vos préférences de confidentialité, vous connecter ou remplir des formulaires. Vous pouvez configurer votre navigateur pour qu'il bloque ces cookies ou vous signale leur présence, mais certaines parties du site risquent alors de ne pas fonctionner.
            </p>
            <br>
            <table class="table">
                <tbody>
                    <tr>
                        <td>
                            <span class="icon">
                                <i class="fas fa-check-square"></i>
                            </span>
                        </td>
                        <td>The Pop Dictionnaire</td>
                    </tr>
                    <!-- <tr>
                        <td>17</td>
                        <td>Relegation to the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_Football_League_Championship" title="2016–17 Football League Championship">Football League Championship</a></td>
                    </tr> -->
                </tbody>
            </table>
            <br>
            <h2 class="subtitle">Cookies de performance</h2>
            <p>
                Ces cookies nous permettent de compter le nombre de visites et de sources du trafic, afin de mesurer et d'améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les plus et les moins populaires et comment les visiteurs naviguent sur le site. Toutes les informations que ces cookies collectent sont regroupées et donc anonymes. Si vous n'autorisez pas ces cookies, nous ne pourrons pas savoir quand vous avez visité notre site.
            </p>
            <br>
            <table class="table">
                <tbody>
                    <tr>
                        <td>
                            <label class="checkbox">
                                <input type="checkbox" v-model="googleAnalytics">
                            </label>
                        </td>
                        <td>Google Analytics</td>
                    </tr>
                </tbody>
            </table>
            <div class="buttons is-right">
                <button class="button is-primary" @click="onClickOk">Ok</button>
            </div>
        </div>
</template>
<style>
    h2.subtitle {
        text-align: left;
    }
    p {
        text-align: left;

    }
</style>
<script>
    import GdprConsentFrame from '@/components/GdprConsentFrame'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data() {
            return {
                googleAnalytics: false,
                checkbox: true,
                listPackage: this.consentPackageConfig || {}
            }
        },
        computed: {
            ...mapGetters({
                consentPackageConfig: 'auth/consentPackageConfig',
            }),
        },
        components: {
            'gdpr-consent-frame': GdprConsentFrame 
        },
        props: {
            storageName: {
                type: String,
                default: 'cookie:accepted'
            },
            canUseLocalStorage () {
                return true
                //return this.storageType === STORAGE_TYPES.local && this.supportsLocalStorage
            }
        },
        methods: {
            onClickOk() {
                // console.log(this.$swal)
                this.sentData(this.listPackage)
                // this.$swal.close()
            },
        },
        watch: {
            googleAnalytics (newVal) { 
                console.log('LCS TEST', this.listPackage)
                if (newVal) {
                    this.listPackage['cookie:consent:google-analytics'] = true
                } else {
                    this.listPackage['cookie:consent:google-analytics'] = false
                }
            }
        }
    }
</script>