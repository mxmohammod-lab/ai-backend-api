const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Backend API is working!"
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    message: "Backend API is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
