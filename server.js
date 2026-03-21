import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 IMPORTANT: Railway port fix
const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Simple test route (NO API yet)
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
