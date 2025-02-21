<template>
    <v-dialog v-model="show" width="950px">
        <v-toolbar dense flat color="primary" dark>
            <v-toolbar-title>{{ $t('products.new_product') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom content-class="bottom">
                <template v-slot:activator="{ on }">
                    <v-btn depressed icon v-on="on" @click="minimizeNewProductDialog()">
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
            <v-form v-model="validProduct" v-on:submit.prevent="saveProduct">
                <v-card-text>
                    <v-container>
                        <v-row dense>
                            <v-col>
                                <v-autocomplete label="Categoría" :items="categories" item-text="name" item-value="id"
                                    v-model="product.category" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                                <v-row dense>
                                    <v-col><v-text-field dense outlined class="body-1" background-color="foreground"
                                            required :rules="rulesGlobal.required" v-model="product.name" label="Nombre"
                                            color="secondary"></v-text-field></v-col>
                                    <v-col> <v-text-field dense outlined class="body-1" background-color="foreground"
                                            v-model="product.price" label="Precio"
                                            color="secondary"></v-text-field></v-col>
                                </v-row>
                                <v-textarea dense outlined class="body-1" background-color="foreground" required
                                    :rules="rulesGlobal.required" v-model="product.description" label="Descripción"
                                    color="secondary"></v-textarea>
                                <p>Detalles</p>
                                <client-only>
                                    <VueEditor v-model="product.details" :editor-toolbar="customToolbar" />
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
                                        <span v-if="progressImages > 0 && progressImages < 100">Subiendo archivo...</span>
                                        <span v-if="progressImages == 100" class="success--text">Archivo subido</span>
                                    </v-col>
                                    <v-col>
                                        <v-progress-linear class="my-3" :value="progressImages" :buffer-value="100"
                                            :color="(progressImages == 100) ? 'success' : 'primary'"
                                            v-if="progressImages > 0 && progressImages < 100"></v-progress-linear>
                                    </v-col>
                                </v-row>
                                <v-row dense v-if="product.imagePrincipal">
                                    <v-col cols="3">
                                        <v-btn icon small class="white float-right mt-n4 ml-n4 z-index1000"
                                            @click="removeImagePrincipal()">
                                            <v-icon small>close</v-icon>
                                        </v-btn>
                                        <v-img contain :src="product.imagePrincipal" width=""></v-img>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="8">
                                <h5 class="body-1 pa-3">Galería</h5>
                                <v-file-input dense v-model="files" placeholder="Seleccione sus archivos"
                                    accept="image/*" color="secondary" background-color="foreground" outlined
                                    prepend-icon="mdi-paperclip" @change="onImagesPicked" :disabled="processing"
                                    multiple>
                                </v-file-input>
                                <v-row dense>
                                    <v-col cols="3">
                                        <span v-if="progressImages > 0 && progressImages < 100">Subiendo archivos...</span>
                                        <span v-if="progressImages == 100" class="success--text">Archivos subidos</span>
                                    </v-col>
                                    <v-col>
                                        <v-progress-linear class="my-3" :value="progressImages" :buffer-value="100"
                                            :color="(progressImages == 100) ? 'success' : 'primary'"
                                            v-if="progressImages > 0 && progressImages < 100"></v-progress-linear>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col cols="3" v-for="image in product.images" :key="image">
                                        <v-btn icon small class="white float-right mt-n4 ml-n4 z-index1000"
                                            @click="removeImage(image)">
                                            <v-icon small>close</v-icon>
                                        </v-btn>
                                        <v-img contain :src="image" width=""></v-img>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <h5 class="body-1 pa-3">Archivos descargables</h5>
                        <v-row dense>
                           
                            <v-col cols="6">
                              
                                <v-file-input dense v-model="product.files.manual" placeholder="Seleccione su archivo" label="Manual"
                                    accept="application/pdf" color="secondary" background-color="foreground" outlined
                                    prepend-icon="mdi-paperclip" @change="onFileManualPicked"
                                    :disabled="processing">
                                </v-file-input>
                                </v-col>
                                <v-col cols="6">
                              
                              <v-file-input dense v-model="product.files.folleto" placeholder="Seleccione su archivo" label="Folleto"
                                  accept="application/pdf" color="secondary" background-color="foreground" outlined
                                  prepend-icon="mdi-paperclip" @change="onFileFolletoPicked"
                                  :disabled="processing">
                              </v-file-input>
                              </v-col>
                                </v-row>

                        <h5 class="body-1 pa-3">Relacionar productos</h5>
                        <v-row dense>
                            <v-col>
                                <v-autocomplete label="Seleccionar producto a relacionar" :items="products"
                                    item-text="name" item-value="id" v-model="relations.a" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete label="Seleccionar producto a relacionar" :items="products"
                                    item-text="name" item-value="id" v-model="relations.b" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete label="Seleccionar producto a relacionar" :items="products"
                                    item-text="name" item-value="id" v-model="relations.c" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete label="Seleccionar producto a relacionar" :items="products"
                                    item-text="name" item-value="id" v-model="relations.d" dense outlined class="body-1"
                                    background-color="foreground"></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center background">
                    <v-btn large color="primary" type="submit" :disabled="!validProduct || processing" depressed>{{
                        $t('save')
                        }}</v-btn>
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
        user: {
            type: Object
        },
        value: {
            type: Boolean
        },
        products: {
            type: Array
        },
    },
    model: {
        event: `modified`
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
        })

    },
    data() {
        return {
            validProduct: false,
            processing: false,
            fileURL: null,
            progressFiles: 0,
            progressImages: 0,
            filePrincipal: null,
            files: null,
            images: [],
            imagePrincipal: null,
            product: {
                name: '',
                price: null,
                details: '',
                category: null,
                description: '',
                images: [],
                imagePrincipal: null,
                files: {
                    manual: null,
                    folleto: null
                }
            },
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
    },
    methods: {
        minimizeNewProductDialog() {
            this.$emit("minimize");
            this.show = false;
        },
        cancelProductDialog() {
            this.$dialog.show({
                name: `${this.$t("confirm_dialog.cancel_new_product")}`,
                text: `${this.$t("confirm_dialog.confirm_cancel")} ${this.$t(
                    "confirm_dialog.new_product"
                )}`,
                buttons: [{
                    text: this.$t("accept"),
                    color: "primary",
                    handle: () => {
                        this.$dialog.hide();
                        this.show = false;
                        this.$emit("cancel");
                    },
                },],
            });
        },
        saveProduct: function (e) {
            e.preventDefault()
            const productsRef = this.$fire.firestore.collection("products")
            const dateTime = new Date()
            productsRef.add({
                relations: this.relationProducts,
                name: this.product.name,
                price: this.product.price,
                details: this.product.details,
                category: this.product.category,
                description: this.product.description,
                images: this.product.images,
                imagePrincipal: this.product.imagePrincipal,
                date: dateTime.toISOString(),
                deletedAt: null,
                onHome: false,
                status: 1,
                user: {
                    name: this.user.displayName,
                    id: this.user.uid
                },
                files: this.product.files
            },)
            this.product = {
                name: '',
                price: '',
                category: null,
                description: '',
                details: '',
                images: [],
                imagePrincipal: null,
                files: {
                    manual: null,
                    folleto: null
                }
            }
            this.imagePrincipal = null
            this.relationProducts = []
            this.success = true
            this.images = []
            this.show = false;
            this.$emit('finish', this.user)
            this.$toasted.success('Producto cargado', {
                theme: "bubble",
                position: "top-right",
                duration: 2000
            })
        },
        async onImagesPicked(files) {
            this.images = []
            for (let file of files) {
                this.images.push(file)
            }
            this.uploadImagesToFirebase()
        },
        async onImagePrincipalPicked(file) {
            this.imagePrincipal = null
            this.imagePrincipal = file
            this.uploadImagePrincipalToFirebase()
        },
        async uploadImagePrincipalToFirebase() {
            this.product.imagePrincipal = null
            this.processing = true
            let image = this.imagePrincipal
            const filePath = `${Date.now()}-${image.name}`;
            var storageRef = await this.$fire.storage.ref('products').child(filePath)
            let uploadTask = storageRef.put(image)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.progressImages = progress
                this.progressImages = 0
            },
                (error) => {
                    console.log(error);
                })
            uploadTask.then(
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        this.product.imagePrincipal = downloadURL
                    })
                    this.processing = false
                }
            )

        },
        async uploadImagesToFirebase() {
            this.product.images = []
            this.processing = true
            for (let image of this.images) {
                const filePath = `${Date.now()}-${image.name}`;
                var storageRef = await this.$fire.storage.ref('products').child(filePath)
                let uploadTask = storageRef.put(image)
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.progressImages = progress
                    this.progressImages = 0
                },
                    (error) => {
                        console.log(error);
                    })
                uploadTask.then(
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.product.images.push(downloadURL);
                        })
                        this.processing = false
                    }
                )

            }
        },
        async onFileManualPicked(file) {
            this.product.files.manual = file
            this.uploadFileToFirebase(file, 'manual')
        },
        async onFileFolletoPicked(file) {
            this.product.files.folleto = file
            this.uploadFileToFirebase(file, 'folleto')
        },
        async uploadFileToFirebase(file, type) {
            this.processing = true
            const filePath = `${Date.now()}-${file.name}`;
            var storageRef = await this.$fire.storage.ref('products').child(filePath)
            let uploadTask = storageRef.put(file)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.progressFiles = progress
            })
            uploadTask.then(
                () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.product.files[type] = downloadURL;
                        })
                        this.processing = false
                }
            )
        },
        removeImage(image) {
            const indexOf = this.product.images.indexOf(image)
            if (indexOf > -1) {
                this.product.images.splice(indexOf, 1)
                this.images.splice(indexOf, 1)
                if (this.images.length == 0) {
                    this.product.file = null
                }
            }
        },
        removeImagePrincipal() {
            this.imagePrincipal = null
        }
    }
}
</script>
