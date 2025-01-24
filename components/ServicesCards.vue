<template>
     
            <v-row justify="center">
                <v-col cols="12" md="4">
                    <v-card @click="navigateTo('/hogares')">
                        <v-img src="/img/hogares.jpg" class="d-flex justify-center align-center image-filter">
                            <div class="pl-12">
                            <h3 class="white--text title-hover mt-10 title-hover">HOGARES</h3>
                            <v-divider class="line-title line-color mb-8"></v-divider>
                            <h4 class="white--text mb-11 button-hover">Ver más</h4>
                            </div>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card @click="navigateTo('comercial')">
                        <v-img src="/img/comercial.jpg" class="d-flex justify-center align-center image-filter">
                            <div class="pl-12">
                            <h3 class="white--text title-hover mt-10 title-hover">COMERCIAL</h3>
                            <v-divider class="line-title line-color mb-8"></v-divider>
                            <h4 class="white--text mb-11 button-hover">Ver más</h4>
                            </div>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card @click="navigateTo('profesionales')">
                        <v-img src="/img/profesionales.jpg" class="d-flex justify-center align-center image-filter">
                            <div class="pl-12"> 
                            <h3 class="white--text title-hover mt-10 title-hover">PROFESIONALES DE OBRA</h3>
                            <v-divider class="line-title line-color mb-8"></v-divider>
                            <h4 class="white--text mb-11 button-hover">Ver más</h4>
                            </div>
                        </v-img>     
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

<style scoped>
.image-filter {
    filter: hue-rotate(180deg) brightness(0.8);
    transition: filter 0.3s ease;
}

.image-filter:hover {
    filter: hue-rotate(180deg) brightness(1);
}

.title-hover, .button-hover {
    transition: transform 0.3s ease, color 0.3s ease;
}

.image-filter:hover .title-hover {
    transform: translateY(-10px) scale(1.1); /* Mueve el título hacia arriba */
    color: #42A5F5; /* Cambia el color al pasar el mouse */
}

.image-filter:hover .button-hover {
    transform: scale(1.1);
    color: #42A5F5; /* Cambia el color al pasar el mouse */
}
.line-color {
    background-color: orange !important;
    margin-left: 0px !important;
    transition: all 0.3s ease; /* Asegura que la línea sea azul */
}

.image-filter:hover .line-color {
    margin-left: 20px !important;
    transition: all 0.3s ease; /* Añade una transición suave */
}
</style>