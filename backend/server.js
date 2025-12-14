import express from "express";
import cors from "cors";
import multer from "multer";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const client = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY"
});

app.post("/analyze", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const pdfData = await pdfParse(req.file.buffer);

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `Analyze this resume and give details:\n\n${pdfData.text}`
        }
      ]
    });

    res.json({
      analysis: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
