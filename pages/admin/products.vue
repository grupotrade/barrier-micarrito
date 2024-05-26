<template>
    <v-container>
        <v-row align="center">
            <v-col cols="6">
                <h2> {{ $t("products.title") }}</h2>
            </v-col>
            <v-col class="text-right">

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field v-model="searchProducts" :label="$t('search')" solo hide-details
                    append-icon="mdi-table-search" color="secondary">
                </v-text-field>
            </v-col>
            <v-col class="text-right">
                <v-tooltip bottom content-class="bottom">
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on" v-show="minimizedProductDialog" outlined color="primary"
                            @click="maximizeProductDialog()">
                            {{ $t("products.restore_product") }}
                        </v-btn>
                    </template>
                    <span> {{ $t("products.restore_product") }}</span>
                </v-tooltip>
                <v-btn depressed color="primary" @click="newProduct()">
                    <v-icon>mdi-plus</v-icon> Nuevo producto
                </v-btn>
            </v-col>
        </v-row>
        <v-card flat outlined class="card-table mt-4">
            <v-skeleton-loader class="mx-auto" type=" table: table-heading, table-thead, table-tbody, table-tfoot"
                :loading="loading">
                <v-data-table :items="products" :headers="productsHeaders" :search="searchProducts" sort-by="productid"
                    sort-desc class="body-2">
                    <template v-slot:[`item.date`]="{ item }">
                        {{ $moment(item.date).format('DD-MM-YYYY HH:mm') }}
                    </template>
                    <template v-slot:[`item.description`]="{ item }">
                        {{ item.description.substring(0, 30) + '...' }}
                    </template>
                    <template v-slot:[`item.user`]="{ item }">
                        {{ item.user }}
                    </template>
                    <template v-slot:[`item.category`]="{ item }">
                        {{ getCategoryName(item.category) }}
                    </template>
                    <template v-slot:[`item.onHome`]="{ item }">
                        <v-switch hide-details dense :input-value="item.onHome" small
                            @change="(item.onHome === true) ? updateOnHome(item, false) : updateOnHome(item, true)"></v-switch>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip :color="getStatusColor(item.status)" small>{{ $t('products.status.' + item.status)
                        }}</v-chip>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip top content-class="top">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="primary" v-on="on" @click="viewProduct(item)"
                                    :disabled="item.status == 0">
                                    <v-icon>feed</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("products.view_product") }}</span>
                        </v-tooltip>
                        <v-tooltip top content-class="top">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="primary" v-on="on" @click="updateProduct(item)"
                                    :disabled="item.status == 0">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("products.edit_product") }}</span>
                        </v-tooltip>
                        <v-tooltip top content-class="top" v-if="item.status == 0">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="primary" v-on="on" @click="activeProduct(item, true)">
                                    <v-icon>visibility</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("products.enable_product") }}</span>
                        </v-tooltip>
                        <v-tooltip top content-class="top" v-if="item.status == 1">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="error" v-on="on" @click="activeProduct(item, false)">
                                    <v-icon>visibility_off</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("products.disable_product") }}</span>
                        </v-tooltip>
                        <v-tooltip top content-class="top">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="error" v-on="on" @click="deleteProduct(item)"
                                    :disabled="item.status == 0">
                                    <v-icon color="error">delete</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("products.delete_product") }}</span>
                        </v-tooltip>
                        <!-- <v-tooltip top content-class="top">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="primary" v-on="on" @click="copyUrl(item.id)"
                                    :disabled="item.status == 0">
                                    <v-icon color="primary">mdi-content-copy</v-icon>
                                </v-btn>
                            </template>
                            <span>Copiar url para iframe</span>
                        </v-tooltip> -->
                    </template>
                </v-data-table>
            </v-skeleton-loader>
        </v-card>
        <ProductsUpdateProductDialog v-model="updateProductDialog" :product="productSelected" :products="products"
            :user="user" v-if="productSelected != null" @finish="listProducts()" @minimize="minimizeProductDialog()"
            @cancel="cancelProductDialog()" />
        <ProductsNewProductDialog v-model="newProductDialog" :user="user" :products="products" @finish="listProducts()"
            @minimize="minimizeProductDialog()" @cancel="cancelProductDialog()" />
        <ProductsViewProductDialog v-model="viewProductDialog" :product="productSelected" v-if="productSelected != null" />
    </v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    layout: 'admin',
    data() {
        return {
            searchProducts: '',
            loading: false,
            newProductDialog: false,
            updateProductDialog: false,
            viewProductDialog: false,
            minimizedProductDialog: false,
            productsHeaders: [{
                text: 'Nombre',
                value: 'name',
            },
            {
                text: this.$t('category'),
                value: 'category',
            },
            {
                text: this.$t('products.created_by'),
                value: 'user.name',
            },
            {
                text: 'Destacado',
                value: 'onHome',
            },
            {
                text: this.$t('status'),
                value: 'status',
            },
            {
                text: '',
                value: 'actions',
            }
            ],
            productSelected: null,
            deletedProducts: null,
        }
    },
    computed: {
        ...mapGetters({
            products: "products/getProducts",
            categories: "categories/getProductCategories",
        }),
        user() {
            return this.$store.state.authUser;
        }
    },
    mounted() {
        this.listProducts()
        this.fetchCategories()
    },
    methods: {
        listProducts() {
            this.$store.dispatch('products/getProducts')
        },
        fetchCategories() {
            this.$store.dispatch('categories/fetchAllProductCategories')
        },
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : 'Unknown';
        },
        newProduct() {
            this.newProductDialog = true
        },
        async activeProduct(item, value) {
            let active = null
            if (value == true) {
                active = 1
            } else {
                active = 0
            }

            await this.$fire.firestore.collection('products').doc(item.id).update({
                status: active
            }).then(result => {
                this.listProducts()
                this.$snackbar.show({
                    text: 'Producto actualizado',
                    color: 'success'
                })
            }, error => [
                this.$snackbar.show({
                    text: error,
                    color: 'error'
                })
            ])
        },
        async updateOnHome(item, value) {
            console.log(item, value)
            await this.$fire.firestore.collection('products').doc(item.id).update({
                onHome: value
            }).then(result => {
                this.listProducts()
                this.$snackbar.show({
                    text: 'Producto actualizado',
                    color: 'success'
                })
            }, error => [
                this.$snackbar.show({
                    text: error,
                    color: 'error'
                })
            ])
        },
        minimizeProductDialog() {
            this.minimizedProductDialog = true
        },
        maximizeProductDialog() {
            this.newProductDialog = true
            this.minimizedProductDialog = false
        },
        cancelProductDialog() {
            this.minimizedProductDialog = false
            this.listProducts()
        },
        viewProduct(item) {
            this.productSelected = item
            this.viewProductDialog = true
        },
        updateProduct(item) {
            this.productSelected = item
            this.updateProductDialog = true
        },
        deleteProduct(item) {
            this.$dialog.show({
                name: `${this.$t("confirm_dialog.delete_product")}`,
                text: `${this.$t("confirm_dialog.confirm_cancel")} ${this.$t(
                    "confirm_dialog.delete_product"
                )}`,
                buttons: [{
                    text: this.$t("accept"),
                    color: "primary",
                    handle: () => {
                        this.$dialog.hide();
                        this.deleteProductConfirm(item)
                    },
                },],
            });
        },
        deleteProductConfirm(item) {
            const dateTime = new Date()
            this.$fire.firestore.collection('products').doc(item.id).update({
                deletedAt: dateTime.toISOString()
            }).then(result => {
                this.$toasted.success('Producto eliminado', {
                    theme: "bubble",
                    position: "top-right",
                    duration: 2000
                })
                this.listProducts()
            }, error => [
                this.$toasted.error(error, {
                    theme: "bubble",
                    position: "top-right",
                    duration: 2000
                })
            ])
        },
        copyUrl(id) {
            navigator.clipboard.writeText('https://hemami.trade-house.com/' + id)
        }
    }
}
</script>
