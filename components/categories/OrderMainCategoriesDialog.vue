<template>
    <v-dialog v-model="show" width="700px">
        <v-toolbar dense flat color="primary" dark>
            <v-toolbar-title>{{ $t('categories.order_main_categories') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom content-class="bottom">
                <template v-slot:activator="{ on }">
                    <v-btn depressed icon v-on="on" @click="show = false">
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t("cancel") }}</span>
            </v-tooltip>
        </v-toolbar>
        <v-card flat tile class="card-surface pa-4">
            <draggable v-model="draggedCategories" :options="{ handle: '.drag-handle' }" @end="onDragEnd">
                <div class="ma-1 midground" v-for="item in draggedCategories" :key="item.id">
                    <div class="drag-handle">☰</div>
                    {{ item.name }}
                </div>
            </draggable>
        </v-card>
    </v-dialog>
</template>

<script>
import draggable from 'vuedraggable';
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        draggable,
    },
    props: {
        value: {
            type: Boolean
        },
    },
    model: {
        event: `modified`
    },
    data() {
        return {
            draggedCategories: []
        };
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
        mainCategories() {
            return this.deepCopy(this.categories)
        },

    },
    watch: {
        value(val) {
            if (val) {
                this.fetchProductMainCategories()
            }
        },
        mainCategories: {
            handler(newVal) {
                this.draggedCategories = this.deepCopy(newVal)
            },
            immediate: true,
        },
    },
    methods: {
        fetchProductMainCategories() {
            this.$store.dispatch('categories/fetchProductMainCategories')
        },
        onDragEnd() {
            this.draggedCategories.forEach(async (item, index) => {
                item.order = index + 1;
                await this.$fire.firestore.collection('product_categories').doc(item.id).update({
                    order: index + 1,
                });
            });
        },

    },
}

</script>

<style>
.drag-handle {
    cursor: move;
    display: inline-block;
    padding: 5px;
}
</style>