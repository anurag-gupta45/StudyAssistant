const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/chat", async (req, res) => {
try {
const response = await axios.post(
"http://localhost:11434/api/generate",
{
model: "qwen2.5-coder",
prompt: req.body.message,
stream: false
}
);

res.json({ answer: response.data.response });


} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.post("/summarize-pdf", upload.single("pdf"), async (req, res) => {
try {
const fileBuffer = fs.readFileSync(req.file.path);
const pdfData = await pdfParse(fileBuffer);


const prompt = `Summarize these study notes.


Provide:

1. Key Topics
2. Important Questions
3. Exam Tips

Notes:
${pdfData.text.slice(0, 12000)}`;


const response = await axios.post(
  "http://localhost:11434/api/generate",
  {
    model: "qwen2.5-coder",
    prompt,
    stream: false
  }
);

fs.unlinkSync(req.file.path);

res.json({
  summary: response.data.response
});


} catch (error) {
console.error(error);
res.status(500).json({ error: error.message });
}
});

app.post("/quiz-pdf", upload.single("pdf"), async (req, res) => {
try {
const fileBuffer = fs.readFileSync(req.file.path);
const pdfData = await pdfParse(fileBuffer);


const prompt = `Create 10 multiple choice questions from these notes.


Notes:
${pdfData.text.slice(0, 12000)}`;


const response = await axios.post(
  "http://localhost:11434/api/generate",
  {
    model: "qwen2.5-coder",
    prompt,
    stream: false
  }
);

fs.unlinkSync(req.file.path);

res.json({
  quiz: response.data.response
});


} catch (error) {
console.error(error);
res.status(500).json({ error: error.message });
}
});

app.listen(5000, () => {
console.log("StudyAssistant backend running on port 5000");
});
