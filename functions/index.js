import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// Configuración más específica de CORS
const corsConfig = {
    origin: [
        'http://localhost:3000',
        'https://barrierclima.com.ar',
        'https://www.barrierclima.com.ar'
    ],
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsConfig));

// Middleware adicional para asegurar headers CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(204).send('');
    }
    next();
});

app.get('/google-reviews', async (req, res) => {
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
        const response = await axios.get(url);

        if (!response.data.result) {
            return res.json({
                reviews: []
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

        res.json({ reviews });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Error al obtener reseñas',
            message: error.message,
            details: error.response ? error.response.data : null
        });
    }
});

// Exportar con configuración explícita de CORS
export const api = onRequest({
    cors: true,
    maxInstances: 10
}, app);