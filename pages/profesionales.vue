<template>
    <v-sheet>
        <v-container fluid class="container-inner mt-12 pt-12 pb-12">
            <v-row>
                <v-col cols="12" md="7">
                    <h2 class="semi">Profesionales de Obra</h2>
                    <v-divider class="line-title primary" ></v-divider>
                    <p class="mt-4">
                       
                    </p>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="8">
                    <v-img height="520px" cover src="./img/services/profesionales.jpg"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <p class="mt-4">
                        Con una amplia cartilla de instaladores que cuentan con nosotros hace  varios años para adquirir los equipos de sus obras y asi tambien de todo el asesoramiento, vos tambien podes hacerlo.
                    </p>
                    <p class="mt-4">
                        Contamos con el servicio de atención al rubro, lo cual te brinda toda  nuestra disponibilidad a la hora de consultar tus dudas y de  conocimientos para poder llevar tus obras a cabo sin tener problemas en  el funcionamiento de los equipos por una incorrecta instalacion. Ya sea  dimensionamiento de cañerías, dibujo en plano de las mismas hasta  listado de materiales necesarios.
                    </p>
                    <p class="mt-4">
                        No dudes en consultarnos para poder ser parte de nuestro equipo de instaladores.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed target="_blank" href="https://api.whatsapp.com/send?phone=5491137827119&text=HOLA%20Quiero%20asesoramientohttps://api.whatsapp.com/send?phone=5491137827119&text=HOLA%20Quiero%20asesoramiento">Whatsapp</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md"  v-if="false" depressed>Consultar por Email</v-btn>
                        </v-col>
                    </v-row>
                </v-col>

            </v-row>
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

<style scoped>
.button-calefaccion {
    background-color: #f44336; /* Rojo */
}

.button-aire {
    background-color: #1976d2; /* Azul */
}

.button-ablandamiento {
    background-color: #0097a7; /* Turquesa */
}

.button-agua {
    background-color: #757575; /* Gris */
}

button {
    height: 140px;
    text-align: left;
    width: 100%;
    color: white;
    font-size: 1.5rem;
    line-height: 1.5rem;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 16px;
    transition: background-color 0.3s;
}

button:hover {
    opacity: 0.9; /* Efecto de opacidad al pasar el ratón */
}

.line-title {
    border-width: 3px !important;
    width: 20% !important; 
    margin-top: 4px;
}
</style>
