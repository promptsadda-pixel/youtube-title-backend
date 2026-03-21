const express = require("express");

const app = express();

// ✅ FIX: fallback port
const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
  res.send("Server is LIVE 🚀");
});

// Health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// Start server
app.listen(PORT, () => {
  console.log("Running on port:", PORT);
});
