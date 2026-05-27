const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public')); 

app.post('/api/pyetje', async (req, res) => {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`;
        const response = await axios.post(url, {
            contents: [{ parts: [{ text: req.body.pyetja }] }]
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Gabim nga serveri" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Serveri po punon...'));
