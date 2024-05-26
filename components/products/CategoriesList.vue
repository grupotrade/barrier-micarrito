<template>
        <v-container fluid class="px-0">
            <v-row dense justify="center">
                <v-col cols="12" lg="4" class="py-6" v-for="item in categories" :key="item.name">
                    <ProductsCategoryCard :category="item" @goTo="  " />
                </v-col>
            </v-row>
        </v-container>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array
        }
    },
    data() {
        return {
            categorySelected: null
        }
    },
    computed: {
        user() {
            return this.$store.state.authUser;
        }
    },
    methods: {
        setLoading(value) {
            this.loading = value;
        }
    }
}
</script>