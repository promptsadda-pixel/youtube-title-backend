const express = require("express");
const cors = require("cors");

const app = express();

// ✅ FIXES
app.use(cors());
app.use(express.json()); // IMPORTANT

const PORT = process.env.PORT || 3000;

// Test route
app.post("/generate", async (req, res) => {
  try {

    const keyword = req.body?.keyword || "YouTube";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Generate 12 highly clickable YouTube titles about "${keyword}".
            Use numbers, power words, and emotional triggers.
            Make them viral and SEO optimized.
            Return only titles in list format.`
          }
        ]
      })
    });

    const data = await response.json();

    const titles = data.choices[0].message.content
      .split("\n")
      .filter(t => t.trim().length > 10);

    res.json({ titles });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
