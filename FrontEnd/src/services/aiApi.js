// src/services/aiApi.js
import axios from "axios";

export const aiRewrite = (content, tone) =>
  axios.post("https://blog-app-geminiai.onrender.com/api/ai/rewrite", {
    content,
    tone,
  });

export const aiSuggestTitle = (content) =>
  axios.post("https://blog-app-geminiai.onrender.com/api/ai/suggest-title", {
    content,
  });

export const aiSummarize = (content) =>
  axios.post("https://blog-app-geminiai.onrender.com/api/ai/summarize", {
    content,
  });
