const express = require('express');
const axios = require('axios');

const app = express();
const API_URL = 'https://api.coingecko.com/api/v3';

// Ruta principal '/' que debería devolver un mensaje
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Criptomonedas!');
});

// Ruta para obtener las criptomonedas
app.get('/cryptos/:currency', async (req, res) => {
    const currency = req.params.currency || 'usd'; // Valor por defecto es USD
    try {
        const response = await axios.get(`${API_URL}/coins/markets`, {
            params: { vs_currency: currency }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


// Ruta para obtener el historial de una criptomoneda
app.get('/history', async (req, res) => {
    const coinId = req.query.coin_id || 'bitcoin';
    try {
        const response = await axios.get(`${API_URL}/coins/${coinId}/market_chart`, {
            params: { vs_currency: 'usd', days: '7' }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// Arranca el servidor
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
