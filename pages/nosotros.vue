<template>
    <v-sheet>
        <v-sheet class="container-banner">
            <BannersListBanners position="nosotros-header" />
        </v-sheet>
        <v-container fluid class="container-inner mt-12">
            <v-row>
                    <v-col cols="12" md="4">
                        <h3>Nosotros</h3>
                    <v-divider class="line-title primary" ></v-divider>
                    <p class="mt-4">
                       
                    </p>
                </v-col>
            </v-row>
            <v-row class="mt-12">

                <v-col cols="12" md="5">
                    <p>
                        Barrier Clima SRL es una empresa familiar, dirigida y atendida por sus dueños. Dedicada a la Climatización (Calefaccion y Aire  Acondicionado) y Tratamiento de Agua Sanitaria (Aguas Duras o con Sarro) de viviendas, clubes, fábricas, etc.</p>
<p >Trabajamos en AMBA siendo distribuidores de marcas de primera  línea. Esto garantiza la calidad de los productos y su buen  funcionamiento a lo largo del tiempo.</p>
<p>Elegimos trabajar con TRIANGULAR como Distribuidores y Servicio  Técnico Oficial de Zona Oeste, que nos provee de todos los equipos y  accesorios de calefacción (Calderas, Radiadores, Piso Radiante,etc);  SURREY como Agentes Oficiales en equipos de aire acondicionado y  ELEKTRIM también como Agentes Oficiales para el tratamiento de aguas  duras.</p>
<p>Realizamos el cálculo térmico y diseño de cañería en planos, la  venta de equipos, la instalación y el seguimiento personalizado para  garantizar un eficiente sistema de calefacción por agua caliente,  refrigeración y uso de ablandadores de agua para la protección del  sistema.</p>
<p>Nuestras obras abarcan barrios privados, edificios y domicilios  particulares. Contamos con una larga trayectoria construida sobre la  confianza de nuestros clientes, quienes hoy en día son nuestra principal fuente de recomendación.</p>
                    

                </v-col>
                <v-col cols="12" md="7">
                    <v-carousel height="540px" hide-delimiters cycle>
                        <v-carousel-item v-for="item in items" a :key="item.id" :src="item.src" cover></v-carousel-item>
                    </v-carousel>
                </v-col>

            </v-row>
    </v-container>
    <CommonContactBanner class="mt-6" />
       
        <v-sheet class="mb-10">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.516046533934!2d-58.62868412341807!3d-34.59111015683401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb93ef97f04ef%3A0x2a941ea29544a63!2sBarrier%20Clima%20S.R.L.!5e0!3m2!1ses-419!2sar!4v1737739193440!5m2!1ses-419!2sar" width="100%" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </v-sheet>
            <CommonTestimonials />
        <v-container fluid class="container-inner mt-12 pb-12">
            <v-row>
                    <v-col cols="12" md="4">
                        <h3>Contactanos</h3>
                   
                </v-col>
                <v-col cols="12" lg="8" id="contacto">
                           <ContactForm />
                </v-col>
            </v-row>
        </v-container>

        

    </v-sheet>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            items: [
                { src: './img/nosotros/1.jpg' },
                { src: './img/nosotros/2.jpg' },
                { src: './img/nosotros/3.jpg' },
            ],
        }
    },
    computed: {
        user() {
            return this.$store.state.authUser;
        }
    },
}
</script>

<style>
.input-products.v-input--dense.v-text-field--outlined>.v-input__control>.v-input__slot {
    min-height: 28px !important;
}

.text-truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

</style>
