
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

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

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "একটি মেসেজ লিখুন।"
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        error: "AI API key Render-এ সেট করা নেই।"
      });
    }

    const messages = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-20)) {
        if (
          item &&
          ["user", "assistant"].includes(item.role) &&
          typeof item.content === "string"
        ) {
          messages.push({
            role: item.role,
            content: item.content.slice(0, 4000)
          });
        }
      }
    }

    messages.push({
      role: "user",
      content: message.slice(0, 4000)
    });

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "You are MX AI, a helpful assistant. Reply in Bangla when the user writes in Bangla, and in English when the user writes in English."
            },
            ...messages
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("AI provider error:", response.status, data);
      return res.status(502).json({
        error: "AI সেবা থেকে উত্তর পাওয়া যায়নি। API key ও মডেল সেটিং পরীক্ষা করুন।"
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({
        error: "AI কোনো উত্তর ফেরত দেয়নি।"
      });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message);

    return res.status(500).json({
      error: "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MX AI Backend is live on port ${PORT}`);
});
