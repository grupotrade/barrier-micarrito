<template>
    <div>
        <h3 class="mt-3 mb-3">SIM es tu respuesta para maximizar tus resultados,</h3>
        <h5 class="text-center mb-10">en un mundo saturado de regalos para empresas.</h5>
        <v-row>
            <v-col cols="12" lg="3">
                <p class="semi"  v-if="!$vuetify.breakpoint.xs">Descubrí SIM:
                    Innovación y Creatividad</p>
                    <v-icon v-else color="primary" x-large>mdi-check</v-icon>
                <p class="px-10 px-md-0">SIM emerge en <a href="https://trade-design.com.ar/" target="_blank">Trade Design</a>, una agencia especializada en <strong>diseñar, comunicar y producir experiencias, viajes de relacionamiento y eventos híbridos</strong>, con una propuesta de valor incomparable. 

                </p>
            </v-col>
            <v-col cols="12" lg="3">
                <p class="semi" v-if="!$vuetify.breakpoint.xs">Más que obsequios, experiencias sosteniblemente humanas. 🌱
                </p>
                <v-icon v-else color="primary" x-large>mdi-check</v-icon>
                <p class="px-10 px-md-0"><strong>La autenticidad, los buenos recuerdos y captar la atención nunca pasarán de moda.</strong> Inspirados en estos principios, en SIM creamos regalos empresariales originales,  exclusivos, versátiles e innovadores.
                </p>
            </v-col>
            <v-col cols="12" lg="3">
                <p class="semi" v-if="!$vuetify.breakpoint.xs">Tu puente hacia una
                    identidad de marca Inolvidable</p>
                    <v-icon v-else color="primary" x-large>mdi-check</v-icon>
                <p class="px-10 px-md-0">Como una tarjeta SIM conecta tu móvil al mundo, <strong>SIM Gift Box es la pieza indispensable para vincular tu empresa con sus clientes, </strong>fortalecer 
tu presencia y destacarte en el mercado,
                </p>
            </v-col>
            <v-col cols="12" lg="3">
                <p class="semi" v-if="!$vuetify.breakpoint.xs">Destacate no solo por lo que hacés y
                    sino por cómo lo haces.
                </p>
                <v-icon v-else color="primary" x-large>mdi-check</v-icon>
                <p class="px-10 px-md-0">Apoyamos a tu empresa, institución o marca para atraer clientes de calidad y convertirte en referente
                    de tu sector, asegurando que todos digan <strong>"Mirá esto" </strong>
                    y nunca dejes de brillar con el regalo ideal.
                </p>
            </v-col>
        </v-row>
        <v-img src="/img/porque.png" height="400" class="my-2 " contain v-if="!$vuetify.breakpoint.xs"></v-img>
        <v-img src="/img/porque_mobile.png" height="430" contain v-else></v-img>
    </div>
</template>