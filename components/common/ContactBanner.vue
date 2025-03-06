<template>
     <v-container fluid class="contact-info primary text-center py-8">
            <v-row justify="center white--text">
                <v-col>
                    <p class="mb-2"><v-icon color="white" >mdi-map-marker</v-icon></p>
                    <v-btn color="white" text class="mb-2" href="https://www.google.com/maps/place/O'Higgins+910,+B1660+Bella+Vista,+Provincia+de+Buenos+Aires/@-34.632666,-58.426666,15z/data=!4m2!3m1!1s0x0:0x4531146629b46a37?sa=X&ved=2ahUKEwjF482148_9AhXQg_0HHYQ5B18Q_BJ6BAhIEAU" target="_blank">
                       
                        O'Higgins 910, Buenos Aires, Argentina
                    </v-btn>
                </v-col>
                <v-col>
                    <p class="mb-4"><v-icon color="white" >mdi-clock</v-icon></p>
                    <p class="mb-0">Lu-Vi 10am a 13pm - 14pm a 18.30pm</p>
                </v-col>
                <v-col>
                    <p class="mb-4"><v-icon color="white" >mdi-phone</v-icon></p>
                    <p class="mb-0">(+54 11) 4662-6140</p>
                </v-col>
                <v-col>
                    <p class="mb-2"><v-icon color="white" >mdi-email</v-icon></p>
                    <v-btn text color="white" class="mb-2" @click="contactDialog = true">
                        <span class="text-lowercase">info@barrierclima.com.ar</span>
                    </v-btn>
                </v-col>
                <v-col>
                    <p class="mb-2"><v-icon color="white" >mdi-whatsapp</v-icon></p>
                    <v-btn text color="white" class="mb-2" href="https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+https%3A%2F%2Fbarrierclima.com.ar%2F&type=phone_number&app_absent=0" target="_blank">
                        +54 911 3782-7119
                    </v-btn>
                </v-col>
            </v-row>
            <v-dialog v-model="contactDialog" max-width="500">
            <v-card>
                <v-card-title>Contactenos</v-card-title>
                <v-card-text>
                    <ContactForm :product="product" />
                </v-card-text>
            </v-card>
        </v-dialog>
        </v-container>
</template>

<script>
export default {
    data() {
        return {
            contactDialog: false
        }
    },
}
</script>