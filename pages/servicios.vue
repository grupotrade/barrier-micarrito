<template>
    <v-sheet>
        <v-sheet class="container-banner">
            <BannersListBanners position="servicios-header" />
        </v-sheet>
        <v-container fluid class="container-inner mt-10 pb-12">
            <v-row>
                <v-col cols="12" md="6">
                    <h3 class="semi">Climatización a la medida de tus necesidades</h3>
                    <h5 class="mt-4">
                        Nos adaptamos al tipo de proyecto que estés buscando, brindando
                        soluciones confiables para cada tipo de necesidad.
                    </h5>
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
