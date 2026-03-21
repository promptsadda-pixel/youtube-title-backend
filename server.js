import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// AI route
app.post("/generate", async (req, res) => {

  const { keyword } = req.body;

  try {

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
            content: `Generate 10 viral YouTube titles about "${keyword}" with numbers and power words.`
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
    res.status(500).json({ error: "Error generating titles" });
  }

});

app.listen(PORT, () => {
  console.log("Server running");
});
