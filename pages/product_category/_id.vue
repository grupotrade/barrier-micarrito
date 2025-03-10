<template>
<v-container class="container-inner pt-16">
    <v-sheet class="container-banner">
        <BannersListBanners position="productos-header" />
    </v-sheet>
    <v-row>
        <v-col cols="12" md="3">
            <h4 class="semi">Categorías</h4>
            <v-divider class="line-title primary mb-4"></v-divider>
            
            <products-categories-menu 
                :initial-category="category"
                @categorySelected="handleCategoryClick" 
            />
           
        </v-col>
        <v-col cols="12" md="9">
            <h4 class="semi">{{ getCategoryName(category)}}</h4>
            <v-divider class="line-title primary mb-4"></v-divider>
            <products-list 
                ref="productsList"
                :category="category"
            />
        </v-col>
    </v-row>

    <!-- <h3 class="mt-10 mb-6" v-if="posts">Más publicaciones</h3> -->
</v-container>
</template>

<script> 
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            selectedCategory: null
        }
    },
    computed: {
        ...mapGetters({
            categories: "categories/getProductCategories",
        }),
        category() {
            return  this.$route.params.id
        }
    },
    mounted() {
        this.$store.dispatch('categories/fetchAllProductCategories')

    },
    methods: {
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : '';
        },
        handleCategoryClick(category) {
            if (category && category.id !== this.category) {
                this.$router.push(`/product_category/${category.id}`);
            }
        }
    },
    watch: {
        category: {
            immediate: true,
            handler(newCategoryId) {
                if (this.$refs.productsList && newCategoryId) {
                    this.$refs.productsList.fetchProductsByCategory(newCategoryId);
                }
            }
        }
    }
}
</script>
