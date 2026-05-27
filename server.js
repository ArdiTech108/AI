const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('.')); // Shërben index.html

app.post('/api/pyetje', async (req, res) => {
    const { pyetja } = req.body;
    try {
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`, {
            contents: [{ parts: [{ text: pyetja }] }]
        });
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Lidhja me AI dështoi" });
    }
});

app.listen(3000, () => console.log('Serveri po punon në http://localhost:3000'));