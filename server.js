// server.js
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: "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", // Replace this with your key
});

const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).send("Error talking to AI");
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));

