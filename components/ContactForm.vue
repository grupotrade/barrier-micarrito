<template>
    <v-form v-model="valid">
        <v-text-field label="Nombre" v-model="contact.name" required :rules="rulesGlobal.required"></v-text-field>
        <v-text-field label="E-mail" v-model="contact.email" required :rules="rulesGlobal.email"></v-text-field>
        <v-text-field label="Empresa" v-model="contact.work" required :rules="rulesGlobal.required"></v-text-field>
        <v-text-field label="Celular" v-model="contact.phone" ></v-text-field>
        <h5 v-if="product">Consultando sobre el producto {{ product.name }}</h5>
        <v-textarea label="Mensaje" v-model="contact.message" required
            :rules="rulesGlobal.required"></v-textarea>
        <div class="d-flex justify-end">
            <v-btn color="primary" rounded size="large" :outlined="!isHovered" class="mt-4 px-16"
                                :depressed="isHovered"
                                @mouseover="isHovered = true"
                                @mouseleave="isHovered = false" :block="$vuetify.breakpoint.smAndDown"
            :disabled="!valid" @click="sendContact($event)">Enviar</v-btn>
        </div>
        <v-snackbar :timeout="4000" color="primary" rounded="pill" v-model="contactThanks" class="mt-n16">
            Gracias por su mensaje! le contestaremos a la brevedad.
        </v-snackbar>
    </v-form>


</template>
<script>
export default {
    props: {
        product: {
            type: Object,
            required: false,
            default: null
        }
    },
    data() {
        return {
            contactThanks: false,
            contact: {
                name: '',
                email: '',
                work: '',
                phone: '',
                message: '',
            },
            valid: false,
            isHovered: false,
            email: 'info@barrierclima.com.ar'
        }
    },
    methods: {
        sendContact: function (e) {
            e.preventDefault()
            const mailcollection = this.$fire.firestore.collection('mails')
            if (this.product) {
                mailcollection.add({
                    to: this.email,
                    message: {
                        subject: 'Contacto sobre el producto ' + this.product.name + ' desde el sitio web de ' + this.contact.email,
                        html: '<p>Recibiste un nuevo contacto sobre el producto ' + this.product.name + ' desde el sitio web de:</p><p>Nombre: ' + this.contact.name + '</p><p>E-mail: ' + this.contact.email + '</p><p>Empresa: ' + this.contact.work + '</p><p>Celular: ' + this.contact.phone + '</p><p>Mensaje: ' + this.contact.message + '</p> <p>Producto: ' + this.product.name + '</p>'
                    }
                })
            } else {
                mailcollection.add({
                    to: this.email,
                    message: {
                        subject: 'Contacto desde el sitio web de ' + this.contact.email,
                        html: '<p>Recibiste un nuevo contacto desde el sitio web de:</p><p>Nombre: ' + this.contact.name + '</p><p>E-mail: ' + this.contact.email + '</p><p>Empresa: ' + this.contact.work + '</p><p>Celular: ' + this.contact.phone + '</p><p>Mensaje: ' + this.contact.message + '</p>'
                    }
                })
            }
            this.contact = {
                name: '',
                email: '',
                work: '',
                phone: '',
                message: '',
            }
            this.contactThanks = true

        },
    }
}
</script>
