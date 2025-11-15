import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
  createComment,
  updateComment,
  deleteComment,
  listCommentsByPost,
} from "../controllers/commentController.js";

const router = express.Router();

// list comments theo post
router.get("/posts/:postId/comments", listCommentsByPost);


router.post("/comments", authMiddleware, createComment);
router.put("/comments/:id", authMiddleware, updateComment);
router.delete("/comments/:id", authMiddleware, deleteComment);

export default router;
