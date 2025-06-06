<template>
    <v-card flat tile v-if="product">
        <v-card-text>
            <v-row>
                <v-col cols="12" md="6">
                    <span class="text-uppercase grey--text">{{ categoryName }}</span>
                    <h1 class="text-h4 font-weight-bold mb-6">{{ product.name }}</h1>
                    
                    <div v-if="brandInfo" class="mb-6">
                        <v-img 
                            :src="$config.storage+'brands%2F' + brandInfo.image + '?alt=media'"
                            max-width="150" 
                            class="mb-2"
                            v-if="brandInfo.image"
                        ></v-img>
                    </div>

                    <h2 class="text-h3 font-weight-bold mb-6" v-if="product.price">
                        ${{ product.price }}
                    </h2>

                    <v-row class="mb-6" dense>
                        <v-col cols="auto" v-if="product.files?.manual">
                            <v-btn
                                color="primary"
                                depressed
                                rounded
                                @click="downloadFile(product.files.manual)"
                            >
                                <v-icon left>mdi-download</v-icon>
                                Descargar manual
                            </v-btn>
                        </v-col>
                        <v-col cols="auto" v-if="product.files?.folleto">
                            <v-btn
                                color="primary"
                                depressed
                                rounded
                                @click="downloadFile(product.files.folleto)"
                            >
                                <v-icon left>mdi-download</v-icon>
                                Descargar folleto
                            </v-btn>
                        </v-col>
                    </v-row>

                    <div class="text-body-1 mb-6" v-html="product.description"></div>

                    <h3 class="text-h5 font-weight-bold mb-4" v-if="product.details">Características principales</h3>
                    <div v-html="product.details"></div>

                    <v-row class="mt-6" dense>
                        <v-col cols="auto">
                            <v-btn
                                color="primary"
                                outlined
                                rounded 
                                :href="'https://api.whatsapp.com/send/?phone=5491137827119&text=Hola+Barrier%21+Necesito+asesoramiento+sobre+'+this.product.name+'&type=phone_number&app_absent=0'"
                                target="_blank"
                            >
                                Consultar por Whatsapp
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn
                                color="primary"
                                outlined
                                rounded
                                @click="contactDialog = true"
                            >
                                Consultar por Mail
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>

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
            </v-row>
        </v-card-text>
        <v-dialog v-model="contactDialog" max-width="500">
            <v-card>
                <v-card-text>
                    <ContactForm :product="product" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>

</template>
<script>

export default {
    props: {
        product: {
            type: Object,
        },
        showAddToCart: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            imageGallery: null,
            quantity: 1,
            carouselHeight: null,
            imageLoading: true,
            contactDialog: false
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
        },
        downloadFile(url) {
            window.open(url, '_blank');
        },
        consultarPorMail() {
            window.location.href = `mailto:tuemail@ejemplo.com?subject=Consulta sobre ${this.product.name}`;
        }
    },
    computed: {
        categoryName() {
            return 'AGUA CALIENTE SANITARIA';
        },
        brandInfo() {
            if (!this.product || !this.product.brand || !this.$store.getters['brands/getBrands']) return null;
            return this.$store.getters['brands/getBrands'].find(brand => brand.id === this.product.brand);
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