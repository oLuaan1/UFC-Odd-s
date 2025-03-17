fetch('https://ufc-odd-s.onrender.com/odds')
    .then(response => response.text())  // Change to .text() to see the raw data
    .then(data => {
        console.log("Raw API Response:", data);
        try {
            const jsonData = JSON.parse(data); 
            console.log("Parsed JSON:", jsonData);
        } catch (error) {
            console.error("JSON Parse Error:", error);
        }
    })
    .catch(error => console.error("Fetch Error:", error));

fetch('https://ufc-odd-s.onrender.com/odds')
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data); // Debugging
        const oddsContainer = document.getElementById("odds-container");
        oddsContainer.innerHTML = ""; // Clear old odds

        const selectedBookmakers = ["Fanduel", "DraftKings", "Bet365"];
        let hasOdds = false;

        data.forEach(event => {
            event.bookmakers.forEach(bookmaker => {
                if (selectedBookmakers.includes(bookmaker.key)) {
                    hasOdds = true;
                    const oddElement = document.createElement("p");
                    oddElement.innerText = `${bookmaker.title}: ${bookmaker.markets[0].outcomes[0].price}`;
                    oddsContainer.appendChild(oddElement);
                }
            });
        });

        if (!hasOdds) {
            oddsContainer.innerText = "No odds available from selected bookmakers.";
        }
    })
    .catch(error => {
        console.error("Error fetching odds:", error);
        document.getElementById("odds-container").innerText = "Failed to load odds.";
    });
