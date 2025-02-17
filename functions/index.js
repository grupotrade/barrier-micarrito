import { onRequest } from 'firebase-functions/v2/https';
import axios from 'axios';

export const api = onRequest({ 
    cors: true,
    maxInstances: 10 
}, async (req, res) => {
    try {
        // Log de todo lo que recibimos
        console.log('Cuerpo completo:', JSON.stringify(req.body, null, 2));
        
        // Obtener datos del body para httpsCallable
        const { placeId } = req.body.data || {};
        
        // Usar una API key hardcodeada temporalmente para pruebas
        const GOOGLE_API_KEY = 'AIzaSyBCkA9pwtB9L1DhfsB_VmvItmlQfQfizmI';

        console.log('PlaceId:', placeId);
        console.log('API Key presente:', !!GOOGLE_API_KEY);

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=es&key=${GOOGLE_API_KEY}`;
        
        const response = await axios.get(url);
        console.log('Status de Google:', response.status);

        if (!response.data.result) {
            return res.json({ reviews: [] });
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

        return res.json({
            data: { reviews }
        });
    } catch (error) {
        console.error('Error completo:', error);
        return res.status(500).json({
            data: {
                error: 'Error al obtener reseñas',
                message: error.message
            }
        });
    }
});