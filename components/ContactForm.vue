<template>
    <v-form v-model="valid">
        <v-text-field label="Nombre" v-model="contact.name" required :rules="fieldRules"></v-text-field>
        <v-text-field label="E-mail" v-model="contact.email" required :rules="emailRules"></v-text-field>
        <v-text-field label="Empresa" v-model="contact.work" required:rules="fieldRules"></v-text-field>
        <v-text-field label="Celular" v-model="contact.phone" required :rules="fieldRules"></v-text-field>
        <v-textarea label="¿Qué tipo de servicio necesitas?" v-model="contact.message" required
            :rules="fieldRules"></v-textarea>
        <v-btn color="primary" rounded size="large" :outlined="!isHovered"
                                :depressed="isHovered"
                                @mouseover="isHovered = true"
                                @mouseleave="isHovered = false" class="px-16" :block="$vuetify.breakpoint.smAndDown"
            :disabled="!valid" @click="sendContact($event)">Enviar</v-btn>
        <v-snackbar :timeout="4000" color="primary" rounded="pill" v-model="contactThanks" class="mt-n16">
            Gracias por su mensaje! le contestaremos a la brevedad.
        </v-snackbar>
    </v-form>


</template>
<script>
export default {
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
            isHovered: false,
            email: 'ivanpuglia@gmail.com'
        }
    },
    methods: {
        sendContact: function (e) {
            e.preventDefault()
            const mailcollection = this.$fire.firestore.collection('mails')
            mailcollection.add({
                to: this.email,
                message: {
                    subject: 'Contacto de ' + this.contact.name,
                    html: '<p>Nombre: ' + this.contact.name + '</p><p>E-mail: ' + this.contact.email + '</p><p>Empresa: ' + this.contact.work + '</p><p>Celular: ' + this.contact.phone + '</p><p>Mensaje: ' + this.contact.message + '</p>'
                }
            })
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
