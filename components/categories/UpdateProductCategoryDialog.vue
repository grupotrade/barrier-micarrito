<template>
    <v-dialog v-model="show" persistent width="950px">
        <v-toolbar dense flat color="primary" dark>
            <v-toolbar-title>{{ $t('categories.edit_category') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom content-class="bottom">
                <template v-slot:activator="{ on }">
                    <v-btn depressed icon v-on="on" @click="minimizeCategoryDialog()">
                        <v-icon>mdi-window-minimize</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t("minimize") }}</span>
            </v-tooltip>
            <v-tooltip bottom content-class="bottom">
                <template v-slot:activator="{ on }">
                    <v-btn depressed icon v-on="on" @click="cancelCategoryDialog()">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t("cancel") }}</span>
            </v-tooltip>
        </v-toolbar>
        <v-card flat tile class="card-surface pt-2">
            <v-form v-model="validCategory" v-on:submit.prevent="updateCategory">
                <v-card-text>
                    <v-container>
                        <v-row dense>
                            <v-col>
                                <v-text-field dense outlined class="body-1" background-color="foreground" required
                                    :rules="rulesGlobal.required" v-model="categoryEditable.name" label="Nombre"
                                    color="secondary"></v-text-field>
                                <v-select dense outlined class="body-1" background-color="foreground"
                                    v-model="categoryEditable.category" :items="categories" return-object item-text="name"
                                    label="Categoria principal" color="secondary"
                                    :disabled="categoryEditable.isMain"></v-select>
                                <v-textarea dense outlined class="body-1" background-color="foreground"
                                    v-model="categoryEditable.description" label="Descripción"
                                    color="secondary"></v-textarea>
                                <v-switch label="Es categoria principal" v-model="categoryEditable.isMain"></v-switch>

                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <h5 class="body-1 pa-3">Imagen desktop</h5>
                                <v-file-input dense v-model="categoryEditable.file" placeholder="Seleccione su archivos"
                                    accept="image/*" color="secondary" background-color="foreground" outlined
                                    prepend-icon="mdi-paperclip" @change="fileInput" :disabled="processingImg">
                                </v-file-input>
                                <v-row dense>
                                    <v-col cols="3">
                                        <span v-if="progress > 0 && progress < 100">Subiendo archivo...</span>
                                        <span v-if="progress == 100" class="success--text">Archivo subido</span>
                                    </v-col>
                                    <v-col>
                                        <v-progress-linear class="my-3" :value="progress" :buffer-value="100"
                                            :color="(progress == 100) ? 'success' : 'primary'"
                                            v-if="progress > 0 && progress < 100"></v-progress-linear>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col>
                                <h5 class="body-1 pa-3">Imagen mobile</h5>
                                <v-file-input dense v-model="categoryEditable.fileMobile"
                                    placeholder="Seleccione su archivos" accept="image/*" color="secondary"
                                    background-color="foreground" outlined prepend-icon="mdi-paperclip"
                                    @change="fileInputMobile" :disabled="processingImg">
                                </v-file-input>
                                <v-row dense>
                                    <v-col cols="3">
                                        <span v-if="progress > 0 && progress < 100">Subiendo archivo...</span>
                                        <span v-if="progress == 100" class="success--text">Archivo subido</span>
                                    </v-col>
                                    <v-col>
                                        <v-progress-linear class="my-3" :value="progress" :buffer-value="100"
                                            :color="(progress == 100) ? 'success' : 'primary'"
                                            v-if="progress > 0 && progress < 100"></v-progress-linear>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="justify-center background">
                    <v-btn large color="primary" type="submit" :disabled="!validCategory || processingImg" depressed>{{
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
        category: {
            type: Object,
            required: true
        },
    },
    model: {
        event: `modified`
    },
    data() {
        return {
            validCategory: false,
            processingImg: false,
            fileURL: null,
            progress: 0,
            newImagePath: null,
            newImageMobilePath: null
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
        ...mapGetters({
            categories: "categories/getProductMainCategories"
        }),
        categoryEditable: {
            get() {
                return this.deepCopy(this.category)
            },
        }
    },
    watch: {
        value: {
            handler(val) {
                console.log('Value prop changed:', val);
                if (val) {
                    this.listProductCategories();
                }
            },
            immediate: true, // This will trigger the watch handler immediately when the component is mounted
        }
    },
    methods: {
        listProductCategories() {
            this.$store.dispatch('categories/fetchProductMainCategories')
        },
        minimizeCategoryDialog() {
            this.$emit("minimize");
            this.show = false;
        },
        cancelCategoryDialog() {
            this.$dialog.show({
                name: `${this.$t("confirm_dialog.cancel_edit_category")}`,
                text: `${this.$t("confirm_dialog.confirm_cancel")} ${this.$t(
                    "confirm_dialog.edit_category"
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
        updateCategory() {
            if (this.newImagePath != null) {
                this.categoryEditable.image = this.newImagePath
            }
            if (this.newImageMobilePath != null) {
                this.categoryEditable.imageMobile = this.newImageMobilePath
            }
            let categorySelected = {}
            if (!this.categoryEditable.isMain) {
                categorySelected = {
                    id: this.categoryEditable.category?.id || '',
                    name: this.categoryEditable.category?.name || ''
                }
            } 
            this.$fire.firestore.collection('product_categories').doc(this.categoryEditable.id).update({
                name: this.categoryEditable.name,
                category: categorySelected || null,
                description: this.categoryEditable.description || '',
                image: this.categoryEditable.imagePath || '',
                isMain: this.categoryEditable.isMain || false,
                imageMobile: this.categoryEditable.imageMobilePath || ''
            }).then(result => {
                this.$toasted.success('Categoría editada', {
                    theme: "bubble",
                    position: "top-right",
                    duration: 2000
                })
                this.show = false,
                    this.$emit('finish')
            }, error => [
                this.$toasted.error(error, {
                    theme: "bubble",
                    position: "top-right",
                    duration: 2000
                })
            ])

        },
        async fileInput(file) {
            try {
                if (file && file.name) {
                    this.processingImg = true;
                    this.processingImg = true;
                    const filePath = `${Date.now()}-${file.name}`;
                    this.categoryEditable.imagePath = filePath
                    await this.$fire.storage.ref()
                        .child('categories')
                        .child(filePath)
                        .put(file);
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.processingImg = false;
            }
        },
        async fileInputMobile(file) {
            try {
                if (file && file.name) {
                    this.processingImg = true;
                    const filePath = `${Date.now()}-${file.name}`;
                    this.categoryEditable.imageMobilePath = filePath
                    await this.$fire.storage.ref()
                        .child('categories')
                        .child(filePath)
                        .put(file);
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.processingImg = false;
            }
        }


    }
}
</script>
