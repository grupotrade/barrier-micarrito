<template>
    <v-sheet>
        <v-container fluid class="container-inner mt-12 pt-12 pb-12">
            <v-row>
                <v-col cols="12" md="4">
                    <h3>Hogares</h3>
                    <v-divider class="line-title primary" ></v-divider>
                    <p class="mt-4">
                        El confort que mereces, en cada rincón de tu hogar.
                    </p>
                </v-col>
            </v-row>
            <v-row dense class="mt-12 mb-12">
                <v-col cols="12" md="3">
                    <button class="button-calefaccion" @click="scrollToId('calefaccion')">Calefacción <v-divider class="line-title white"></v-divider></button>
                </v-col>
                <v-col cols="12" md="3">
                    <button class="button-aire" @click="scrollToId('aire')">Aire <br>Acondicionado <v-divider class="line-title white"></v-divider></button>
                </v-col>
                <v-col cols="12" md="3">
                    <button class="button-ablandamiento" @click="scrollToId('ablandamiento')">Ablandamiento <br>de Agua<v-divider class="line-title white"></v-divider></button>
                </v-col>
                <v-col cols="12" md="3">
                    <button class="button-agua" @click="scrollToId('caliente')">Agua Caliente <br>Sanitaria<v-divider class="line-title white"></v-divider></button>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h4 id="calefaccion">Calefacción</h4>
                    <v-divider class="line-title primary" ></v-divider>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h4>Radiadores</h4>
                    <p class="mt-8">
                        Los radiadores y toalleros son elementos diseñados para disipar calor  del agua que circula por dentro de ellos al entorno circundante, la cual es previamente calentada por una caldera, bomba de calor u otro  dispositivo.  Sus principales características son un diseño moderno, alta durabilidad, baja inercia térmica y entrega de calor pareja. Al mismo tiempo, se  evita la generación de monóxido de carbono, ya que no poseen un quemador que genere combustión y los gases producto de la misma.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Contactanos</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="8">
                    <v-img src="./img/services/radiadores.png"></v-img>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="8">
                    <v-img src="./img/services/piso_radiante.png"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <h4>Piso Radiante</h4>
                    <p class="mt-8">
                        Este sistema de calefacción de gran confort y calor uniforme, se  caracteriza por una gran versatilidad ya que no ocupa espacio físico en  la vivienda, siendo favorito de los arquitectos ya que no entorpece la  decoración.  Su funcionamiento consiste en hacer circular el agua por dentro de la  serpentina de caño Pe-X que está embutida en el suelo de la vivienda,  para que esta le transfiera la temperatura a dicho suelo y así liberarla al ambiente.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Contactanos</v-btn>
                        </v-col>
                    </v-row>
                </v-col>                
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h4>Calderas</h4>
                    <p class="mt-8">
                        Las calderas son las encargadas de calentar el agua y enviarla mediante  una bomba recirculadora al sistema de calefacción a elegir para tu  vivienda. Trabajamos con una marca líder como es BAXI, la cual cuenta con dos  grandes tipos de tecnologías que las diferencian; las calderas de  combustión tradicional y las calderas de condensación que gracias a su  gran tecnología en la combustión del gas permite aprovechar al máximo su energía, logrando así hasta un 45% de ahorro en tu consumo de gas.                    
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Contactanos</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="8">
                    <v-img src="./img/services/calderas.png"></v-img>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h4 id="aire">Aire Acondicionado</h4>
                    <v-divider class="line-title primary" ></v-divider>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h4>Multisplit</h4>
                    <p class="mt-8">
                        Basandose en el tipo de funcionamiento de los aires acondicionados tipo  Split, su principal ventaja como su nombre lo indica, es la posibilidad  de conectar una única unidad exterior a múltiples unidades interiores,  con un maximo de 5 de estas. Esto lo hace muy versatil a la hora de instalarlo por ejemplo en  fachadas o en lugares de espacio reducido, ya que se reduce mucho el  espacio util a ocupar por dicha unidad exterior.                    
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Contactanos</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="8">
                    <v-img src="./img/services/multisplit.png"></v-img>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="8">
                    <v-img src="./img/services/split.png"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <h4>Split</h4>
                    <p class="mt-8">
                        Este sistema de aire acondicionado, comúnmente instalado en viviendas, a diferencia de sus antecesores, consta de dos partes principales, una  unidad interior y una unidad exterior, lo que lo vuelve extremadamente  silencioso.  Acompañados en este caso por dos grandes marcas como son SURREY y MIDEA, con su línea de equipos inverter que logran ahorrar hasta un 35% de  energía eléctrica, son una gran opción para climatizar tu hogar.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Contactanos</v-btn>
                        </v-col>
                    </v-row>
                </v-col>                
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h4 id="ablandamiento">Ablandamiento de Agua</h4>
                    <v-divider class="line-title primary" ></v-divider>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h4>Ablandador de Agua</h4>
                    <p class="mt-8">
                        Los ablandadores de agua están diseñados para reducir en gran cantidad  los niveles de minerales disueltos en el agua, principalmente calcio y  magnesio, que son los responsables de la dureza del agua y de provocar  todos esos efectos secundarios en nuestra vivienda, como el deterioro de griferías y artefactos de baño, lavarropas, etc.  Nuestros equipos ELEKTRIM cuentan con la ventaja de su tamaño reducido  lo que los hace ideales para instalar en bajo mesadas, o en un gabinete  exterior sin ocupar grandes espacios.                    
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Contactanos</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="8">
                    <v-img src="./img/services/ablandador_de_agua.png"></v-img>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h4 id="caliente">Agua Caliente Sanitaria</h4>
                    <v-divider class="line-title primary" ></v-divider>
                </v-col>
            </v-row>
            <v-row class="mt-12">
               
                <v-col cols="12" md="8">
                    <v-img src="./img/services/calefon.png"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <h4>Calefón</h4>
                    <p class="mt-8">
                        Nuestra línea de calefones TRIANGULAR de alta eficiencia  energética, con encendido electrónico y sin llama “piloto”, es una gran  opción a la hora de elegir un sistema de calentamiento de agua en  departamentos con falta de espacio físico y zonas de agua con poco  sarro.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn color="primary" class="rounded-md" depressed>Contactanos</v-btn>
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


</style>
