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
                    <h4 class="py-6 semi">Tu comodidad, <br>nuestro compromiso.</h4>
                    <p >Creemos que es posible mejorar tu calidad de
                        vida y el confort en tu hogar. Por eso, nos encargamos de cada etapa del proyecto para
                        garantizar tu total satisfacción. Contamos con
                        un servicio integral a cargo de personal
                        calificado, asegurando un resultado eficiente
                        para tu hogar.</p>
                </v-col>
                <v-col>
                    <v-row justify="center">
                        <v-col class="pt-12" v-for="step in steps" :key="step.number">
                            <div class="pt-6"
                                :style="{ backgroundColor: getColor(step.number), borderRadius: '50%', width: '70px', height: '70px', margin: '0 auto' }">
                            </div>
                            <div class="text-center mt-12 mx-1">
                                <p class="mb-3" v-html="step.number"></p>
                                <p class="" v-html="step.text"></p>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
       <CommonContactBanner class="my-6" />
        <v-container fluid class="container-inner mt-12 pb-12">
            <h3 class="semi pt-10 pb-12">Trabajamos con marcas líderes en el Mercado.</h3>
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
            const colors = ['#D3D3D3', '#A9A9A9', '#808080', '#696969', '#000000'];
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
