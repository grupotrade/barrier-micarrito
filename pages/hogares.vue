<template>
    <v-sheet>
        <v-container fluid class="container-inner mt-12 pt-12 pb-12">
            <v-row class="mt-8">
                <v-col cols="12" md="5">
                    <h2 class="semi">Hogares</h2>
                    <v-divider class="line-title primary"></v-divider>
                    <h5 class="mt-4">
                        El confort que mereces, en cada rincón de tu hogar.
                    </h5>
                </v-col>
            </v-row>
            <v-row dense class="mt-12 mb-12">
                <v-col cols="12" md="3">
                    <button class="button-calefaccion" @click="scrollToId('calefaccion')">Calefacción <v-divider
                            class="line-title white"></v-divider></button>
                </v-col>
                <v-col cols="12" md="3">
                    <button class="button-aire" @click="scrollToId('aire')">Aire <br>Acondicionado <v-divider
                            class="line-title white"></v-divider></button>
                </v-col>
                <v-col cols="12" md="3">
                    <button class="button-ablandamiento" @click="scrollToId('ablandamiento')">Ablandamiento <br>de
                        Agua<v-divider class="line-title white"></v-divider></button>
                </v-col>
                <v-col cols="12" md="3">
                    <button class="button-agua" @click="scrollToId('caliente')">Agua Caliente <br>Sanitaria<v-divider
                            class="line-title white"></v-divider></button>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="4">
                    <h3 class="semi" id="calefaccion">Calefacción</h3>
                    <v-divider class="line-title primary"></v-divider>
                </v-col>
            </v-row>
            <v-row class="mt-12 flex-column-reverse flex-sm-row">
                <v-col cols="12" md="4">
                    <h4 class="semi">Radiadores</h4>
                    <p class="mt-4">
                        Los radiadores y toalleros son elementos diseñados para disipar calor del agua que circula por
                        dentro de ellos al entorno circundante, la cual es previamente calentada por una caldera, bomba
                        de calor u otro dispositivo. 
                    </p>
                    <p class="mt-4">
                        Sus principales características son un diseño moderno, alta
                        durabilidad, baja inercia térmica y entrega de calor pareja. 
                    </p>
                    <p class="mt-4">Al mismo tiempo, se evita la
                        generación de monóxido de carbono, ya que no poseen un quemador que genere combustión y los
                        gases producto de la misma.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6" v-if="false">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn
                                color="primary"
                                :block="$vuetify.breakpoint.smAndDown"
                                class="rounded-md"
                                :outlined="!isHovered.radiadores"
                                :depressed="isHovered.radiadores"
                                @mouseover="isHovered.radiadores = true"
                                @mouseleave="isHovered.radiadores = false"
                                target="_blank"
                                href="https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+https%3A%2F%2Fbarrierclima.com.ar%2Fresidencial%2F&type=phone_number&app_absent=0"
                            >
                                Contactanos
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="8">
                    <v-img src="./img/services/radiadores.png" height="500px" class="ml-lg-12"></v-img>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="8">
                    <v-img src="./img/services/piso_radiante.png" height="500px" class="mr-lg-12"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <h4 class="semi">Piso Radiante</h4>
                    <p class="mt-4">
                        Este sistema de calefacción de gran confort y calor uniforme, se caracteriza por una gran
                        versatilidad ya que no ocupa espacio físico en la vivienda, siendo favorito de los arquitectos
                        ya que no entorpece la decoración.   </p>
                        <p class="mt-4">Su funcionamiento consiste en hacer circular el agua por
                        dentro de la serpentina de caño Pe-X que está embutida en el suelo de la vivienda, para que esta
                        le transfiera la temperatura a dicho suelo y así liberarla al ambiente.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6" v-if="false">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn
                                color="primary"
                                :block="$vuetify.breakpoint.smAndDown"
                                class="rounded-md"
                                :outlined="!isHovered.pisoRadiante"
                                :depressed="isHovered.pisoRadiante"
                                @mouseover="isHovered.pisoRadiante = true"
                                @mouseleave="isHovered.pisoRadiante = false"
                                target="_blank"
                                href="https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+https%3A%2F%2Fbarrierclima.com.ar%2Fresidencial%2F&type=phone_number&app_absent=0"
                            >
                                Contactanos
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mt-12  flex-column-reverse flex-sm-row">
                <v-col cols="12" md="4">
                    <h4 class="semi">Calderas</h4>
                    <p class="mt-4">
                        Las calderas son las encargadas de calentar el agua y enviarla mediante una bomba recirculadora
                        al sistema de calefacción a elegir para tu vivienda.  </p>
                        <p class="mt-4">Trabajamos con una marca líder como es BAXI,
                        la cual cuenta con dos grandes tipos de tecnologías que las diferencian; las calderas de
                        combustión tradicional y las calderas de condensación que gracias a su gran tecnología en la
                        combustión del gas permite aprovechar al máximo su energía, logrando así hasta un 45% de ahorro
                        en tu consumo de gas.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6" v-if="false">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn
                                color="primary"
                                :block="$vuetify.breakpoint.smAndDown"
                                class="rounded-md"
                                :outlined="!isHovered.calderas"
                                :depressed="isHovered.calderas"
                                @mouseover="isHovered.calderas = true"
                                @mouseleave="isHovered.calderas = false"
                                target="_blank"
                                href="https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+https%3A%2F%2Fbarrierclima.com.ar%2Fresidencial%2F&type=phone_number&app_absent=0"
                            >
                                Contactanos
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="8">
                    <v-img src="./img/services/calderas.png"  height="500px" class="ml-lg-12"></v-img>
                </v-col>
            </v-row>
            <v-row class="mt-12 ">
                <v-col cols="12" md="4">
                    <h3 class="semi" id="aire">Aire Acondicionado</h3>
                    <v-divider class="line-title primary"></v-divider>
                </v-col>
            </v-row>
            <v-row class="mt-12  flex-column-reverse flex-sm-row">
                <v-col cols="12" md="4">
                    <h4 class="semi">Multisplit</h4>
                    <p class="mt-4">
                        Basandose en el tipo de funcionamiento de los aires acondicionados tipo Split, su principal
                        ventaja como su nombre lo indica, es la posibilidad de conectar una única unidad exterior a
                        múltiples unidades interiores, con un maximo de 5 de estas.  </p>
                        <p class="mt-4">Esto lo hace muy versatil a la hora
                        de instalarlo por ejemplo en fachadas o en lugares de espacio reducido, ya que se reduce mucho
                        el espacio util a ocupar por dicha unidad exterior.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6" v-if="false">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn
                                color="primary"
                                :block="$vuetify.breakpoint.smAndDown"
                                class="rounded-md"
                                :outlined="!isHovered.multisplit"
                                :depressed="isHovered.multisplit"
                                @mouseover="isHovered.multisplit = true"
                                @mouseleave="isHovered.multisplit = false"
                                target="_blank"
                                href="https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+https%3A%2F%2Fbarrierclima.com.ar%2Fresidencial%2F&type=phone_number&app_absent=0"
                            >
                                Contactanos
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="8">
                    <v-img src="./img/services/multisplit.png"  height="500px" class="ml-lg-12"></v-img>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="8">
                    <v-img src="./img/services/split.png"  height="500px" class="mr-lg-12"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <h4 class="semi">Split</h4>
                    <p class="mt-4">
                        Este sistema de aire acondicionado, comúnmente instalado en viviendas, a diferencia de sus
                        antecesores, consta de dos partes principales, una unidad interior y una unidad exterior, lo que
                        lo vuelve extremadamente silencioso.   </p>
                        <p class="mt-4">Acompañados en este caso por dos grandes marcas como son
                        SURREY y MIDEA, con su línea de equipos inverter que logran ahorrar hasta un 35% de energía
                        eléctrica, son una gran opción para climatizar tu hogar.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6" v-if="false">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn
                                color="primary"
                                :block="$vuetify.breakpoint.smAndDown"
                                class="rounded-md"
                                :outlined="!isHovered.split"
                                :depressed="isHovered.split"
                                @mouseover="isHovered.split = true"
                                @mouseleave="isHovered.split = false"
                                target="_blank"
                                href="https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+https%3A%2F%2Fbarrierclima.com.ar%2Fresidencial%2F&type=phone_number&app_absent=0"
                            >
                                Contactanos
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="5">
                    <h3 class="semi" id="ablandamiento">Ablandamiento de Agua</h3>
                    <v-divider class="line-title primary"></v-divider>
                </v-col>
            </v-row>
            <v-row class="mt-12  flex-column-reverse flex-sm-row">
                <v-col cols="12" md="4">
                    <h4 class="semi">Ablandador de Agua</h4>
                    <p class="mt-4">
                        Los ablandadores de agua están diseñados para reducir en gran cantidad los niveles de minerales
                        disueltos en el agua, principalmente calcio y magnesio, que son los responsables de la dureza
                        del agua y de provocar todos esos efectos secundarios en nuestra vivienda, como el deterioro de
                        griferías y artefactos de baño, lavarropas, etc.   </p>
                        <p class="mt-4">Nuestros equipos ELEKTRIM cuentan con la
                        ventaja de su tamaño reducido lo que los hace ideales para instalar en bajo mesadas, o en un
                        gabinete exterior sin ocupar grandes espacios.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6" v-if="false">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn
                                color="primary"
                                :block="$vuetify.breakpoint.smAndDown"
                                class="rounded-md"
                                :outlined="!isHovered.ablandador"
                                :depressed="isHovered.ablandador"
                                @mouseover="isHovered.ablandador = true"
                                @mouseleave="isHovered.ablandador = false"
                                target="_blank"
                                href="https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+https%3A%2F%2Fbarrierclima.com.ar%2Fresidencial%2F&type=phone_number&app_absent=0"
                            >
                                Contactanos
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="8">
                    <v-img src="./img/services/ablandador_de_agua.png"  height="500px" class="ml-lg-12"></v-img>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="12" md="5">
                    <h3 class="semi" id="caliente">Agua Caliente Sanitaria</h3>
                    <v-divider class="line-title primary"></v-divider>
                </v-col>
            </v-row>
            <v-row class="mt-12">

                <v-col cols="12" md="8">
                    <v-img src="./img/services/calefon.png"  height="500px" class="mr-lg-12"></v-img>
                </v-col>
                <v-col cols="12" md="4">
                    <h4 class="semi">Calefón</h4>
                    <p class="mt-8">
                        Nuestra línea de calefones TRIANGULAR de alta eficiencia energética, con encendido electrónico y
                        sin llama "piloto", es una gran opción a la hora de elegir un sistema de calentamiento de agua
                        en departamentos con falta de espacio físico y zonas de agua con poco sarro.
                    </p>
                    <v-row class="mt-12">
                        <v-col cols="12" md="6" v-if="false">
                            <v-btn color="primary" class="rounded-md" depressed>Ver productos</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn
                                color="primary"
                                :block="$vuetify.breakpoint.smAndDown"
                                class="rounded-md"
                                :outlined="!isHovered.calefon"
                                :depressed="isHovered.calefon"
                                @mouseover="isHovered.calefon = true"
                                @mouseleave="isHovered.calefon = false"
                                target="_blank"
                                href="https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+https%3A%2F%2Fbarrierclima.com.ar%2Fresidencial%2F&type=phone_number&app_absent=0"
                            >
                                Contactanos
                            </v-btn>
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
            isHovered: {
                radiadores: false,
                pisoRadiante: false,
                calderas: false,
                multisplit: false,
                split: false,
                ablandador: false,
                calefon: false
            }
        }
    }
}
</script>

<style scoped>
.button-calefaccion {
    background-color: #f44336;
    /* Rojo */
}

.button-aire {
    background-color: #1976d2;
    /* Azul */
}

.button-ablandamiento {
    background-color: #0097a7;
    /* Turquesa */
}

.button-agua {
    background-color: #757575;
    /* Gris */
}

button {
    height: 140px;
    text-align: left;
    width: 100%;
    color: white;
    font-size: 1.5rem;
    line-height: 1.8rem;
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
    opacity: 0.9;
    /* Efecto de opacidad al pasar el ratón */
}
</style>
