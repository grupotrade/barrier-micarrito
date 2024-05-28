<template>
    <v-container fluid>
        <header class="header-product">
            <v-container class="container-header-product">
                <h3 class="white--text" v-if="product">{{ product.name }}</h3>
                <a href="/" class="white--text">
                    SIM / Productos /</a>
                <a :href="'/product_category/' + product.category" v-if="product" class="white--text">
                    {{ getCategoryName(product.category) }}
                </a>
            </v-container>
        </header>
        <v-container class="container-product">
            <v-card flat tile :loading="product == null">
                <ProductsProductDetails :product="product" @viewProduct="viewProduct" />
            </v-card>
        </v-container>
    </v-container>
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
