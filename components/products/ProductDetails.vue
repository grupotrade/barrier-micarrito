<template>
    <v-card flat tile v-if="product">
        <v-card-text>
            <v-row>
                <v-col cols="12" md="6">
                    <v-carousel hide-delimiters :height="carouselHeight" v-model="imageGallery" :continuous="true"
                        :show-arrows="$vuetify.breakpoint.xs">
                        <v-carousel-item class="mx-auto" v-if="product.imagePrincipal">
                            <img :src="product.imagePrincipal" style="max-width: 100%" />
                        </v-carousel-item>
                        <v-carousel-item v-for="img in product.images" :key="img" class="mx-auto">
                            <img :src="img" style="max-width: 100%" />
                        </v-carousel-item>
                    </v-carousel>
                    <v-slide-group v-model="imageGallery" show-arrows class="py-4" active-class="success"
                        v-if="!$vuetify.breakpoint.xs && product.images.length > 1">
                        <v-slide-item  v-slot="{ active, toggle }" v-if="product.imagePrincipal">
                            <v-card :class="active ? 'card-thumbnail' : 'card-thumbnail-active'" flat tile
                                @click="toggle" class="mr-2" color="transparent">
                                <v-img :src="product.imagePrincipal" width="200" height="200"></v-img>
                            </v-card>
                        </v-slide-item>
                        <v-slide-item v-for="img in product.images" :key="img" v-slot="{ active, toggle }">
                            <v-card :class="active ? 'card-thumbnail' : 'card-thumbnail-active'" flat tile
                                @click="toggle" class="mr-2" color="transparent">
                                <v-img :src="img" width="200" height="200"></v-img>
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </v-col>
                <v-col cols="12" md="6">
                    <h3 class="py-3 semi">{{ product.name }}</h3>
                    <v-divider></v-divider>
                    <h4 v-if="product.price" class="py-3">${{ product.price }}</h4>
                    <v-divider></v-divider>
                    <div class="body-2 pa-4" v-html="product.description"></div>
                    <v-divider></v-divider>
                    <v-row justify="center" class="py-4">
                        <v-col cols="5">
                            <v-btn icon @click="decreaseQuantity()" small class="primary white--text mr-1">-</v-btn>
                            {{ quantity }}
                            <v-btn icon @click="increaseQuantity()" small class="primary white--text ml-1">+</v-btn>
                        </v-col>
                        <v-col cols="4" class="text-center">
                            <v-btn color="primary" depressed rounded @click="addProduct">Agregar</v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <div class="body-2 pa-4" v-html="product.details"></div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>
<script>

export default {
    props: {
        product: {
            type: Object,
        }
    },
    data() {
        return {
            imageGallery: null,
            quantity: 1,
            carouselHeight: null,
            imageLoading: true
        }
    },
    methods: {
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


<style>
.card-thumbnail {
    opacity: 0.6 !important;
}

.card-thumbnail-active {
    opacity: 1 !important;
}
</style>