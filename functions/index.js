import { onRequest } from 'firebase-functions/v2/https';
import axios from 'axios';

export const api = onRequest({ 
    cors: [
        'https://barrierclima.com.ar',
        'https://www.barrierclima.com.ar',
        'http://localhost:3000'
    ],
    maxInstances: 10 
}, async (req, res) => {
    // Log para debugging
    console.log('Recibida petición para:', req.path);
    console.log('Query params:', req.query);

    const placeId = req.query.placeId;
    const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    if (!GOOGLE_API_KEY) {
        console.error('Error: API key no configurada');
        return res.status(500).json({
            error: 'API key no configurada'
        });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=es&key=${GOOGLE_API_KEY}`;
        console.log('Consultando a Google Places API');
        
        const response = await axios.get(url);
        console.log('Respuesta de Google:', response.status);
        
        // Log de la respuesta completa para debugging
        console.log('Datos de Google:', JSON.stringify(response.data, null, 2));

        if (!response.data.result) {
            console.log('No se encontraron reviews');
            return res.json({ 
                reviews: [],
                message: 'No se encontraron reseñas'
            });
        }

        const reviews = response.data.result.reviews ? 
            response.data.result.reviews.map(review => ({
                id: review.time,
                author: review.author_name,
                rating: review.rating,
                text: review.text,
                time: review.time,
                relative_time: review.relative_time_description
            })) : [];

        console.log(`Enviando ${reviews.length} reseñas`);
        
        return res.json({ 
            reviews,
            message: `Se encontraron ${reviews.length} reseñas`
        });
    } catch (error) {
        console.error('Error completo:', error);
        console.error('Stack:', error.stack);
        
        return res.status(500).json({
            error: 'Error al obtener reseñas',
            message: error.message,
            details: error.response ? error.response.data : null,
            stack: error.stack
        });
    }
});