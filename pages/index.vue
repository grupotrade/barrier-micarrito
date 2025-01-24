<template>
    <v-sheet>
        <v-sheet class="container-banner">
            <BannersListBanners position="home-header" />
        </v-sheet>
        <v-container fluid class="container-inner mt-12">
       <ServicesCards />
    </v-container>
        <!-- How We Work -->
        <v-container fluid class="container-inner mt-12">
            <h2 class="separator">¿CÓMO TRABAJAMOS?</h2>
            <v-row>
                <v-col cols="12" md="3">
                    <h3 class="py-6 semi">Tu comodidad, nuestro compromiso.</h3>
                    <p>Creemos que es posible mejorar tu calidad de
                        vida y el confort en tu hogar. Por eso, nos encargamos de cada etapa del proyecto para
                        garantizar tu total satisfacción. Contamos con
                        un servicio integral a cargo de personal
                        calificado, asegurando un resultado eficiente
                        para tu hogar.</p>
                </v-col>
                <v-col>
                    <v-row justify="center">
                        <v-col class="pt-12" v-for="step in steps" :key="step.number">
                            <div
                                :style="{ backgroundColor: getColor(step.number), borderRadius: '50%', width: '70px', height: '70px', margin: '0 auto' }">
                            </div>
                            <div class="text-center semi mt-10 mx-5">
                                <p class="semi mb-0" v-html="step.number"></p>
                                <p class="semi" v-html="step.text"></p>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid class="contact-info primary text-center py-8 my-6">
            <v-row justify="center white--text">
                <v-col cols="12" md="2">
                    <v-icon color="white" class="mb-2">mdi-map-marker</v-icon>
                    <p class="mb-0">O'Higgins 910</p>
                </v-col>
                <v-col cols="12" md="2">
                    <v-icon color="white" class="mb-2">mdi-clock</v-icon>
                    <p class="mb-0">Lu-Vi 10am a 13pm - 14pm a 18.30pm</p>
                </v-col>
                <v-col cols="12" md="2">
                    <v-icon color="white" class="mb-2">mdi-phone</v-icon>
                    <p class="mb-0">(+54 11) 4662-6140</p>
                </v-col>
                <v-col cols="12" md="2">
                    <v-icon color="white" class="mb-2">mdi-email</v-icon>
                    <p class="mb-0">info@barrierclima.com.ar</p>
                </v-col>
                <v-col cols="12" md="2">
                    <v-icon color="white" class="mb-2">mdi-phone</v-icon>
                    <p class="mb-0">+54 911 3782-7119</p>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid class="container-inner mt-12 pb-12">
            <h3 class="semi pb-12">Trabajamos con marcas líderes en el Mercado.</h3>
            <client-only>
                <BrandsSlider />
            </client-only>
        </v-container>

        

    </v-sheet>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            steps: [
                { number: 1, text: "CONTACTO CON EL CLIENTE" },
                { number: 2, text: "PLANIFICACIÓN Y DISEÑO" },
                { number: 3, text: "DESARROLLO DEL PROYECTO" },
                { number: 4, text: "PUESTA EN MARCHA DEL SISTEMA" },
                { number: 5, text: "SERVICIO POST&nbsp;VENTA" },
            ],
        }
    },
    computed: {
        user() {
            return this.$store.state.authUser;
        }
    },
    methods: {
        getColor(stepNumber) {
            const colors = ['#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5'];
            return colors[stepNumber - 1];
        }
    }
}
</script>

<style>
.input-products.v-input--dense.v-text-field--outlined>.v-input__control>.v-input__slot {
    min-height: 28px !important;
}
</style>
