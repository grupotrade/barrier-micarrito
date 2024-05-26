<template>
    <v-container fluid class="pa-0  container-inner">
        <v-row dense no-gutters align="center" justify="end" class="flex-column-reverse flex-lg-row">
            <v-col cols="12" lg="12">
                <v-row dense no-gutters justify="end" align="center">
                    <v-col cols="12" lg="6" class="pr-8">
                        <div class=" ml-lg-10">
                        <h2 class="white--text my-5">
                            Descarga nuestro <br>E-BOOK
                        </h2>
                        <p class="white--text">Los 5 errores más frecuentes en la elección de regalos<br> corporativos y ¡cómo superarlos con éxito!</p>
                            <v-text-field outlined dense append-icon="mdi-send" style="width:350px"  @click:append="subscribeEmail" label="Ingresa tu email" class="white" hide-details v-model="emailSuscribe"></v-text-field>
                        <p class="white--text mt-2">* He leído y acepto el tratamiento de mis datos <br>según descrito en
                            la politica de privacidad.</p>

                        <v-btn rounded depressed color="yellow"
                            @click="subscribeEmail"
                            class="mr-3 mb-3">
                            <v-icon left>mdi-email</v-icon> Suscribirme
                        </v-btn>
                    </div>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-img src="/img/download.png">

                        </v-img>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    data() {
        return {
            emailSuscribe: ''
        }
    },
    methods: {
        subscribeEmail() {
            if (this.emailSuscribe) {
                let payload = {
                    email: this.emailSuscribe
                }
                this.$store.dispatch('users/subscribeEmail', payload)
                    .then(() => {
                        this.$dialog.show({
                            name: "Gracias por suscribirse",
                            text:
                                "Ya registramos su email para nuestra newsletter. Gracias!",
                            hidecancel: true,
                            buttons: [{
                                text: this.$t("accept"),
                                color: "primary",
                                handle: () => {
                                    this.$dialog.hide();
                                    this.emailSuscribe = ''
                                },
                            },],
                        });

                    })
            }
        }
    }
}
</script>