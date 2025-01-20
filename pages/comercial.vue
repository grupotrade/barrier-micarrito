<template>
    <v-sheet>
        <v-container fluid class="container-inner mt-12 pt-12 pb-12">
            <v-row>
                <v-col cols="12" md="4">
                    <h3>Comercios</h3>
                    <v-divider class="line-title primary" ></v-divider>
                    <p class="mt-4">
                        Tu negocio, también nos importa.
                    </p>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="8">
                    <v-img src="./img/services/comercial.jpg"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <p class="mt-8">
                        Ya sea que necesitas refrigerar tu oficina por comodidad y confort, tu  local de venta al publico para que tus clientes se sientan a gusto, o  porque los productos que se venden necesitan un tipo de temperatura  particular, podes contar con nosotros para asesorarte y asi brindarte la mejor solución para las necesidades de tu emprendimiento. Tambien contamos con el servicio de refrigeración de sala de servidores  asi como tambien de equipos electrónicos que necesiten temperaturas  especificas para su correcto funcionamiento, ya que una avería en este  tipo de equipos genera tanto daños materiales como daños por falta de  producción.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="12">
                            <v-btn color="primary" class="rounded-md" depressed>Consultar por Whatsapp</v-btn>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-btn color="primary" class="rounded-md" depressed>Consultar por Email</v-btn>
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
