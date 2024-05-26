<template>
    <v-container v-if="categories">
        <v-list>
            <v-list-item v-for="item in categories" @click="navigateCategory(item)">
            {{ item.name }}
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            categories: "posts/getPostTypes",
        }),
    },
    mounted() {
        this.$store.dispatch('posts/getPostTypes');
    },
    methods: {
        navigateCategory(category) {
            this.$router.push('/category/' + category.id)
        },
    }

};
</script>