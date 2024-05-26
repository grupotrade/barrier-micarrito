<template>
    <div>
        <v-navigation-drawer v-model="menuMobile" dark color="primary_darken" clipped app disable-resize-watcher>
            <a  @click="$router.push('/')">
                <CommonLogoH dark class="ma-6" width="190" />
            </a>
            <v-list class="transparent">
                <v-list-item @click="navigateToAnchor('categorias')">Colecciones</v-list-item>
                <v-list-item @click="navigateToAnchor('porque')">Sobre nosotros</v-list-item>
                <v-list-item @click="navigateToAnchor('pasos')">Cómo funciona</v-list-item>
                <!-- <v-list-item @click="navigateToAnchor('testimonios')">Testimonios</v-list-item> -->
                <v-list-item target="_blank"
                    href="https://api.whatsapp.com/send?phone=5491126117588&text=Hola,%20estoy%20visitando%20tu%20tienda%20online%20y%20me%20gustar%C3%ADa%20consultarte%20por">Contacto</v-list-item>
                <v-list-item @click="$router.push('/blog')">Blog</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed color="app-bar-site" flat height="78" v-if="!$vuetify.breakpoint.xs">
            <a  @click="$router.push('/')">
                <CommonLogoH class="mr-4" />
            </a>
            <v-spacer />
            <v-btn text class="mx-2" color="secondary_text" @click="navigateToAnchor('categorias')">Colecciones</v-btn>
            <v-btn text class="mx-2" color="secondary_text" @click="navigateToAnchor('porque')">Sobre nosotros</v-btn>
            <v-btn text class="mx-2" color="secondary_text" @click="navigateToAnchor('pasos')">Cómo funciona</v-btn>
            <!-- <v-btn text class="mx-2" color="secondary_text" @click="navigateToAnchor('testimonios')">Testimonios</v-btn> -->
            <v-btn text class="mx-2" color="secondary_text" target="_blank"
                href="https://api.whatsapp.com/send?phone=5491126117588&text=Hola,%20estoy%20visitando%20tu%20tienda%20online%20y%20me%20gustar%C3%ADa%20consultarte%20por">Contacto</v-btn>
            <v-btn text class="mx-2" color="secondary_text" @click="$router.push('/blog')">blog</v-btn>
            <v-spacer />
            <v-btn text class="mx-2" color="secondary_text" @click="openCart"><v-icon
                    class="secondary_text--text">mdi-cart-outline</v-icon>
                <v-badge v-if="cart && cart.length > 0" color="secondary" :content="cart.length"></v-badge></v-btn>
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
        </v-app-bar>
        <v-app-bar app fixed color="app-bar-site" height="78" dark v-else>
            <CommonLogoH :width="140" />
            <v-spacer></v-spacer>
            <v-btn text class="mx-2" @click="openCart"><v-icon class="secondary--text">mdi-cart-outline</v-icon><v-badge
                    v-if="cart && cart.length > 0" color="secondary" :content="cart.length"></v-badge></v-btn>
            <v-app-bar-nav-icon @click.stop="menuMobile = !menuMobile" class="d-xs-block d-md-none" color="black" />
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
        },
        navigateToAnchor(anchor) {
            if (this.$route.path !== '/') {
                this.$router.push('/')
                    setTimeout(() => {
                        this.scrollToId(anchor);

        }, 700);
               
            } else {
                this.scrollToId(anchor);
            }
        },
    }
}
</script>
