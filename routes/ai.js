const express = require("express");
const Groq = require("groq-sdk");
const router = express.Router();
const { addHabit } = require("../services/habitService");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/coach", async (req, res) => {
  try {
    const { message } = req.body;
    const chat = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You generate habits only for daily use. 
            Rules:
              - Return only a numbered list.
              - 2 to 5 items.
              - No explanations.
              - No intro text.
              - No conclusion.
              - No markdown.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    const reply = chat.choices[0].message.content;
    const habits = reply
      .split("\n")
      .filter((habit) => habit.trim() !== "")
      .map((habit) => habit.replace(/^\d+\.\s*/, "").trim());
    for (let habit of habits) {
      await addHabit(habit);
    }

    res.json({
      reply: chat.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in generating response", error });
  }
});

module.exports = router;
