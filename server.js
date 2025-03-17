const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); // Allow all origins
app.use(express.static(path.join(__dirname))); // Serve static files from the root directory

// Endpoint to fetch odds from API
app.get('/odds', async (req, res) => {
    try {
        const response = await fetch("https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds?regions=us&markets=h2h&apiKey=7954ffb0c49ad18dc828bb48ed55ac39");
        const data = await response.json();

        // Debugging: Log raw response before sending it
        console.log("Raw API Response:", data);
        
        res.json(data);
    } catch (error) {
        console.error("Error fetching odds:", error);
        res.status(500).json({ error: "Failed to fetch odds" });
    }
});

// Serve index.html (or the main HTML file)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Corrected file path
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
