<template>
    <v-container class="container-inner">
        <v-row dense no-gutters justify="end" align="center">
            <v-col cols="12">
                <v-row dense no-gutters justify="center" align="center" class="flex-column-reverse flex-lg-row">
                    <v-col cols="12" lg="5">
                        <v-img src="/img/contacto.jpg" cover :height="$vuetify.breakpoint.xs ? '500' : '400'">

                        </v-img>
                    </v-col>
                    <v-col cols="12" lg="6" class="text-center text-lg-left pl-lg-12">
                        <h4 class="mt-4 mt-lg-8 mb-5">
                            ¿Listo para sorprender?
                        </h4>
                        <h2 class="mb-8">
                            Personalizá tu regalo hoy. <br> Contactate con nosotros.
                        </h2>
                        <v-row dense class="pb-6 pb-lg-2 justify-center justify-lg-start">
                            <v-btn rounded depressed color="primary"
                                href="https://api.whatsapp.com/send?phone=5491126117588&text=Hola,%20estoy%20visitando%20tu%20tienda%20online%20y%20me%20gustar%C3%ADa%20consultarte%20por  "
                                class="mr-3 mb-3">
                                <v-icon left>mdi-whatsapp</v-icon> Whatsapp
                            </v-btn>
                            <v-btn rounded depressed color="primary" href="mailto:hola@trade-design.com.ar"
                                class="mb-3">
                                <v-icon left>mdi-email-outline</v-icon> Email
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>