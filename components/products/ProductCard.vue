<template>
    <v-card  flat tile class="mx-1 fill-height d-flex flex-column rounded-lg background" v-if="product" @click="$emit('viewDetails')">
        <v-img :src="product.imagePrincipal" height="350px" cover v-if="product.imagePrincipal"></v-img>
        <v-img :src="product.images[0]" height="350px" cover v-else></v-img>
        <vue-easy-lightbox escDisabled moveDisabled :visible="visible" :imgs="imgs" :index="index"
            @hide="handleHide"></vue-easy-lightbox>
        <v-card-text class="px-2 py-3 fill-height">
            <v-row dense>
                <v-col cols="7">
                    <h4 class="secondary_text--text pa-2">{{ product.name }}</h4>
                </v-col>
                <v-col>
                    <p class="pa-2 mb-0 text-center">{{ category }}</p>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col v-if="showAdd">
                <v-btn icon @click="decreaseQuantity()" small class="mr-1">-</v-btn>
                {{ quantity }}
                <v-btn icon @click="increaseQuantity()" small class="ml-1">+</v-btn>
            </v-col>
            <v-col v-if="showAdd">
                <v-btn color="primary" small rounded depressed @click="addProduct">Agregar</v-btn>
            </v-col>
            <v-col class="text-center">
                <v-btn color="secondary" small rounded depressed @click="$emit('viewDetails')">Detalles</v-btn>
            </v-col>

            </v-row>
        </v-card-text>
           
    </v-card>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
export default {
    props: {
        product: {
            type: Object,
        },
        category: {
            type: String
        },
        showAdd :{
            type: Boolean,
            default: false
        },
    },
    components: {
        VueEasyLightbox
    },
    data() {
        return {
            quantity: 1,
            imgs: '',  // Img Url , string or Array of string
            visible: false,
            index: 0   // default: 0
        };
    },
    methods: {
        showSingle() {
            this.imgs = this.product.images[0]
            this.show()
        },
        show() {
            this.visible = true
        },
        handleHide() {
            this.visible = false
        },
        addProduct() {
            this.$store.dispatch('cart/addToCart', { product: this.product, quantity: this.quantity, category: this.category });
        },
        increaseQuantity() {
            this.quantity++
        },
        decreaseQuantity(index) {
            this.quantity--
        }
    }
}
</script>