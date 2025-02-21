<template>
     <v-sheet>
        <v-sheet class="container-banner">
            <BannersListBanners position="productos-header" />
        </v-sheet>
        <v-container fluid class="container-inner mt-12">

            <v-card flat tile :loading="product == null">
                <ProductsProductDetails :product="product" showAddToCart="false" @viewProduct="viewProduct" />
            </v-card>

    </v-container>
    </v-sheet>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            product: null
        }
    },
    computed: {
        ...mapGetters({
            categories: "categories/getProductCategories",
        })
    },
    mounted() {
        this.getProduct()
        this.fetchCategories()
    },
    methods: {
        async getProduct() {
            const nameWithId = this.$route.params.id;
            const [productName, productId] = nameWithId.split('_');

            if (!productId) {
                console.log("Formato de URL incorrecto.");
                return;
            }
            let ref = this.$fire.firestore.collection('products')
            ref.doc(productId).get().then((doc) => {
                if (doc.exists) {
                    this.product = doc.data()

                } else {
                    // doc.data() will be undefined in this case
                    console.log("Producto no encontrado!");
                }
            }).catch((error) => {
                console.log("Error buscando el producto:", error);
            });

        },
        fetchCategories() {
            this.$store.dispatch('categories/fetchAllProductCategories')
        },
        viewProduct(item) {
            this.$router.push(item)
        },
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : '';
        },
    },

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
