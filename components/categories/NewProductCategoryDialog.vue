<template>
    <v-dialog v-model="show" width="950px">
        <v-toolbar dense flat color="primary" dark>
            <v-toolbar-title>{{ $t('categories.new_category') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom content-class="bottom">
                <template v-slot:activator="{ on }">
                    <v-btn depressed icon v-on="on" @click="minimizeNewCategoryDialog()">
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
            <v-form v-model="validCategory" v-on:submit.prevent="saveCategory">
                <v-card-text>
                    <v-container>
                        <v-row dense>
                            <v-col>
                                <v-text-field dense outlined class="body-1" background-color="foreground" required
                                    :rules="rulesGlobal.required" v-model="category.name" label="Nombre"
                                    color="secondary"></v-text-field>
                                <v-select dense outlined class="body-1" background-color="foreground"
                                    v-model="category.category" :items="categories" return-object item-text="name"
                                    label="Categoría principal" color="secondary" :disabled="category.isMain"></v-select>
                                <v-textarea dense outlined class="body-1" background-color="foreground"
                                    v-model="category.description" label="Descripción" color="secondary"></v-textarea>
                                <v-switch label="Es categoria principal" v-model="category.isMain"></v-switch>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <h5 class="body-1 pa-3">Imagen desktop</h5>
                                <v-file-input dense v-model="category.file" placeholder="Seleccione su archivo"
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
                                <v-file-input dense v-model="category.fileMobile" placeholder="Seleccione su archivo"
                                    accept="image/*" color="secondary" background-color="foreground" outlined
                                    prepend-icon="mdi-paperclip" @change="fileInputMobile" :disabled="processingImg">
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
        user: {
            type: Object
        },
        value: {
            type: Boolean
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
            categories: "categories/getProductMainCategories"
        })
    },
    watch: {
        value(val) {
            if (val) {
                this.listProductCategories()
            }
        }
    },
    data() {
        return {
            validCategory: false,
            processingImg: false,
            fileURL: null,
            progress: 0,
            category: {
                name: '',
                category: '',
                isMain: false,
                description: '',
                file: null,
                fileMobile: null,
                imagePath: "",
                imageMobilePath: "",
            }

        }
    },
    methods: {
        listProductCategories() {
            this.$store.dispatch('categories/fetchProductMainCategories')
        },
        minimizeNewCategoryDialog() {
            this.$emit("minimize");
            this.show = false;
        },
        cancelCategoryDialog() {
            this.$dialog.show({
                name: `${this.$t("confirm_dialog.cancel_new_category")}`,
                text: `${this.$t("confirm_dialog.confirm_cancel")} ${this.$t(
                    "confirm_dialog.new_category"
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
        saveCategory: function (e) {
            let categorySelected = {}
            if (!this.category.isMain) {
                categorySelected = {
                    id: this.category.category?.id || '',
                    name: this.category.category?.name || ''
                }
            }
            e.preventDefault()
            const categoriesRef = this.$fire.firestore.collection("product_categories")
            const dateTime = new Date()
            categoriesRef.add({
                name: this.category.name,
                category: categorySelected || null,
                image: this.category.imagePath,
                imageMobile: this.category.imageMobilePath,
                date: dateTime.toISOString(),
                deletedAt: null,
                isMain: this.category.isMain,
                status: 1,
                active: true,
                order: null,
                user: {
                    name: this.user.displayName,
                    id: this.user.uid
                },
            },)
            this.category = {
                name: '',
                category: '',
                description: '',
                isMain: false,
                file: null,
                fileMobile: null,
                imagePath: "",
                imageMobilePath: "",
            }
            this.success = true
            this.show = false;
            this.$emit('finish', this.user)
            this.$toasted.success('Categoría creada', {
                theme: "bubble",
                position: "top-right",
                duration: 2000
            })
        },
        async fileInput(file) {
            try {
                if (file && file.name) {
                    this.processingImg = true;
                    const filePath = `${Date.now()}-${file.name}`;
                    this.category.imagePath = filePath
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
                    this.category.imageMobilePath = filePath
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
