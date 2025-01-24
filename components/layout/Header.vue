<template>
    <div>
        <v-navigation-drawer v-model="menuMobile" dark color="primary_darken" clipped app disable-resize-watcher>
            <a  @click="$router.push('/')">
                <CommonLogoH dark class="ma-6" width="190" />
            </a>
            <v-list class="transparent">
                <v-list-item @click="navigateTo('/')">Home</v-list-item>
                <v-list-item @click="navigateTo('/servicios')">Servicios</v-list-item>
                <!-- <v-list-item @click="navigateTo('/productos')">Productos</v-list-item> -->
                <v-list-item @click="navigateTo('/nosotros')">Nosotros</v-list-item> 
            </v-list>
        </v-navigation-drawer>
        <v-container fluid style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000;" class="pt-2 pb-1 grey lighten-4">
                
                <p class="mb-0 text-right pr-12 body-2">O'Higgins 910   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (+5411) 4662-6140</p>
           
       
        </v-container>
        <v-app-bar app fixed color="app-bar-site" flat height="95"  class="mt-8" v-if="!$vuetify.breakpoint.xs">
           
            <v-container fluid class="container-inner mx-auto">
                <v-row>
                    <v-col cols="12" md="4">
                        <a  @click="$router.push('/')">
                            <CommonLogoH class="mr-4" />
                        </a>
                    </v-col>
                    <v-col cols="12" md="8" class="d-flex justify-end align-center">
                        <v-btn text class="mx-2" color="secondary_text" @click="navigateTo('/')">Home</v-btn>
            <v-btn text class="mx-2" color="secondary_text" @click="navigateTo('/servicios')">Servicios</v-btn>
                        <!-- <v-btn text class="mx-2" color="secondary_text" @click="navigateTo('/productos')">Productos</v-btn> -->
                        <v-btn text class="mx-2" color="secondary_text" @click="navigateTo('/nosotros')">Nosotros</v-btn> 
                    </v-col>
                </v-row>
            <v-app-bar-nav-icon @click.stop="menuMobile = !menuMobile" class="d-xs-block d-md-none" />
            </v-container>

        </v-app-bar>
        
        <v-app-bar app fixed color="app-bar-site" height="78" dark v-else>
            <CommonLogoH :width="150" />
            <v-spacer></v-spacer>
            <!-- <v-btn text class="mx-2" @click="openCart"><v-icon class="secondary--text">mdi-cart-outline</v-icon><v-badge
                    v-if="cart && cart.length > 0" color="secondary" :content="cart.length"></v-badge></v-btn> -->
            <v-app-bar-nav-icon @click.stop="menuMobile = !menuMobile" class="d-xs-block d-md-none mr-4" color="black" />
                   

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
