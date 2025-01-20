<template>
    <div>
        <v-navigation-drawer v-model="menuMobile" dark color="primary_darken" clipped app disable-resize-watcher>
            <a  @click="$router.push('/')">
                <CommonLogoH dark class="ma-6" width="190" />
            </a>
            <v-list class="transparent">
                <v-list-item @click="navigateToAnchor('categorias')">Home</v-list-item>
                <v-list-item @click="navigateToAnchor('porque')">Servicios</v-list-item>
                <v-list-item @click="navigateToAnchor('pasos')">Productos</v-list-item>
                <v-list-item @click="navigateToAnchor('testimonios')">Nosotros</v-list-item> 
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed color="app-bar-site" flat height="78" v-if="!$vuetify.breakpoint.xs">
            <v-container fluid class="container-inner py-3 mx-auto">
                <v-row>
                    <v-col cols="12" md="4">
                        <a  @click="$router.push('/')">
                            <CommonLogoH class="mr-4" />
                        </a>
                    </v-col>
                    <v-col cols="12" md="8" class="d-flex justify-end align-center">
                        <v-btn text class="mx-2" color="secondary_text" @click="navigateTo('/')">Home</v-btn>
            <v-btn text class="mx-2" color="secondary_text" @click="navigateTo('/servicios')">Servicios</v-btn>
                        <v-btn text class="mx-2" color="secondary_text" @click="navigateTo('/productos')">Productos</v-btn>
                        <v-btn text class="mx-2" color="secondary_text" @click="navigateTo('/nosotros')">Nosotros</v-btn> 
                    </v-col>
                </v-row>
            <!-- <v-spacer />
            <v-btn text class="mx-2" color="secondary_text" @click="openCart"><v-icon
                    class="secondary_text--text">mdi-cart-outline</v-icon>
                <v-badge v-if="cart && cart.length > 0" color="secondary" :content="cart.length"></v-badge></v-btn> -->
            <!-- <v-autocomplete v-model="productSelected" hide-details outlined rounded prepend-inner-icon="mdi-magnify"
                label="Busqueda rápida" class="transparent" return-object :items="searchResults" dense
                :loading="loadingSearchResults" :search-input.sync="searchTerm" item-text="name" @change="viewProduct()"
                item-value="id">
                <template v-slot:no-data>
                    <p class="grey--text ml-2 pa-2 mb-0">
                        Escribí el nombre de la lámina
                    </p>
                </template>
</v-autocomplete> -->

            <!-- <v-tooltip bottom content-class="bottom" v-if="!this.$vuetify.theme.dark">
            <template v-slot:activator="{ on }">
                <v-btn icon @click.stop="toggleTheme" v-on="on">
                    <v-icon color="secondary_text_dark" >dark_mode</v-icon>
                </v-btn>
            </template>
            <span>{{ $t('change_to_theme_dark')}}</span>
        </v-tooltip>
        <v-tooltip bottom content-class="bottom" v-else>
            <template v-slot:activator="{ on }">
                <v-btn icon @click.stop="toggleTheme" v-on="on">
                    <v-icon color="secondary_text" >light_mode</v-icon>
                </v-btn>
            </template>
            <span>{{ $t('change_to_theme_light')}}</span>
        </v-tooltip> -->
            <!-- <v-btn fab class="body-2 mr-3 primary--text" depressed @click="userDrawer = !userDrawer" v-if="user.displayName">
            <v-badge bordered bottom color="success" class="float-right" dot offset-x="10" offset-y="10">
                <CommonAvatar :alt="user.displayName" size="40" />
            </v-badge>
        </v-btn>
        <v-btn text @click="openLogin" v-else>
            Ingresar
        </v-btn> -->
            <v-app-bar-nav-icon @click.stop="menuMobile = !menuMobile" class="d-xs-block d-md-none" />
            </v-container>

        </v-app-bar>
        
        <v-app-bar app fixed color="app-bar-site" height="78" dark v-else>
            <CommonLogoH :width="140" />
            <v-spacer></v-spacer>
            <v-btn text class="mx-2" @click="openCart"><v-icon class="secondary--text">mdi-cart-outline</v-icon><v-badge
                    v-if="cart && cart.length > 0" color="secondary" :content="cart.length"></v-badge></v-btn>
            <v-app-bar-nav-icon @click.stop="menuMobile = !menuMobile" class="d-xs-block d-md-none" color="black" />
                    <v-divider></v-divider>

        </v-app-bar>

        <DialogsLogin v-model="loginDialog" @openRegister="openRegister" />
        <ProductsViewProductDialog v-model="viewProductDialog" :product="productSelected"
            v-if="productSelected != null" />
        <!-- <LayoutUserOptionsDrawer v-model="userDrawer" :user="user" :userName="user.displayName" :userRole="user.role" v-if="user.displayName" /> -->
        <ProductsCartDrawer v-model="cartDrawer" :cart="cart" />
    </div>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    props: {
        user: {
            type: Object,
            required: true,
            default: null
        },
    },
    data() {
        return {
            menuMobile: false,
            userDrawer: false,
            cartDrawer: false,
            loginDialog: false,
            registerDialog: false,
            searchTerm: '',
            loadingSearchResults: false,
            viewProductDialog: false,
            productSelected: null,
            productList: []
        }
    },
    computed: {
        ...mapGetters({
            cart: "cart/getCart",
            searchResults: "products/getSearchResults",
        })
    },
    watch: {
        searchTerm(value) {
            if (!value || value.length <= 3) return;
            this.loadingSearchResults = true;
            this.$store.dispatch('products/searchProducts', value)
        },

    },
    methods: {
        viewProduct() {
            this.viewProductDialog = true
        },
        openRegister() {
            this.registerDialog = true
        },
        openCart() {
            this.cartDrawer = true
        },
        openLogin() {
            this.loginDialog = true
        },
        toggleTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
        },
        toggleThemeDark() {
            this.$vuetify.theme.dark = true
        },
        logout() {
            this.$store.dispatch('users/logout').then(result => {
                window.location.href = '/'
            }, error => {
               
            })
        }
    }
}
</script>
