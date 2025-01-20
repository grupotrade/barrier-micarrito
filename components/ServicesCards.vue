<template>
     
            <v-row justify="center">
                <v-col cols="12" md="4">
                    <v-card @click="navigateTo('/hogares')">
                        <v-img src="./img/hogares.png" ></v-img>
                        <!-- <v-card-title>HOGARES</v-card-title>
                        <v-card-actions>
                            <v-btn text>Ver más</v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card @click="navigateTo('comercial')">
                        <v-img src="./img/comercial.png" ></v-img>
                        <!-- <v-card-title>COMERCIAL</v-card-title>
                        <v-card-actions>
                            <v-btn text>Ver más</v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card @click="navigateTo('profesionales')">
                        <v-img src="./img/profesionales.png"></v-img>
                        <!-- <v-card-title>PROFESIONALES DE OBRA</v-card-title>
                        <v-card-actions>
                            <v-btn text>Ver más</v-btn>
                        </v-card-actions> -->
                    </v-card>
                </v-col>
            </v-row>
        
</template>

<script>
export default {
    methods: {
        
    }
}
</script>