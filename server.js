const express = require("express");
const cors = require("cors");

// ✅ FIX fetch (node-fetch v3)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ ROOT ROUTE (IMPORTANT for Railway)
app.get("/", (req, res) => {
  res.send("AI Server is Running 🚀");
});

// 🔥 AI GENERATE ROUTE
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
Return only titles, one per line, no numbering.`
          }
        ]
      })
    });

    const data = await response.json();

    // ✅ SAFETY CHECK
    if (!data.choices) {
      console.error("OpenAI Error:", data);
      return res.status(500).json({ error: "AI response failed" });
    }

    const rawText = data.choices[0].message.content;

    // ✅ CLEAN TITLES
    const titles = rawText
      .split("\n")
      .map(t => t.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(t => t.length > 10);

    res.json({ titles });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
