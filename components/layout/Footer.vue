<template>
    <v-footer :class="(!$vuetify.breakpoint.xs) ? 'py-6' : 'py-6'" class="primary_text d-block" dark>
        <v-container class="container-inner pa-0">
        <v-row dense class="justify-center  flex-column flex-lg-row">
            <v-col cols="12" lg="4">
                <CommonLogoH class="mb-lg-4" dark />
                <p class="pr-12">Somos una empresa de servicios, dedicada a la instalación y  mantenimiento de artefactos de calefacción con la más alta calidad  tecnológica.</p>
            </v-col>
            <v-col cols="12" lg="4" class="pl-8">
                <h5 class="mb-4">Contacto</h5>
                <p>O'Higgins 910 Hurlingham, Buenos Aires, Argentina</p>
                <p> <a href="phone:+549114662614" class="white--text">+54 9 11 4662-614</a></p>
                <p> <a href="mailto:hola@sim-giftbox.com" class="white--text">info@barrierclima.com.ar</a></p>
              <p>Lu-Vi 10am a 13pm - 14pm a 18.30pm</p>
            </v-col>
            <v-col cols="12" lg="4" class="text-md-right">
                <h5 class="mb-4">Seguinos en Redes</h5>
               <v-btn href="https://www.instagram.com/barrierclima/" target="_blank" fab class="mr-2" color="white">
                    <v-icon color="primary_text">mdi-instagram</v-icon>
                </v-btn>
                <v-btn href="https://www.facebook.com/barrierclima" target="_blank" fab color="white">
                    <v-icon color="primary_text">mdi-facebook</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="mb-3"></v-divider>
        <v-row>
            <v-col class="text-center">
                <p class="px-8 px-lg-3">‌© Copyright <a href="https://www.trade-design.com.ar/" target="_blak" class="white--text">Trade Design 2025</a></p>
            </v-col>
        </v-row>
    </v-container>
        <v-btn class="whatsapp" fab target="_blank"
            href="https://api.whatsapp.com/send?phone=5491126117588&text=Hola,%20estoy%20visitando%20tu%20tienda%20online%20y%20me%20gustar%C3%ADa%20consultarte%20por">
            <v-icon large color="white">mdi-whatsapp</v-icon>
        </v-btn>
    </v-footer>
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
                                "Ya registramos su email para nuestra newsletter",
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