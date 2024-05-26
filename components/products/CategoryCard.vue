<template>
    <v-card flat class="mx-1 fill-height d-flex flex-column" @click="$emit('goTo',category)">
        <v-img :src="$config.storage+'categories%2F' + category.image + '?alt=media'" height="250px" cover class="rounded-lg"></v-img>
        <v-card-text class="pa-0 fill-height">
            <v-row dense>
                <v-col>
                    <h4 class="py-6 text-center secondary_text--text">{{ category.name }}</h4>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        category: {
            type: Object
        }
    },
    data() {
        return {

        };
    }
}
</script>