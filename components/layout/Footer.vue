<template>
    <v-footer :class="(!$vuetify.breakpoint.xs) ? 'py-6' : 'py-6'" class="secondary d-block" dark>
        <v-container class="container-inner pa-0">
        <v-row dense class="justify-center  flex-column flex-lg-row">
            <v-col cols="12" lg="4">
                <CommonLogoH class="mb-lg-4" dark />
                <p>Sim es todo lo que está bien</p>
                <v-btn href="https://www.instagram.com/sim_giftbox/" target="_blank" icon color="primary">
                    <v-icon>mdi-instagram</v-icon>
                </v-btn>
                <v-btn href="https://www.linkedin.com/company/" target="_blank" icon color="primary">
                    <v-icon>mdi-linkedin</v-icon>
                </v-btn>
                <v-btn href="https://www.facebook.com/" target="_blank" icon color="primary">
                    <v-icon>mdi-facebook</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" lg="4">
                <h6 class="mb-2">Enlaces rápidos</h6>
                <v-list class="transparent" dense>

                    <v-list-item href="/#categorias">Colecciones</v-list-item>
                    <v-list-item href="/#porque">Sobre nosotros</v-list-item>
                    <v-list-item href="/#pasos">Cómo funciona</v-list-item>
                    <v-list-item href="/#testimonios">Testimonios</v-list-item>
                    <v-list-item href="/blog">Blog</v-list-item>
                </v-list>
            </v-col>
            <v-col cols="12" lg="4" class="text-md-right">
                <h6 class="mb-2">Contactanos</h6>
                <p>Buenos Aires, Argentina</p>
                <p> <a href="phone:+5491126117588" class="white--text">+54 9 11 2611-7588</a></p>
                <p> <a href="mailto:hola@sim-giftbox.com" class="white--text">hola@sim-giftbox.com</a></p>
                <h6 class="mb-2">Suscribite a nuestro newsletter mensual</h6>
                <v-text-field outlined dense append-icon="mdi-send" @click:append="subscribeEmail"
                    label="Ingresa tu email" v-model="emailSuscribe"></v-text-field>
            </v-col>
        </v-row>
        <v-divider class="mb-3"></v-divider>
        <v-row>
            <v-col class="text-center">
                <p class="px-8 px-lg-3">SIM Gift Box @‌2024 todos los derechos reservados - Diseño y Desarrollo: <a href="https://www.trade-design.com.ar/" target="_blak">Trade Design.</a></p>
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