<template>
    <v-card tile class="mx-1 fill-height d-flex flex-column background product-card" v-if="product" @click="$emit('viewDetails')">
        <v-img :src="product.imagePrincipal" height="350px" cover v-if="product.imagePrincipal"></v-img>
        <v-img :src="product.images[0]" height="350px" cover v-else></v-img>
        <vue-easy-lightbox escDisabled moveDisabled :visible="visible" :imgs="imgs" :index="index"
            @hide="handleHide"></vue-easy-lightbox>
        <v-card-text class="px-2 pt-3">
            <h5 class="primary_text--text">{{ product.name }}</h5>
            <v-row dense>
                <v-col cols="7">
                  
      
                    <p class="body-3 primary_text--text">{{ category }}</p>
                </v-col>
                <v-col class="text-right">
                <v-btn color="primary" small rounded depressed @click="$emit('viewDetails')">Ver más</v-btn>
            </v-col>
            </v-row>
            <v-row dense v-if="showAdd">
                <v-col >
                <v-btn icon @click="decreaseQuantity()" small class="mr-1">-</v-btn>
                {{ quantity }}
                <v-btn icon @click="increaseQuantity()" small class="ml-1">+</v-btn>
            </v-col>
            <v-col v-if="showAdd">
                <v-btn color="primary" small rounded depressed @click="addProduct">Agregar</v-btn>
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

<style scoped>
.v-sheet.v-card.product-card, .v-sheet.v-card .v-card__text {
    transition: all 0.3s ease;
    box-shadow: 0 0 0 0 transparent !important;

}

.v-sheet.v-card.product-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1) !important;
}

.product-card:hover .v-card__text {
    transform: scale(0.95);
}

</style>

