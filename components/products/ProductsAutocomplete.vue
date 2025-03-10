<template>
     <v-autocomplete v-model="productSelected" hide-details outlined rounded prepend-inner-icon="mdi-magnify"
                label="Escribí el nombre del producto" class="transparent" return-object :items="allProducts" dense
                :loading="loadingSearchResults" :search-input.sync="searchTerm" item-text="name" @change="navigateProduct()"
                item-value="id">
                <template v-slot:no-data>
                    <p class="grey--text ml-2 pa-2 mb-0">
                        Escribí el nombre del producto
                    </p>
                </template>
            </v-autocomplete>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            productSelected: null,
            searchTerm: '',
            loadingSearchResults: false,
            allProducts: []
        }
    },
    computed: {
        ...mapGetters({
            products: "products/getProducts",
        })
    },
    watch: {
        products: {
            immediate: true,
            handler(newProducts) {
                if (newProducts && newProducts.length) {
                    this.allProducts = JSON.parse(JSON.stringify(newProducts))
                }
            }
        }
    },
    methods: {
        navigateProduct() {
            const productName = this.productSelected.name.replace(/\s+/g, '-').toLowerCase();
            this.$router.push(`/product/${productName}_${this.productSelected.id}`);    
            this.productSelected = null
        }
    }
}
</script>
