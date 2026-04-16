const express = require("express");
const Groq = require("groq-sdk");
const router = express.Router();

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
          content: `You generate habits only. 
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

    res.json({
      reply: chat.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in generating response", error });
  }
});

module.exports = router;
