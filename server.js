const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Backend API is working!"
  });const express require express, const cors from cors, app. get slash , তারপর res.json success true message MX AI Backend is working। তারপর app get slash api slash status যেখানে JSON এ status online আর message MX AI Backend is running। তারপর app post slash api slash chat যেখানে message থেকে ইউজারের লেখা নেবে, API key আছে কিনা দেখবে, না থাকলে জানাবে “OPENAI_API_KEY সেট করা হয়নি”। তারপর OpenAI তে request পাঠাবে, না করতে পারলে “AI পরিষেবা থেকে উত্তর পাওয়া যায়নি” বলবে। শেষে ঠিকঠাক হলে MX AI Assistant হিসেবে বাংলায় জবাব দেবে। 
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
