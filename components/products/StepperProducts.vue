<!-- <template>
    <v-stepper v-model="steps" elevation="0">
                <v-stepper-header flat>
                    <v-stepper-step :complete="steps > 1" step="1">
                        <v-btn @click="steps = 1" text :disabled="steps == 1">Seleccioná tipo de lámina</v-btn>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="steps > 2" step="2">
                        <v-btn @click="goToCategories({ id: mainCategorySelected })" text
                            :disabled="(steps == 2, !mainCategorySelected, steps == 1)"> Seleccioná
                            categoría</v-btn>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="steps > 3" step="3">
                        <v-btn text disabled> Seleccioná
                            productos</v-btn>
                    </v-stepper-step>
                </v-stepper-header>
                <div v-if="loading" class="text-center my-12">
                    <v-progress-circular indeterminate color="primary" size="80"
                        class="my-16 mx-auto"></v-progress-circular>
                </div>
                <v-stepper-items>
                    <v-stepper-content step="1" class="pa-0">
                        <v-container>
                            <h3 class="my-6 text-center secondary_text--text">Seleccioná tipo de lámina</h3>

                            <v-row dense justify="center">
                                <v-col cols="12" lg="4" class="py-6" v-for="item in mainCategories" :key="item.name">
                                    <ProductsCategoryCard :category="item" @goTo="goToCategories" />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-stepper-content>
                    <v-stepper-content step="2" class="pa-0">
                        <v-container>
                            <h3 class="my-6 text-center secondary_text--text">Seleccioná categoría</h3>

                            <v-row dense justify="center">
                                <v-col cols="12" lg="3" class="py-6" v-for="item in categories" :key="item.name">
                                    <ProductsCategoryCard :category="item" @goTo="goToProducts" />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-stepper-content>
                    <v-stepper-content step="3" class="pa-0">
                        <v-container v-if="steps == 3">
                            <h3 class="my-6 text-center secondary_text--text">Seleccioná productos</h3>

                            <v-row dense>
                                <v-col cols="12" lg="3" class="mb-2" v-for="item in products" :key="item.name">
                                    <ProductsProductCard :product="item" :category="getCategoryName(item.category)" />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
</template> -->

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            loginDialog: false,
            registerDialog: false,
            productDialog: false,
            viewProductDialog: false,
            productSelected: null,
            loading: false,
            mainCategorySelected: null,
            categorySelected: null,
            steps: 1,
        }
    },
    computed: {
        ...mapGetters({
            products: "products/getProducts",
            categories: "categories/getProductCategories",
            mainCategories: "categories/getProductMainCategories",
        }),
        user() {
            return this.$store.state.authUser;
        }
    },
    watch: {
        $route(to, from) {
            const step = parseInt(to.query.step) || 1;
            this.steps = step;
        },
    },
    mounted() {
        this.$router.afterEach(this.handleRouteChange);

        // Obtener el valor actual del parámetro step de la URL
        const { query } = this.$route;
        const step = parseInt(query.step);
        this.$store.dispatch('categories/fetchProductMainCategories');

        if (!isNaN(step) && step >= 1 && step <= 3) {
            // Si el valor es válido, establecer el paso actual
            this.steps = step;

            // Si estamos en el paso 2 o 3, también necesitamos cargar la información correspondiente
            if (step >= 2) {
                const categoryId = query.id_cat;
                if (categoryId) {
                    if (step === 2) {
                        this.goToCategories({ id: categoryId });
                    } else if (step === 3) {
                        const productId = query.id_prod;
                        this.goToProducts({ id: productId, mainCategory: categoryId });

                    }
                }
            }
        }
    },
    methods: {
        async goToCategories(item) {
            try {
                this.setLoading(true);
                this.mainCategorySelected = item.id;
                this.categorySelected = null;

                // Fetch las categorías asociadas a la categoría principal
                await this.fetchCategoriesByMain(item.id);
                await new Promise(resolve => setTimeout(resolve, 400));
                // Verificar si solo hay una categoría
                if (this.categories.length === 1) {
                    // Si solo hay una categoría, seleccionarla automáticamente y pasar al Step 3
                    const singleCategory = this.categories[0];
                    await this.goToProducts({ id: singleCategory.id, mainCategory: item.id });
                } else {
                    // Si hay más de una categoría, pasar al Step 2
                    this.steps = 2;
                    this.$router.push({ query: { id_cat: item.id, step: this.steps } });
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                this.setLoading(false);
            }
        },
        async goToProducts(item) {
            try {
                this.setLoading(true);
                if (!this.mainCategorySelected) {
                    this.mainCategorySelected = item.mainCategory;
                }
                this.categorySelected = item;
                await this.fetchProducts(item.id);
                this.steps = 3;
                this.$router.push({ query: { id_cat: item.mainCategory, id_prod: item.id, step: this.steps } });
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                this.setLoading(false);
            }
        },
        handleRouteChange(to, from) {
            // Obtener el valor actual del parámetro step de la URL
            const { query } = to;
            const step = parseInt(query.step);

            if (!isNaN(step) && step >= 1 && step <= 3) {
                // Solo cambiar el paso si el nuevo paso es diferente al actual
                if (this.steps !== step) {
                    this.steps = step;

                    // Si estamos en el paso 2 o 3, también necesitamos cargar la información correspondiente
                    if (step >= 2) {
                        const categoryId = query.id_cat;
                        if (categoryId) {
                            if (step === 2) {
                                this.goToCategories({ id: categoryId });
                            } else if (step === 3) {
                                const productId = query.id_prod
                                if (productId) {
                                    this.goToProducts({ id: productId, mainCategory: categoryId });
                                }
                            }
                        }
                    }
                }
            }
        },
        async fetchProducts(id) {
            try {
                this.setLoading(true);
                await this.$store.dispatch('products/fetchProductsByCategory', id);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                this.setLoading(false);
            }
        },
        async fetchCategoriesByMain(id) {
            try {
                this.setLoading(true);
                await this.$store.dispatch('categories/fetchProductCategoriesByMain', id);
            } catch (error) {
                console.error("Error fetching categories:", error);
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
        openRegister() {
            this.registerDialog = true
        },
        openLogin() {
            this.loginDialog = true
        },

        viewProduct(product) {
            this.viewProductDialog = true,
                this.productSelected = product
        },
        closeProductDialog() {
            this.productDialog = false,
                this.productSelected = {}
        }
    }
}
</script>