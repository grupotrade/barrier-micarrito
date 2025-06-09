<template>
    <div>
     <div v-for="mainCategory in mainCategories" :key="mainCategory.id">
                <v-btn 
                    block 
                    :outlined="selectedCategory !== mainCategory.id"
                    :depressed="selectedCategory === mainCategory.id"
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
                        :outlined="selectedCategory !== subCategory.id"
                        :depressed="selectedCategory === subCategory.id"
                        color="secondary" 
                        class="rounded-md btn-subcategory"
                        @click="handleCategoryClick(subCategory)"
                    >
                        {{ subCategory.name }}
                    </v-btn>
                </div>
            </div>
        </div>
</template>

<script> 
import {
    mapGetters
} from 'vuex'
export default {
    props: {
        initialCategory: {
            type: String,
            default: null
        }
    },
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
            return this.$route.params.id
        },
        mainCategories() {
            return this.categories
                .filter(category => category.isMain && category.active)
                .sort((a, b) => a.name.localeCompare(b.name));
        },
    },
    mounted() {
        this.$store.dispatch('categories/fetchAllProductCategories')
        this.selectedCategory = this.initialCategory
        if (this.$refs.productsList) {
            this.$refs.productsList.fetchAllProducts();
        }
    },
    watch: {
        initialCategory: {
            immediate: true,
            handler(newValue) {
                this.selectedCategory = newValue;
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
                    !category.isMain && 
                    category.category && 
                    category.category.id === parentId &&
                    category.active
                )
                .sort((a, b) => a.name.localeCompare(b.name));
        },
        hasSubcategories(parentId) {
            return this.categories.some(category => 
                !category.isMain && 
                category.category && 
                category.category.id === parentId &&
                category.active
            );
        },
        handleCategoryClick(category) {
            if (this.hasSubcategories(category.id)) {
                this.toggleCategory(category.id);
            }
            this.selectedCategory = category.id;
            this.$nextTick(() => {
                this.$emit('categorySelected', category);
            });
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



