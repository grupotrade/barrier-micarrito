<template>
    <v-container fluid class="px-0">
        <v-sheet class="pt-12">
            <BannersListBanners class="mb-4" position="blog-header" />
        </v-sheet>
        <v-container>
            <v-row dense>
                <v-col cols="12" lg="9">
                    <posts-list :showCategory="true" />
                </v-col>
                <v-col cols="12" lg="3">
                    <h3>Categorías</h3>
                    <PostsCategoriesList />
                </v-col>
            </v-row>
        </v-container>
        <v-sheet class="hero my-4">
            <BannersListBanners class="my-4" position="blog-footer" />
        </v-sheet>
    </v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            loadingPosts: false,
            limitPosts: 6,
            activePostTypes: [],
            selectedPostTypes: []
        };
    },
    computed: {
        ...mapGetters({
            posts: "posts/getPosts"
        }),
        user() {
            return this.$store.state.authUser;
        }
    },
    mounted() {
        this.fetchPosts
    },
    methods: {
        async fetchPosts() {
            this.loadingPosts = true
            this.$store.dispatch('posts/getPostTypes')
                .then(() => {

                })
            this.$store.dispatch('posts/getPosts')
                .then(() => {
                    this.loadingPosts = false
                })
        },
        async listPostsByPostType(postType) {
            // buscar el índice de la categoría seleccionada en el array
            const index = this.selectedPostTypes.findIndex(item => item.id === postType.id);
            if (index >= 0) {
                // si la categoría ya está en el array, eliminarla
                this.selectedPostTypes.splice(index, 1);
            } else {
                // si la categoría no está en el array, agregarla
                this.selectedPostTypes.push(postType);
            }

            this.loadingPosts = true;
            // llamar a la acción del store con todas las categorías seleccionadas
            const selectedIds = this.selectedPostTypes.map(item => item.id);
            if (this.selectedPostTypes.length > 0) {
                this.$store.dispatch('posts/getPostsByPostTypes', selectedIds)
                    .then(() => {
                        this.loadingPosts = false;
                    })
            } else {
                this.fetchPosts()
            }
            const activeIndex = this.activePostTypes.findIndex(item => item === postType.id);
            if (activeIndex >= 0) {
                // si la categoría ya está en el array, eliminarla
                this.activePostTypes.splice(index, 1);
            } else {
                // si la categoría no está en el array, agregarla
                this.activePostTypes.push(postType.id);
            }
        },
        navigatePost(post) {
            const postName = post.title.replace(/\s+/g, '-').toLowerCase();
            const encodedPostName = encodeURIComponent(postName);
            this.$router.push(`/post/${encodedPostName}_${post.id}`);
        }
    },

}
</script>
