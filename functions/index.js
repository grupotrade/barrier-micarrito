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
    // Verificar que sea una petición GET
    if (req.method !== 'GET') {
        res.status(405).send('Método no permitido');
        return;
    }

    const placeId = req.query.placeId;
    const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    if (!GOOGLE_API_KEY) {
        console.error('Error: API key no configurada');
        res.status(500).json({
            error: 'API key no configurada'
        });
        return;
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=es&key=${GOOGLE_API_KEY}`;
        const response = await axios.get(url);

        if (!response.data.result) {
            res.json({ reviews: [] });
            return;
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

        res.json({ reviews });
    } catch (error) {
        console.error('Error completo:', error);
        res.status(500).json({
            error: 'Error al obtener reseñas',
            message: error.message,
            details: error.response ? error.response.data : null
        });
    }
});