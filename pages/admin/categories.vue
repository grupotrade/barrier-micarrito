<template>
    <v-container>
        <v-row align="center">
            <v-col cols="6">
                <h2> {{ $t("categories.title") }}</h2>
            </v-col>
            <v-col class="text-right">

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field v-model="searchProductCategories" :label="$t('search')" solo hide-details
                    append-icon="mdi-table-search" color="secondary">
                </v-text-field>
              
            </v-col>
            <v-col class="text-right">
                <v-tooltip top content-class="top">
                    <template v-slot:activator="{ on }">
                        <v-btn icon color="info" v-on="on" @click="orderMainCategories()">
                            <v-icon color="info">mdi-order-alphabetical-descending</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ $t("categories.order_main_categories") }}</span>
                </v-tooltip>
                <v-tooltip bottom content-class="bottom">
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on" v-show="minimizedCategoryDialog" outlined color="primary"
                            @click="maximizeNewCategory()">
                            {{ $t("categories.restore_category") }}
                        </v-btn>
                    </template>
                    <span> {{ $t("categories.restore_category") }}</span>
                </v-tooltip>
                <v-btn depressed color="primary" @click="newCategory()">
                    <v-icon>mdi-plus</v-icon> {{ $t('categories.new_category') }}
                </v-btn>
            </v-col>
        </v-row>
        <v-card flat outlined class="card-table mt-4">
            <v-skeleton-loader class="mx-auto" type=" table: table-heading, table-thead, table-tbody, table-tfoot"
                :loading="loading">
                <v-data-table :items="categories" :headers="categoriesHeaders" :search="searchProductCategories"
                    sort-by="categoryid" sort-desc class="body-2">
                    <template v-slot:[`item.date`]="{ item }">
                        {{ $moment(item.date).format('DD-MM-YYYY HH:mm') }}
                    </template>
                    <template v-slot:[`item.description`]="{ item }">
                        {{ item.description.substring(0, 30) + '...' }}
                    </template>
                    <template v-slot:[`item.image`]="{ item }">
                        <v-img cover max-width="120px" max-height="40px"
                            :src="$config.storage + 'categories%2F' + item.image + '?alt=media'"
                            v-if="item.image"></v-img>
                    </template>
                    <template v-slot:[`item.imageMobile`]="{ item }">
                        <v-img cover max-width="120px" max-height="40px"
                            :src="$config.storage + 'categories%2F' + item.imageMobile + '?alt=media'"
                            v-if="item.imageMobile"></v-img>
                    </template>
                    <template v-slot:[`item.category`]="{ item }">
                        <strong v-if="item.isMain">Categoría principal</strong>
                        <span v-else>{{ item.category?.name }}</span>
                    </template>
                    <template v-slot:[`item.active`]="{ item }">
                        <v-chip :color="getStatusColor(item.active)" small>
                            <span v-if="item.active">Activa</span>
                            <span v-else>Inactiva</span>

                        </v-chip>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip top content-class="top" v-if="item.active">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="info" v-on="on" @click="orderCategories(item)"
                                    :disabled="!item.isMain">
                                    <v-icon color="info">mdi-order-alphabetical-descending</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("categories.order_categories") }}</span>
                        </v-tooltip>
                        <v-tooltip top content-class="top">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="primary" v-on="on" @click="updateCategory(item)"
                                    :disabled="item.status == 3">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("categories.edit_category") }}</span>
                        </v-tooltip>
                        <v-tooltip top content-class="top" v-if="!item.active">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="success" v-on="on" @click="activeCategory(item, true)">
                                    <v-icon color="success">visibility</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("categories.active_category") }}</span>
                        </v-tooltip>
                        <v-tooltip top content-class="top" v-if="item.active">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="error" v-on="on" @click="activeCategory(item, false)">
                                    <v-icon color="error">visibility_off</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("categories.deactive_category") }}</span>
                        </v-tooltip>
                        <v-tooltip top content-class="top">
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="error" v-on="on" @click="deleteCategory(item)"
                                    :disabled="item.status == 3">
                                    <v-icon color="error">delete</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ $t("categories.delete_category") }}</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </v-skeleton-loader>
        </v-card>
        <CategoriesOrderCategoriesDialog v-model="orderCategoriesDialog" :category="categorySelected"
            v-if="categorySelected" />
        <CategoriesOrderMainCategoriesDialog v-model="orderMainCategoriesDialog" />
        <CategoriesUpdateProductCategoryDialog v-model="updateCategoryDialog" :category="categorySelected" :user="user"
            v-if="categorySelected != null" @finish="fetchProductCategories()" @minimize="minimizeCategoryDialog()"
            @cancel="cancelCategoryDialog()" />
        <CategoriesNewProductCategoryDialog v-model="newCategoryDialog" :user="user" @finish="fetchProductCategories()"
            @minimize="minimizeCategoryDialog()" @cancel="cancelCategoryDialog()" />
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
            searchProductCategories: '',
            loading: false,
            newCategoryDialog: false,
            updateCategoryDialog: false,
            orderCategoriesDialog: false,
            orderMainCategoriesDialog: false,
            minimizedCategoryDialog: false,
            categoriesHeaders: [{
                text: 'Nombre',
                value: 'name',
            },
            {
                text: 'Imagen desktop',
                value: 'image',
            },
            {
                text: this.$t('category'),
                value: 'category',
            },
            {
                text: this.$t('status'),
                value: 'active',
            },
            {
                text: '',
                value: 'actions',
            }
            ],
            categorySelected: null,
            deletedProductCategories: null,
        }
    },
    computed: {
        ...mapGetters({
            categories: "categories/getProductCategories",
        }),
        user() {
            return this.$store.state.authUser;
        }
    },
    mounted() {
        this.fetchProductCategories()
    },
    methods: {
        fetchProductCategories() {
            this.$store.dispatch('categories/fetchAllProductCategories')
        },
        newCategory() {
            this.newCategoryDialog = true
        },
        async activeCategory(item, value) {
            await this.$fire.firestore.collection('product_categories').doc(item.id).update({
                active: value
            }).then(result => {
                this.fetchProductCategories()
                this.$snackbar.show({
                    text: 'Categoría actualizada',
                    color: 'success'
                })
            }, error => [
                this.$snackbar.show({
                    text: error,
                    color: 'error'
                })
            ])
        },
        minimizeCategoryDialog() {
            this.minimizedCategoryDialog = true
        },
        maximizeCategoryDialog() {
            this.newCategoryDialog = true
            this.minimizedCategoryDialog = false
        },
        cancelCategoryDialog() {
            this.minimizedCategoryDialog = false
            this.fetchProductCategories()
        },
        orderMainCategories() {
            this.orderMainCategoriesDialog = true
        },
        orderCategories(item) {
            this.categorySelected = item
            this.orderCategoriesDialog = true
        },
        updateCategory(item) {
            this.categorySelected = item
            this.updateCategoryDialog = true
        },
        deleteCategory(item) {
            this.$dialog.show({
                name: `${this.$t("confirm_dialog.delete_category")}`,
                text: ` ${this.$t("confirm_dialog.confirm_delete_category")}`,
                buttons: [{
                    text: this.$t("accept"),
                    color: "primary",
                    handle: () => {
                        this.$dialog.hide();
                        this.deleteCategoryConfirm(item)
                    },
                },],
            });
        },
        deleteCategoryConfirm(item) {
            const dateTime = new Date()
            this.$fire.firestore.collection('product_categories').doc(item.id).update({
                deletedAt: dateTime.toISOString()
            }).then(result => {
                this.$toasted.success('Categoría eliminada', {
                    theme: "bubble",
                    position: "top-right",
                    duration: 2000
                })
                this.fetchProductCategories()
            }, error => [
                this.$toasted.error(error, {
                    theme: "bubble",
                    position: "top-right",
                    duration: 2000
                })
            ])
        }
    }
}
</script>