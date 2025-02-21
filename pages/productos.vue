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
            
            <div v-for="mainCategory in mainCategories" :key="mainCategory.id">
                <v-btn 
                    block 
                    outlined 
                    color="primary" 
                    class="rounded-md btn-category"
                    @click="handleCategoryClick(mainCategory)"
                >
                    {{ mainCategory.name }}
                    <v-icon class="ml-auto" v-if="hasSubcategories(mainCategory.id)">
                        {{ expandedCategories[mainCategory.id] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                </v-btn>
                
                <div v-if="expandedCategories[mainCategory.id]" class="subcategories-container">
                    <v-btn 
                        v-for="subCategory in getSubcategories(mainCategory.id)" 
                        :key="subCategory.id"
                        block 
                        outlined 
                        color="secondary" 
                        class="rounded-md btn-subcategory"
                        @click="selectedCategory = subCategory.id"
                    >
                        {{ subCategory.name }}
                    </v-btn>
                </div>
            </div>
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

    <!-- <h3 class="mt-10 mb-6" v-if="posts">Más publicaciones</h3> -->
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
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            categories: "categories/getProductCategories",
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
        }
    },
    methods: {
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : '';
        },
        toggleCategory(categoryId) {
            this.$set(this.expandedCategories, categoryId, !this.expandedCategories[categoryId]);
        },
        getSubcategories(parentId) {
            return this.categories
                .filter(category => 
                    !category.isMain && category.category && category.category.id === parentId
                )
                .sort((a, b) => a.name.localeCompare(b.name));
        },
        hasSubcategories(parentId) {
            return this.categories.some(category => 
                !category.isMain && category.category && category.category.id === parentId
            );
        },
        handleCategoryClick(category) {
            if (this.hasSubcategories(category.id)) {
                this.toggleCategory(category.id);
            } else {
                this.selectedCategory = category.id;
            }
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


