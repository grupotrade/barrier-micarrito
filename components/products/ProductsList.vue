<template>
    <v-container fluid class="px-0">
        <v-skeleton-loader class="mx-auto" type="card" :loading="loading">
            <v-row dense v-if="home">
                <v-col cols="12" :lg="columns" class="mb-2" v-for="item in productsHome" :key="item.name">
                    <ProductsProductCard :product="item" :category="getCategoryName(item.category)"
                        @viewDetails="navigateProduct(item)" :showAdd="true" />
                </v-col>
            </v-row>
            <v-row dense v-if="!home">
                <v-col cols="12" :lg="columns" class="mb-2" v-for="item in products" :key="item.id">
                    <ProductsProductCard :product="item" :category="getCategoryName(item.category)"
                        @viewDetails="navigateProduct(item)" :showAdd="false" />
                </v-col>
            </v-row>
        </v-skeleton-loader>
    </v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'products-list',
    props: {
        category: {
            type: String
        },
        home: {
            type: Boolean,
            default: false
        },
        columns: {
            type: String,
            default: '4'
        }
    },
    data() {
        return {
            productSelected: null,
            loading: false,
            viewProductDialog: false,
            productSelected: null
        }
    },
    computed: {
        ...mapGetters({
            products: "products/getProducts",
            productsHome: "products/getHomeProducts",
            categories: "categories/getProductCategories",
        }),
        user() {
            return this.$store.state.authUser;
        }
    },
    mounted() {
        this.$store.dispatch('categories/fetchAllProductCategories');
        if (this.home) {
            this.fetchHomeProducts()
        }
        else if (this.category) {
            this.fetchProductsByCategory(this.category)
        }
        else {
            this.fetchAllProducts()
        }

    },
    methods: {
        async fetchProductsByCategory(id) {
            try {
                this.setLoading(true);
                await this.$store.dispatch('products/fetchProductsByCategory', id);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                this.setLoading(false);
            }
        },
        async fetchHomeProducts() {
            try {
                this.setLoading(true);
                await this.$store.dispatch('products/fetchHomeProducts');
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                this.setLoading(false);
            }
        },
        async fetchAllProducts() {
            try {
                this.setLoading(true);
                await this.$store.dispatch('products/fetchAllProducts');
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                this.setLoading(false);
            }
        },
        setLoading(value) {
            this.loading = value;
        },
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : '';
        },
        viewProduct(product) {
            this.viewProductDialog = true
            this.productSelected = product
        },
        navigateProduct(product) {
            const productName = product.name.replace(/\s+/g, '-').toLowerCase();
            this.$router.push(`/product/${productName}_${product.id}`);
        },
        closeProductDialog() {
            this.productDialog = false
            this.productSelected = {}
        }
    }
}
</script>