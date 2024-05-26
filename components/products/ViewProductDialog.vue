<template>
<v-dialog v-model="show" width="450px">
    <v-toolbar flat class="primary" dark dense>
        Agregar producto al carrito
        <v-spacer></v-spacer>
        <v-tooltip bottom content-class="bottom">
            <template v-slot:activator="{ on }">
                <v-btn depressed icon v-on="on" @click.stop="show = false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </template>
            <span>{{$t('close')}}</span>
        </v-tooltip>
    </v-toolbar>
    <v-card flat tile class="primary px-2 pb-2">
        <ProductsProductCard :product="product" />
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean
        },
        product: {
            type: Object,
            require: true
        }
    },
    model: {
        event: `modified`
    },
    data() {
        return {
            imageGallery: null
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
    },
    methods: {
         viewProduct(product) {
            this.$emit('viewProduct', product)
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
