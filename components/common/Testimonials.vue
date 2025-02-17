<template>
    <v-container v-if="googleReviews.length > 0" fluid class="container-inner mt-12">
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
            placeId: 'ChIJ7wR_-T65vJURY0pUKepBqQI'
        }
    },
    async mounted() {
        await this.fetchGoogleReviews();
    },
    methods: {
        async fetchGoogleReviews() {
            try {
                const response = await fetch(
                    `https://us-central1-barrierclima.cloudfunctions.net/api/google-reviews?placeId=${this.placeId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                if (data.reviews && data.reviews.length > 0) {
                    this.googleReviews = data.reviews;
                }
            } catch (error) {
                console.error('Error al obtener reseñas:', error);
                this.googleReviews = []; // Aseguramos que el array esté vacío en caso de error
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
