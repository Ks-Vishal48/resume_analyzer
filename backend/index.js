import dotenv from "dotenv";
dotenv.config();



import express from "express";
import cors from "cors";
import multer from "multer";
import * as pdfParse from "pdf-parse";

import OpenAI from "openai";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({ dest: "uploads/" });

// OpenAI setup
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Upload resume route
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(pdfBuffer);

    const prompt = `Analyze this resume and extract:
    - Skills
    - Experience summary
    - Education summary
    - Strengths
    - Weaknesses
    Resume text: ${data.text}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ analysis: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
