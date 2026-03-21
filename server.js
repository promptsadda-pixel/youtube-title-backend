const express = require("express");
const cors = require("cors");

const app = express();

// ✅ FIXES
app.use(cors());
app.use(express.json()); // IMPORTANT

const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Server is LIVE 🚀");
});

// 🔥 SAFE GENERATE ROUTE
app.post("/generate", (req, res) => {
  try {

    const keyword = req.body?.keyword || "YouTube";

    const titles = [
      `🔥 10 ${keyword} Hacks That Will Blow Your Mind`,
      `How to Master ${keyword} in 2026 (Step-by-Step)`,
      `7 Secrets About ${keyword} Nobody Tells You`,
      `Why ${keyword} Is Not Working for You (Fix This!)`,
      `Best ${keyword} Strategies That Actually Work`
    ];

    res.json({ titles });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
