import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
} from "../controllers/postController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

router.get("/", getPosts);
router.get("/:id", getPostById);

export default router;
