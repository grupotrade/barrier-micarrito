<template>
    <v-dialog v-model="show" persistent width="950px">
        <v-toolbar dense flat color="primary" dark>
            <v-toolbar-title>{{ $t('products.edit_product') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom content-class="bottom">
                <template v-slot:activator="{ on }">
                    <v-btn depressed icon v-on="on" @click="minimizeProductDialog()">
                        <v-icon>mdi-window-minimize</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t("minimize") }}</span>
            </v-tooltip>
            <v-tooltip bottom content-class="bottom">
                <template v-slot:activator="{ on }">
                    <v-btn depressed icon v-on="on" @click="cancelProductDialog()">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t("cancel") }}</span>
            </v-tooltip>
        </v-toolbar>
        <v-card flat tile class="card-surface pt-2">
            <v-form v-model="validProduct" v-on:submit.prevent="updateProduct">
                <v-card-text>
                    <v-container>
                        <v-row dense>
                            <v-col>
                                <v-autocomplete label="Categoría" :items="categories" item-text="name" item-value="id"
                                    v-model="productEditable.category" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                                    <v-row dense>
                                        <v-col><v-text-field dense outlined class="body-1" background-color="foreground" required
                                    :rules="rulesGlobal.required" v-model="productEditable.name" label="Nombre"
                                    color="secondary"></v-text-field></v-col>
                                        <v-col>   <v-text-field dense outlined class="body-1" background-color="foreground" required
                                    :rules="rulesGlobal.required" v-model="productEditable.price" label="Precio"
                                    color="secondary"></v-text-field></v-col>
                                    </v-row>                               
                                 
                                    <v-textarea dense outlined class="body-1" background-color="foreground" required
                                    :rules="rulesGlobal.required" v-model="productEditable.description" label="Descripción"
                                    color="secondary"></v-textarea>
                                <p>Detalles</p>
                                <client-only>
                                    <VueEditor v-model="productEditable.details" :editor-toolbar="customToolbar"
                                        />
                                </client-only>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="4">
                                <h5 class="body-1 pa-3">Imagen portada</h5>
                                <v-file-input dense v-model="filePrincipal" placeholder="Seleccione su archivo"
                                    accept="image/*" color="secondary" background-color="foreground" outlined
                                    prepend-icon="mdi-paperclip" @change="onImagePrincipalPicked"
                                    :disabled="processing">
                                </v-file-input>
                                <v-row dense>
                                    <v-col cols="3">
                                        <span v-if="progress > 0 && progress < 100">Subiendo archivo...</span>
                                        <span v-if="progress == 100" class="success--text">Archivos subido</span>
                                    </v-col>
                                    <v-col>
                                        <v-progress-linear class="my-3" :value="progress" :buffer-value="100"
                                            :color="(progress == 100) ? 'success' : 'primary'"
                                            v-if="progress > 0 && progress < 100"></v-progress-linear>
                                    </v-col>
                                </v-row>
                                <v-row dense v-if="productEditable.imagePrincipal">
                                    <v-col cols="3">
                                        <v-btn icon small class="white float-right mt-n4 ml-n4 z-index1000"
                                            @click="removeImagePrincipal()">
                                            <v-icon small>close</v-icon>
                                        </v-btn>
                                        <v-img contain :src="productEditable.imagePrincipal" width=""></v-img>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="8">
                                <h5 class="body-1 pa-3">Galería</h5>
                                <v-file-input dense v-model="gallery" placeholder="Seleccione sus archivos"
                                    accept="image/*" color="secondary" background-color="foreground" outlined
                                    prepend-icon="mdi-paperclip" @change="onImagesPicked" :disabled="processing" multiple>
                                </v-file-input>
                                <v-row dense>
                                    <v-col cols="3">
                                        <span v-if="progress > 0 && progress < 100">Subiendo archivos...</span>
                                        <span v-if="progress == 100" class="success--text">Archivos subidos</span>
                                    </v-col>
                                    <v-col>
                                        <v-progress-linear class="my-3" :value="progress" :buffer-value="100"
                                            :color="(progress == 100) ? 'success' : 'primary'"
                                            v-if="progress > 0 && progress < 100"></v-progress-linear>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col cols="3" v-for="image in productEditable.images" :key="image">
                                        <v-btn icon small class="white float-right mt-n4 ml-n4 z-index1000"
                                            @click="removeImage(image)">
                                            <v-icon small>close</v-icon>
                                        </v-btn>
                                        <v-img contain :src="image" width=""></v-img>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <h5 class="body-1 pa-3">Relacionar productos</h5>
                        <v-row dense>
                            <v-col>
                                <v-autocomplete label="Seleccionar producto a relacionar" :items="products" item-text="name"
                                    item-value="id" v-model="relations.a" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete label="Seleccionar producto a relacionar" :items="products" item-text="name"
                                    item-value="id" v-model="relations.b" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete label="Seleccionar producto a relacionar" :items="products" item-text="name"
                                    item-value="id" v-model="relations.c" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete label="Seleccionar producto a relacionar" :items="products" item-text="name"
                                    item-value="id" v-model="relations.d" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center background">
                    <v-btn large color="primary" type="submit" :disabled="!validProduct || processing" depressed>{{
                        $t('save') }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    props: {
        value: {
            type: Boolean
        },
        product: {
            type: Object,
            required: true
        },
        products: {
            type: Array
        }
    },
    model: {
        event: `modified`
    },
    data() {
        return {
            validProduct: false,
            processing: false,
            fileURL: null,
            progress: 0,
            files: [],
            images: [],
            imagePrincipal: null,
            filePrincipal: null,
            gallery: null,
            relations: {
                a: null,
                b: null,
                c: null,
                d: null
            },
            relationProducts: [],
            customToolbar: [[{
                header: [false, 1, 2, 3, 4, 5, 6]
            }], ["bold", "italic", "underline", "strike"], // toggled buttons
            [{
                align: ""
            }, {
                align: "center"
            }, {
                align: "right"
            }, {
                align: "justify"
            }], ["blockquote", "code-block"], [{
                list: "ordered"
            }, {
                list: "bullet"
            }, {
                list: "check"
            }], [{
                indent: "-1"
            }, {
                indent: "+1"
            }], // outdent/indent
            [{
                color: []
            }, {
                background: []
            }], // dropdown with defaults from theme
            ["link"], ["clean"] // remove formatting button
            ]
        }
    },
    watch: {
        relations: {
            deep: true,
            handler(newVal) {
                this.relationProducts = Object.values(newVal).filter(value => value !== null && value !== "");
            },
        },
        show(newVal) {
            if (newVal) {
                // Verificar si relationsProducts existe y no está vacío en el producto
                if (this.productEditable.relations && this.productEditable.relations.length > 0) {
                    this.relationProducts = this.productEditable.relations; // Asigna el valor recuperado desde la base de datos

                    // Asignar los valores del array a cada autocompletado
                    Object.keys(this.relations).forEach((key, index) => {
                        this.relations[key] = this.relationProducts[index] || null;
                    });
                }
            }
        },
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
        ...mapGetters({
            categories: "categories/getProductCategories"
        }),
        filteredCategories() {
            return this.categories.filter(item => !item.isMain);
        },
        productEditable: {
            get() {
                return this.deepCopy(this.product)
            },
        }
    },
    created() {
        // Verificar si relationsProducts existe y no está vacío en el producto
        if (this.productEditable.relations && this.productEditable.relations.length > 0) {
            this.relationProducts = this.productEditable.relations; // Asigna el valor recuperado desde la base de datos

            // Asignar los valores del array a cada autocompletado
            Object.keys(this.relations).forEach((key, index) => {
                this.relations[key] = this.relationProducts[index] || null;
            });
        }
    },
    methods: {
        minimizeProductDialog() {
            this.$emit("minimize");
            this.show = false;
        },
        cancelProductDialog() {
            this.$dialog.show({
                name: `${this.$t("confirm_dialog.cancel_edit_product")}`,
                text: `${this.$t("confirm_dialog.confirm_cancel")} ${this.$t(
                    "confirm_dialog.edit_product"
                )}`,
                buttons: [{
                    text: this.$t("accept"),
                    color: "primary",
                    handle: () => {
                        this.$dialog.hide();
                        this.show = false;
                        this.$emit("cancel");
                        this.relationProducts = []
                        this.relations = {
                            a: null,
                            b: null,
                            c: null,
                            d: null
                        }
                    },
                },],
            });
        },
        updateProduct() {
            this.$fire.firestore.collection('products').doc(this.productEditable.id).update({
                relations: this.relationProducts,
                name: this.productEditable.name,
                category: this.productEditable.category,
                description: this.productEditable.description,
                details: this.productEditable.details,
                price: this.productEditable.price,
                images: this.productEditable.images,
                imagePrincipal: this.productEditable.imagePrincipal
            }).then(result => {
                this.$toasted.success('Producto editado', {
                    theme: "bubble",
                    position: "top-right",
                    duration: 2000
                })
                this.show = false,
                    this.$emit('finish')
                this.relationProducts = []
                this.relations = {
                    a: null,
                    b: null,
                    c: null,
                    d: null
                }
            }, error => [
                this.$toasted.error(error, {
                    theme: "bubble",
                    position: "top-right",
                    duration: 2000
                })
            ])

        },
        async onImagesPicked(files) {
            this.images = []
            for (let file of files) {
                this.images.push(file)
           }
            this.uploadImagesToFirebase()
        },
        async onImagePrincipalPicked(file) {
            this.imagePrincipal = []
            this.imagePrincipal = file
            this.uploadImagePrincipalToFirebase()
        },
        async uploadImagePrincipalToFirebase() {
            this.productEditable.imagePrincipal = null
            this.processing = true
            let image = this.imagePrincipal
            const filePath = `${Date.now()}-${image.name}`;
            var storageRef = await this.$fire.storage.ref('products').child(filePath)
            let uploadTask = storageRef.put(image)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.progress = progress
                this.progress = 0
            },
                (error) => {
                    console.log(error);
                })
            uploadTask.then(
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        this.productEditable.imagePrincipal = downloadURL
                    })
                    this.processing = false
                }
            )

        },
        async uploadImagesToFirebase() {
            this.productEditable.images = []
            this.processing = true
            for (let image of this.images) {
                const filePath = `${Date.now()}-${image.name}`;
                var storageRef = await this.$fire.storage.ref('products').child(filePath)
                let uploadTask = storageRef.put(image)
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.progress = progress
                    this.progress = 0
                },
                    (error) => {
                        console.log(error);
                    })
                uploadTask.then(
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.productEditable.images.push(downloadURL);
                        })
                        this.processing = false
                    }
                )

            }
        },
        removeImage(image) {
            const indexOf = this.productEditable.images.indexOf(image)
            if (indexOf > -1) {
                this.productEditable.images.splice(indexOf, 1)
                this.images.splice(indexOf, 1)
                if (this.images.length == 0) {
                    this.gallery = null
                }
            }
        },
        removeImagePrincipal() {
            this.productEditable.imagePrincipal = null
            this.imagePrincipal = null
            this.filePrincipal = null
        },
    }
}
</script>
