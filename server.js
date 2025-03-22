const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch'); // Add fetch for older Node versions
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname)));

// Endpoint to fetch odds from SGO API
app.get('/odds', async (req, res) => {
    try {
        const response = await fetch("https://api.sportsgameodds.com/v1/odds?league=UFC&apikey=65385ca3b134d1ef97393be820c99209");
        const data = await response.json();

        console.log("SGO Raw API Response:", data);
        res.json(data);
    } catch (error) {
        console.error("Error fetching odds from SGO:", error);
        res.status(500).json({ error: "Failed to fetch odds" });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
