const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "qwen2.5-coder",
        prompt: message,
        stream: false
      }
    );

    res.json({
      answer: response.data.response
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("StudyAssistant backend running on port 5000");
});