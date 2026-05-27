app.post('/api/pyetje', async (req, res) => {
    const { pyetja } = req.body;
    try {
        const response = await axios({
            method: 'post',
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
            data: {
                contents: [{ parts: [{ text: pyetja }] }]
            },
            headers: { 'Content-Type': 'application/json' }
        });
        res.json(response.data);
    } catch (error) {
        // Ky rresht do të na tregojë në Logs saktësisht pse dështoi
        console.error("GABIMI NGA GOOGLE:", error.response?.data?.error || error.message);
        res.status(500).json({ error: "Gabim nga serveri i AI" });
    }
});
