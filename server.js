if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Only needed for local development
}

const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

const API_KEY = process.env.API_KEY; // ✅ Read API key from environment

// Debug log to verify API key (remove this in production)
console.log("API_KEY:", API_KEY);

// Route handler for the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the UFC Odds API");
});

app.get("/odds", async (req, res) => {
    if (!API_KEY) {
        console.error("❌ API Key is missing!");
        return res.status(500).json({ error: "Missing API key" });
    }

    try {
        const apiUrl = `https://api.sportsgameodds.com/v1/odds?league=UFC`;
        console.log(`Fetching odds from URL: ${apiUrl}`);

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const data = await response.json();

        console.log("SGO API Response:", data); // Debug API response
        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching odds:", error);
        res.status(500).json({ error: "Failed to fetch odds" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
