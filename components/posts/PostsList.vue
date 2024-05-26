<template>
    <v-container  fluid class="px-0" v-if="posts">
        <v-row dense>
            <v-col v-for="post in posts.slice(0,showPosts)" :key="post.id" cols="12" md="4">
                <PostsPostCard :post="post" @navigate="navigatePost(post)" :showCategory="showCategory" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'posts-list',
    props: {
        category: {
            type: String
        },
        showCategory:  {
            type: Boolean,
            default: false
        },
        showPosts:  {
            type: Number,
            default: 3
        },
    },
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        if (this.category) {
            this.$store.dispatch('posts/fetchPostsByPostType', this.category)
            .then((res) => {
                this.posts = res
            })
        } else {
            this.$store.dispatch('posts/fetchPosts', this.category)
            .then((res) => {
                this.posts = res
            })
        }
    },
    methods: {
        navigatePost(post) {
            this.$router.push('/post/' + post.id)
        },
    }

};
</script>