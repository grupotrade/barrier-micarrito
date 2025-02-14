const express = require('express')
const axios = require('axios').default
const app = express()

module.exports = function (req, res) {
    const placeId = req.query.placeId
    const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY

    console.log('Place ID recibido:', placeId);
    console.log('API Key configurada:', GOOGLE_API_KEY ? 'Sí' : 'No');

    if (!GOOGLE_API_KEY) {
        console.error('Error: API key no configurada');
        return res.status(500).json({
            error: 'API key no configurada'
        })
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${GOOGLE_API_KEY}`;
    console.log('URL de la petición:', url);

    axios.get(url)
        .then(response => {
            console.log('Respuesta recibida de Google:', response.data);

            if (!response.data.result) {
                console.log('No se encontraron resultados');
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
                    time: review.time
                })) : [];

            console.log('Reseñas procesadas:', reviews.length);
            res.json({
                reviews: reviews
            });
        })
        .catch(error => {
            console.error('Error completo:', error);
            console.error('Mensaje de error:', error.message);
            if (error.response) {
                console.error('Datos de error:', error.response.data);
                console.error('Estado:', error.response.status);
            }
            
            res.status(500).json({
                error: 'Error al obtener reseñas',
                message: error.message,
                details: error.response ? error.response.data : null
            });
        });
}