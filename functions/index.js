const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Habilitar CORS
app.use(cors({ origin: true }));

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

exports.api = functions.https.onRequest(app);