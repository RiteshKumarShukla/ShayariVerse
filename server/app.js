const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/generate", async (req, res) => {
  const type = req.query.type;
  const keyword = req.body.keyword;
  let completion_text = "";

  if (type === "Quote") {
    completion_text =
      "Act as an expert Quote generator. The user will provide you a keyword as an input and you have to generate a Quote in English.";
  } else if (type === "Shayari") {
    completion_text =
      "Act as an expert Shayari generator. The user will provide you a keyword as an input and you have to generate a Shayari in Hindi.";
  } else if (type === "Story") {
    completion_text =
      "Act as an expert Story generator. The user will provide you a keyword as an input and you have to generate a Story in English.";
  } else if (type === "Joke") {
    completion_text = "Generate a funny joke.";
  }

  const messages = [
    { role: "user", content: keyword },
    { role: "assistant", content: completion_text },
  ];

  try {
    if (!keyword) throw new Error("No input is provided");

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    if (type === "Shayari" || type === "Story") {
      const generatedText = completion.data.choices[0].message.content;
      const generatedLines = generatedText.split("\n").filter((line) => line.trim() !== "");
      console.log(generatedLines);
      res.json(generatedLines);
    } else {
      const generatedText = completion.data.choices[0].message.content;
      const firstLine = generatedText.split("\n")[0];
      console.log(firstLine);
      res.json(firstLine);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
