<template>
    <v-sheet>
        <v-sheet class="container-banner">
            <BannersListBanners position="home-header" />
        </v-sheet>
        <v-container fluid class="container-inner categories">
            <v-row justify="center">
                <v-col cols="12" md="4">
                    <v-card>
                        <v-img src="/img/hogares.png" ></v-img>
                        <!-- <v-card-title>HOGARES</v-card-title>
                        <v-card-actions>
                            <v-btn text>Ver más</v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-img src="/img/comercial.png" ></v-img>
                        <!-- <v-card-title>COMERCIAL</v-card-title>
                        <v-card-actions>
                            <v-btn text>Ver más</v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-img src="/img/profesionales.png"></v-img>
                        <!-- <v-card-title>PROFESIONALES DE OBRA</v-card-title>
                        <v-card-actions>
                            <v-btn text>Ver más</v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- How We Work -->
        <v-container fluid class="container-inner mt-10 how-we-work">
            <h2 class="separator">¿CÓMO TRABAJAMOS?</h2>
            <v-row>
                <v-col cols="12" md="3">
                    <h4 class="py-6">Tu comodidad, nuestro compromiso.</h4>
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
                            <p class="text-center mt-10">{{ step.number }}
                                <br> {{ step.text }}
                            </p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-col cols="12" md="2" v-for="step in steps" :key="step.number">
                <div
                    :style="{ backgroundColor: getColor(step.number), borderRadius: '50%', width: '50px', height: '50px', margin: '0 auto' }">
                </div>
                <p>{{ step.number }}. {{ step.text }}</p>
            </v-col>
        </v-container>

        <v-container fluid id="clientes" class="grey lighten-3 text-center px-0 py-6">
            <h3 class="pb-12">Trabajamos con marcas líderes en el Mercado.</h3>
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
                { number: 5, text: "SERVICIO POST VENTA" },
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
