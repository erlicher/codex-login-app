const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/ask-ai', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful coding assistant." },
        { role: "user", content: prompt }
      ]
    });

    const reply = response.choices[0].message.content;
    res.send(reply);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to OpenAI");
  }
});

module.exports = router;