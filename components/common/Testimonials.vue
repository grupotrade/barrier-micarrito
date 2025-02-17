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
                console.log('Iniciando fetch de reseñas...');
                const response = await fetch(
                    `/api/google-reviews?placeId=${this.placeId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                // Log para debugging
                console.log('Status:', response.status);
                console.log('Headers:', Object.fromEntries(response.headers));
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const text = await response.text(); // Primero obtenemos el texto
                console.log('Response text:', text); // Log del texto recibido
                
                try {
                    const data = JSON.parse(text); // Intentamos parsearlo como JSON
                    console.log('Datos parseados:', data);
                    if (data.reviews && data.reviews.length > 0) {
                        console.log(`Encontradas ${data.reviews.length} reseñas`);
                        this.googleReviews = data.reviews;
                    } else {
                        console.log('No se encontraron reseñas en la respuesta');
                    }
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    this.googleReviews = [];
                }
            } catch (error) {
                console.error('Error al obtener reseñas:', error);
                this.googleReviews = [];
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
