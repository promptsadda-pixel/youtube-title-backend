const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.post("/generate", (req, res) => {
  res.json({
    titles: [
      "🔥 10 YouTube Growth Hacks That Work",
      "How to Grow on YouTube Fast (2026 Guide)",
      "7 Secrets to Viral YouTube Videos",
      "Why Your YouTube Channel Is Not Growing",
      "Best YouTube Tips for Beginners"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
