<template>
    <v-container fluid class="pt-lg-16 px-0">

        <article v-if="post">
            <header class="header-post">
                <v-container class="container-header-post">
                    <a href="/blog" class="primary--text">
                        SIM / Blog /</a>
                    <a :href="'/category/' + post.type.id" v-if="post.type" class="primary--text">
                        {{ post.type.name }}
                    </a>
                    <h1 class="py-4 white--text">{{ post.title }}</h1>
                </v-container>
            </header>
            <v-container class="container-post">
                <v-container>
                    <v-row>
                        <v-col cols="12" lg="9">
                            <v-img :src="$config.storage + 'posts%2F' + post.img + '?alt=media'" contain
                                v-if="post.img && post.img != ''"></v-img>
                            <div class="py-3" v-html="post.content"></div>

                        </v-col>
                        <v-col cols="12" lg="3">
                            <h3>Categorías</h3>
                            <PostsCategoriesList />
                        </v-col>
                    </v-row>
                </v-container>
            </v-container>
        </article>
        <v-skeleton-loader type="card" :loading="loadingRelated" v-if="relatedPosts.length > 0">
            <h4 class="mt-4 mb-6 primary--text">Artículos relacionados</h4>
            <v-card class="pa-4 mb-2" v-for="post in relatedPosts" :key="post.id" rounded @click="navigatePost(post)">
                <p class="primary--text">{{ $moment(post.createdAt).format('DD/MM/YYYY') }} | {{ post.author }}
                </p>
                <h6 class="primary--text">
                    {{ post.title }}
                </h6>
            </v-card>
            <!-- <v-carousel v-model="related" :show-arrows="false" hide-delimiter-background>
                    <v-carousel-item :key="post.id">
                        <v-card class="pa-4 mb-2"  v-for="post in relatedPosts" rounded @click="navigatePost(post)">
                            <h6 class="primary--text">{{ $moment(post.createdAt).format('DD/MM/YYYY')  }} | {{ post.author }}</h6>
                            <h4 class="primary--text">
                                {{ post.title }}
                            </h4>
                        </v-card>
                    </v-carousel-item>
                </v-carousel> -->
        </v-skeleton-loader>


        <!-- <h3 class="mt-10 mb-6" v-if="posts">Más publicaciones</h3> -->
    </v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            content: "",
            selectPost: '',
            loadingRelated: false
        }
    },
    computed: {
        ...mapGetters({
            post: 'posts/getPost',
            posts: 'posts/getPosts'
        }),
        relatedPosts() {
            return this.posts.filter(post => post.id !== this.$route.params.id)
        }
    },
    mounted() {
        this.$store.commit('posts/setPosts', [])
        this.$store.commit('posts/setPost', [])
        this.getPost()
    },
    methods: {
        async getPost() {
            let postId = this.$route.params.id
            this.$store.dispatch('posts/getPostbyId', postId)
                .then(() => {
                    this.getRelatedPosts()
                })
                .catch(err => {
                    if (err.response) {
                        this.$toasted.error(err.response.data.error, {
                            duration: 1500
                        })
                    } else {
                        this.$toasted.error(err, {
                            duration: 1500
                        })
                    }
                })
        },
        async getRelatedPosts() {
            this.loadingRelated = true
            this.$store.dispatch('posts/fetchPostsByPostType', this.post.type.id)
                .then(() => {
                    this.loadingRelated = false
                }).catch(err => {
                    if (err.response) {
                        this.$toasted.error(err.response.data.error, {
                            duration: 1500
                        })
                    } else {
                        this.$toasted.error(err, {
                            duration: 1500
                        })
                    }
                })
        },
        navigatePost(post) {
            this.$router.push('/post/' + post.id)
        }
    },

}
</script>