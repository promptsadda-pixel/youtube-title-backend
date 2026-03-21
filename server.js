const express = require("express");
const cors = require("cors");

const app = express();

// ✅ FIXES
app.use(cors());
app.use(express.json()); // IMPORTANT

const PORT = process.env.PORT || 3000;

// Test route
app.post("/generate", (req, res) => {

  const keyword = req.body?.keyword || "YouTube";

  const powerWords = [
    "Ultimate", "Proven", "Secret", "Insane", "Powerful",
    "Shocking", "Amazing", "Best", "Simple", "Fast"
  ];

  const numbers = ["5", "7", "10", "15", "21"];

  const titles = [];

  for(let i=0;i<10;i++){
    const num = numbers[Math.floor(Math.random()*numbers.length)];
    const word = powerWords[Math.floor(Math.random()*powerWords.length)];

    titles.push(`🔥 ${num} ${word} ${keyword} Hacks That Actually Work`);
    titles.push(`How to Master ${keyword} in ${num} Easy Steps (${word} Guide)`);
    titles.push(`${word} ${keyword} Secrets Nobody Tells You (${num} Tips)`);
  }

  res.json({ titles: titles.slice(0, 12) });

});

// Start server
app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
