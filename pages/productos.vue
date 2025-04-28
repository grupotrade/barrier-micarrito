<template>
    <v-sheet>
        <v-sheet class="container-banner">
            <BannersListBanners position="productos-header" />
        </v-sheet>
        <v-container fluid class="container-inner mt-12">


    <v-row>
        <v-col cols="12" md="3">
            <h4 class="semi">Categorías</h4>
            <v-divider class="line-title primary mb-4"></v-divider>
            
            <products-categories-menu @categorySelected="handleCategoryClick" />
            <h4 class="semi mt-4">Marcas</h4>
            <v-divider class="line-title primary mb-4"></v-divider>
            <products-brands-menu @brandSelected="handleBrandClick" />
            <h4 class="semi mt-4">Buscador</h4>
            <v-divider class="line-title primary mb-4"></v-divider>
           <products-autocomplete />
        </v-col>
        <v-col cols="12" md="9">
            <h4 class="semi" v-if="selectedCategory">{{ getCategoryName(selectedCategory)}}</h4>
            <h4 class="semi" v-if="!selectedCategory">Productos</h4>
            <v-divider class="line-title primary mb-4"></v-divider>
            <products-list 
                ref="productsList"
                :category="selectedCategory" 
            />
        </v-col>
    </v-row>
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
            expandedCategories: {},
            selectedCategory: null,
            selectedBrand: null,
            loading: false,
        }
    },
    computed: {
        ...mapGetters({
            categories: "categories/getProductCategories",
            brands: "brands/getBrands"
        }),
        category() {
            return  this.$route.params.id
        },
        mainCategories() {
            return this.categories
                .filter(category => category.isMain)
                .sort((a, b) => a.name.localeCompare(b.name));
        },
    },
    mounted() {
        this.$store.dispatch('categories/fetchAllProductCategories')
        if (this.$refs.productsList) {
            this.$refs.productsList.fetchAllProducts();
        }
    },
    watch: {
        selectedCategory: {
            immediate: true,
            handler(newCategoryId) {
                if (this.$refs.productsList) {
                    if (newCategoryId) {
                        this.$refs.productsList.fetchProductsByCategory(newCategoryId);
                    } else {
                        this.$refs.productsList.fetchAllProducts();
                    }
                }
            }
        },
        selectedBrand: {
            immediate: true,
            handler(newBrandId) {
                if (this.$refs.productsList) {
                    this.$refs.productsList.filterByBrand(newBrandId);
                }
            }
        }
    },
    methods: {
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : '';
        },
        handleCategoryClick(category) {
            this.selectedCategory = category.id;
        },
        handleBrandClick(brand) {
            this.selectedBrand = brand ? brand.id : null;
        }
    }   
}
</script>

<style>
.btn-category {
    margin-bottom: 8px;
}
.btn-category .v-btn__content {
    justify-content: flex-start !important;
    text-transform: none !important;
    font-size: 12px !important;
}
.subcategories-container {
    padding-left: 20px;
    margin-top: 4px;
}
.btn-subcategory {
    margin-bottom: 4px;
}
.btn-subcategory .v-btn__content {
    justify-content: flex-start !important;
    text-transform: none !important;
    font-size: 12px !important;
}
.subcategories-container {
    padding-left: 20px;
    margin-top: 4px;
    margin-bottom: 8px;
}
.btn-subcategory {
    margin-bottom: 4px;
    opacity: 0.8;
}
.btn-subcategory:hover {
    opacity: 1;
}
</style>


