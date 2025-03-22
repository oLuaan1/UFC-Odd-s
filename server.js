require("dotenv").config(); // Load environment variables (optional if already set in Render)

const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

const API_KEY = process.env.API_KEY; // ✅ Use environment variable

app.get("/odds", async (req, res) => {
    if (!API_KEY) {
        return res.status(500).json({ error: "Missing API key" });
    }

    try {
        const response = await fetch(`https://api.sportsgameodds.com/v1/odds?league=UFC&apikey=${API_KEY}`);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error("Error fetching odds:", error);
        res.status(500).json({ error: "Failed to fetch odds" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
