// src/controllers/aiController.js
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";


const genAI = new GoogleGenAI({});


const MODEL_NAME = "gemini-2.5-flash";



/**
 * Generate text content using Gemini API.
 * @param {string} prompt The prompt to send to the model.
 * @returns {Promise<string>} 
 */
async function generateText(prompt) {
  try {
    // 
    const response = await genAI.models.generateContent({
      model: MODEL_NAME,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // 
    const text = response.text;
    return (text || "").trim();
  } catch (error) {
    console.error("Error generateText:", error);
    // 
    throw new Error("Error call Gemini API.");
  }
}



/**
 * Convert input text to an array of strings safely.
 * @param {string} text Input text to convert.
 * @returns {string[]} 
 */
function toStringArraySafe(text) {
  // 
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      // 
      return parsed.map(String).filter(Boolean).slice(0, 5);
    }
  } catch (_) {
    //
  }

  //
  return (
    text
      .split("\n")
     
      .map((s) => s.replace(/^[\-\*\d\.\)]\s*/, "").trim())
     
      .filter(Boolean)
      
      .slice(0, 5)
  );
}



export const suggestTitle = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Missing content" });

  const prompt = [
    "You are a helpful blog editor.",
    "Suggest 5 concise, catchy, SEO-friendly titles for the blog content below.",
    
    "Return a pure JSON array of strings, without any extra text or markdown (e.g., ```json).",
    "",
    "CONTENT:",
    content,
  ].join("\n");

  try {
    const out = await generateText(prompt);
    const suggestions = toStringArraySafe(out);
    res.json({ suggestions });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Gemini suggestTitle error" });
  }
};

export const summarize = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Missing content" });

  const prompt = [
    "Summarize the blog content in 3-4 sentences (TL;DR).",
    "Be clear, neutral, and informative.",
    "",
    "CONTENT:",
    content,
  ].join("\n");

  try {
    const summary = await generateText(prompt);
    res.json({ summary });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Gemini summarize error" });
  }
};

export const rewriteWithTone = async (req, res) => {
  const { content, tone } = req.body;
  if (!content) return res.status(400).json({ message: "Missing content" });

  const toneText = tone || "friendly, concise, and engaging";
  const prompt = [
    `Rewrite the following blog post with the tone: ${toneText}.`,
    "Preserve meaning, structure, and facts; improve clarity and readability.",
    "",
    "CONTENT:",
    content,
  ].join("\n");

  try {
    const rewritten = await generateText(prompt);
    res.json({ rewritten });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Gemini rewrite error" });
  }
};
