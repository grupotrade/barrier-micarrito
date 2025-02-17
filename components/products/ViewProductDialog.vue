<template>
<v-dialog v-model="show" width="450px">
    <v-toolbar flat class="primary" dark dense>
        <v-spacer></v-spacer>
        <v-tooltip bottom content-class="bottom">
            <template v-slot:activator="{ on }">
                <v-btn depressed icon v-on="on" @click.stop="show = false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </template>
            <span>{{$t('close')}}</span>
        </v-tooltip>
    </v-toolbar>
    <v-card flat tile class="px-2 pb-2">
      
        <v-img :src="product.imagePrincipal" height="350px" cover v-if="product.imagePrincipal"></v-img>
        <div class="d-flex" v-if="product.images.length > 0">
        <v-img :src="image" width="80px" height="80px" cover v-for="image in product.images" :key="image" class="mr-2"></v-img>
        </div>
       <h4 class="secondary_text--text">{{product.name}}</h4>
       <p>Descripción:{{product.description}}</p>
       <p>Precio: ${{product.price}}</p>
       <p v-html="product.details"></p>
       <v-btn @click="downloadFile(product.files.manual)" color="primary" small rounded depressed class="mr-2">Descargar manual</v-btn>
       <v-btn @click="downloadFile(product.files.folleto)" color="primary" small rounded depressed>Descargar folleto</v-btn>
       

    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean
        },
        product: {
            type: Object,
            require: true
        }
    },
    model: {
        event: `modified`
    },
    data() {
        return {
            imageGallery: null
        }
    },
    computed: {
        show: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit("modified", val);
            }
        },
    },
    methods: {
        downloadFile(file) {
            window.open(file, '_blank')
        }
    }
}
</script>

<style>
.card-thumbnail {
    opacity: 0.6 !important;
}

.card-thumbnail-active {
    opacity: 1 !important;
}
</style>
