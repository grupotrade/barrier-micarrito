<template>
    <v-container fluid class="container-inner mt-12">
                <v-row>
                    <v-col cols="12" md="4">
                        <h3>Testimonios</h3>
                        <v-divider class="line-title primary"></v-divider>
                        <p class="mt-4">
                            Opiniones de nuestros clientes en Google
                        </p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-slide-group
                            show-arrows
                            class="pa-4"
                        >
                            <v-slide-item
                                v-for="review in googleReviews"
                                :key="review.id"
                                class="pa-4"
                            >
                                <v-card 
                                    class="ma-3" 
                                    width="280"
                                    height="260"
                                >
                                    <v-card-text>
                                        <v-rating
                                        length="5"
  :value="review.rating"
                                            color="amber"                                            
                                            readonly
                                            dense
                                            half-increments
                                            class="mb-3"
                                        ></v-rating>
                                        <p class="text-body-1 text-truncate-2">{{ review.text }}</p>
                                        <p class="text-subtitle-1 mt-4">- {{ review.author }}</p>
                                    </v-card-text>
                                </v-card>
                            </v-slide-item>
                        </v-slide-group>
                    </v-col>
                </v-row>
            </v-container>
</template>

<script>
export default {
    data() {
        return {
            googleReviews: [],
            placeId: 'ChIJ7wR_-T65vJURY0pUKepBqQI' // El ID de tu negocio en Google Maps
        }
    },
    async mounted() {
        await this.fetchGoogleReviews();
    },
    methods: {
        async fetchGoogleReviews() {
            try {
                const response = await fetch(`/api/google-reviews?placeId=${this.placeId}`);
                const data = await response.json();
                this.googleReviews = data.reviews;
            } catch (error) {
                console.error('Error al obtener reseñas:', error);
            }
        }
    }
}
</script>

<style>

.text-truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
