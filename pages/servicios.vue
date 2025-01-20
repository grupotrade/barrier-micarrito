<template>
    <v-sheet>
        <v-sheet class="container-banner">
            <BannersListBanners position="servicios-header" />
        </v-sheet>
        <v-container fluid class="container-inner mt-10 pb-12">
            <v-row>
                <v-col cols="12" md="6">
                    <h3>Climatización a la medida de tus necesidades</h3>
                    <p>
                        Nos adaptamos al tipo de proyecto que estés buscando, brindando
                        soluciones confiables para cada tipo de necesidad.
                    </p>
                </v-col>

            </v-row>
            <ServicesCards />
        </v-container>
    </v-sheet>
</template>

<script>
export default {
    data() {
        return {

        }
    }

}
</script>
