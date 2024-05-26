<template>
    <v-navigation-drawer v-model="show" width="500" app temporary right disable-resize-watcher>
        <v-stepper v-model="steps" v-if="cart && cart.length > 0" flat>
            <h3 class="primary_lighten py-8 px-4">
                <v-btn icon class="float-right mt-n6" @click="show = false"><v-icon>mdi-close</v-icon></v-btn>
                Tu pedido ({{ cart.length }})       
            </h3>
            <v-stepper-header>
                <v-stepper-step :complete="steps > 1" step="1">
                    Productos
                </v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="steps > 2" step="2">
                    Datos
                </v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="steps > 3" step="3">
                    Confirmado
                </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1" class="pa-0">
                    <v-card tile flat class="pa-6">
                        <v-card-text>
                            <v-row class="body-1">
                                <v-col cols="7">Producto</v-col>
                                <v-col>Cantidad</v-col>
                            </v-row>
                            <v-row v-for="(product, index) in cart" :key="index">
                                <v-col cols="7"><strong>{{ product.product.name }}</strong> ({{ product.category }})</v-col>
                                <v-col>
                                    <v-btn icon @click="decreaseQuantity(index)" small class="primary white--text mr-1">-</v-btn>
                                    {{ product.quantity }}
                                    <v-btn icon @click="increaseQuantity(index)" small class="primary white--text ml-1">+</v-btn>
                                </v-col>
                            </v-row>
                            <v-row class="body-1">
                                <v-col cols="7"><strong>Total</strong></v-col>
                                <v-col>{{ total }} unidades</v-col>
                            </v-row>
                            <v-btn class="secondary mt-12" rounded depressed block large @click="steps = 2">Continuar con el pedido</v-btn>

                        </v-card-text>
                    </v-card>
                </v-stepper-content>
                <v-stepper-content step="2" class="pa-0">
                    <v-card tile flat class="pa-6">
                        <v-card-text>
                            <v-form v-model="valid">
                            <v-text-field v-model="name" label="Nombre y Apellido" :rules="rulesGlobal.name" outlined></v-text-field>
                            <v-text-field v-model="email" label="Email" :rules="rulesGlobal.email" outlined></v-text-field>
                            <v-text-field v-model="phone" label="Teléfono" :rules="rulesGlobal.required" outlined></v-text-field>
                        </v-form>
                            <v-btn class="secondary mt-8" block large rounded depressed  @click="send" :disabled="!valid">Enviar pedido</v-btn>
                            <v-btn class="my-4" block large rounded depressed  @click="steps = 1">Volver</v-btn>

                        </v-card-text>
                    </v-card>
                </v-stepper-content>
                <v-stepper-content step="3" class="px-0 py-12 text-center ">
                    <v-card tile flat  class="pa-6">
                        <v-card-text>
                    <v-icon large color="success">
                            mdi-whatsapp
                        </v-icon>
                    <h3>
                        Pedido enviado a Whatsapp!</h3>
                        <v-btn class="primary my-10" block large rounded depressed  @click="steps = 1">Corregir el pedido</v-btn>
                        <v-btn class="secondary my-6" block large rounded depressed  @click="emptyCart">Finalizar y vaciar carrito</v-btn>
                        </v-card-text>
                        </v-card>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <p v-else class="pa-12 card-h4 text-center"> 
            <v-icon large>error</v-icon>
            No hay productos en su pedido</p>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        cart: {
            type: Array,
            required: true,
        }
    },
    model: {
        event: `modified`
    },
    data() {
        return {
            steps: 1,
            valid: false,
            name: '',
            phone: '',
            email:''
        }
    },
    computed: {
        show: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit("modified", val);
            }
        },
        total() {
            return this.cart.reduce((acc, product) => acc + product.quantity, 0);
        },
    },
    methods: {
        increaseQuantity(index) {
            this.$store.commit("cart/increaseQuantity", index);
        },
        decreaseQuantity(index) {
            this.$store.commit("cart/decreaseQuantity", index);
        },
        send() {
            const message = this.constructMessage();
            const whatsappURL = `https://api.whatsapp.com/send?phone=5491126117588&text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
            this.steps = 3
        },
        constructMessage() {
            // Construir el mensaje con detalles personales y productos
            const personalDetails = `Nombre: ${this.name}\nEmail: ${this.email}\nTeléfono: ${this.phone}`;
            const productDetails = this.cart.map(product => `${product.product.name} (${product.category}): ${product.quantity}`).join('\n');
            const totalDetails = `*Total*: ${this.total} unidades`;
            return `Hola, estoy realizando un pedido:\n ${personalDetails}\n*Productos*:\n${productDetails}\n${totalDetails}`;
        },
        emptyCart() {
        this.$store.commit("cart/emptyCart");
        this.steps = 1;
        this.show = false
    },
    },
}

</script>
