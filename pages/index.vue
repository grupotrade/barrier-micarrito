<template>
    <v-sheet>
        <v-sheet class="container-banner">
            <BannersListBanners position="home-header" />
        </v-sheet>
        <v-container fluid id="motivos" class="container-inner text-center px-4 py-6">
            <h3 class="mb-12 mt-4">Los regalos empresariales son la solución perfecta si:</h3>
            <v-container class="container-inner">
                <v-row>
                    <v-col cols="12" lg="3">
                        <v-icon color="primary" class="mb-2" x-large>mdi-puzzle-outline</v-icon>
                        <p><strong>Reconocés el valor que representan </strong>
 para reflejar los valores y la identidad 
de tu empresa, institución o marca, y 
para fortalecer la percepción de calidad y atención al detalle.</p>
                    </v-col>
                    <v-col cols="12" lg="3">
                        <v-icon color="primary" class="mb-2" x-large>mdi-heart-outline</v-icon>
                        <p><strong>Buscás diseños memorables, extraordinarios y útiles.</strong> Además, preferís opciones sustentables y eco-friendly que minimicen el impacto ambiental y evidencien el compromiso de tu empresa con la responsabilidad social.</p>
                    </v-col>
                    <v-col cols="12" lg="3">
                        <v-icon color="primary" class="mb-2" x-large>mdi-fingerprint</v-icon>
                        <p><strong>Sentís la necesidad de diferenciarte de manera incomparable y auténtica</strong> en un mundo repleto de opciones de regalos, donde la hiper-personalización y la exclusividad son esperadas por los clientes que buscan algo verdaderamente único.</p>
                    </v-col>
                    <v-col cols="12" lg="3">
                        <v-icon color="primary" class="mb-2" x-large>mdi-anchor</v-icon>
                        <p><strong>Considerás que la construcción de relaciones a largo plazo es una inversión</strong>, y sabes que no es necesario un presupuesto ilimitado para lograr impactos significativos.</p>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
        <v-container fluid id="categorias" class="container-inner px-4 py-6">
            <h3 class="text-center mt-3">Productos destacados</h3>
            <h5 class="text-center mb-6">Descubrí regalos pre-diseñados o a medida, únicos y personalizados.</h5>
            <v-row dense justify="center">
                <v-col cols="12">
                    <products-list :home="true" columns="4" />
                </v-col>
            </v-row>
        </v-container>
        <v-container id="novedades" class="container-inner px-4 py-6">
            <h3 class="text-center mt-3">Tus alternativas de inversión</h3>
            <h5 class="text-center mb-6"> ¡No dejes para mañana lo que podés regalar hoy! </h5>
            <v-row dense justify="center">
                <v-col cols="12">
                <posts-list category="t34BeIgm5FUNGn3lFyaW" />
            </v-col>
            </v-row>
        </v-container>
        <v-container fluid id="categorias" class="container-inner px-4 py-6">
            <h3 class="text-center">Explorá la colección</h3>
            <h5 class="text-center mb-6">
                Diseñada para eventos, welcome packs, celebraciones, compartir en familia,
                viajes, relajación, disfrute al aire libre y mucho más!

            </h5>
            <v-row dense justify="center">
                <v-col cols="12">
                    <products-list :home="false" columns="4" />
                </v-col>
            </v-row>
        </v-container>
        <v-sheet>
            <BannersListBanners class="my-2" position="home-center" />
        </v-sheet>
        <v-container fluid id="porque" class="container-inner text-center px-4 py-6">
            <CommonAboutUs />
        </v-container>
        <vue-marquee-slider id="marquee-slider-text" class="py-3 primary white--text" :space="30" :width="200"
            :speed="10000">
            <h4 class="text-center">experiencias sim</h4>
            <h4 class="text-center">regalar</h4>
            <h4 class="text-center">sorprender</h4>
            <h4 class="text-center">impactar</h4>
            <h4 class="text-center">emocionar</h4>
            <h4 class="text-center">transformar</h4>
        </vue-marquee-slider>
        <v-container id="pasos" class="container-inner px-4 py-6">
            <CommonHow />
        </v-container>
        <v-container id="testimonios" class="container-inner px-4 py-6" v-if="false">
            <CommonTestimonials />
        </v-container>
        <v-container fluid id="clientes" class="grey lighten-3 text-center px-0 py-6" v-if="false">
            <h3 class="pb-12">Empresas que ya han confiado en SIM</h3>
            <client-only>

                <BrandsSlider />
            </client-only>
        </v-container>
        <v-container fluid id="descarga" class="pa-0 primary">
            <CommonDownloadSection />
        </v-container>
        <v-container fluid id="contacto" class="pa-0 container-contact">
            <CommonContactSection />
        </v-container>
        <v-container id="novedades" class="container-inner px-4 py-6">
            <h3 class="text-center mb-2">Novedades</h3>
            <v-row dense justify="center">
                <posts-list category="uzMmfS93t5ArdRb6jCv4" :showPosts="3" />
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        user() {
            return this.$store.state.authUser;
        }
    }
}
</script>

<style>
.input-products.v-input--dense.v-text-field--outlined>.v-input__control>.v-input__slot {
    min-height: 28px !important;
}
</style>
