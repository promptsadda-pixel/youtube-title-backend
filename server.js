const express = require("express");
const cors = require("cors");

// Safe fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
  res.send("AI Server is Running 🚀");
});

// AI route
app.post("/generate", async (req, res) => {
  try {

    const keyword = req.body?.keyword || "YouTube";

    // 🔴 CHECK API KEY FIRST
    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        titles: ["⚠️ API key missing. Add it in Railway."]
      });
    }

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
            content: `Generate 10 viral YouTube titles about "${keyword}".
Return only titles, one per line.`
          }
        ]
      })
    });

    const data = await response.json();

    // 🔴 HANDLE OPENAI ERROR
    if (!data.choices) {
      console.error("OpenAI Error:", data);
      return res.json({
        titles: ["⚠️ AI error. Check API key or billing."]
      });
    }

    const titles = data.choices[0].message.content
      .split("\n")
      .map(t => t.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(t => t.length > 10);

    res.json({ titles });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    // 🔴 NEVER CRASH — always respond
    res.json({
      titles: ["⚠️ Server error. Please try again."]
    });
  }
});

app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
