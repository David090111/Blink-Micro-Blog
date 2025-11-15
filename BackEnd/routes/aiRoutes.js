import express from "express";

import {
  suggestTitle,
  summarize,
  rewriteWithTone,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/suggest-title", suggestTitle);
router.post("/summarize", summarize);
router.post("/rewrite", rewriteWithTone);

export default router;
