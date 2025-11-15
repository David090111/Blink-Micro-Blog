import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
  likePost,
  unlikePost,
  likedByMe,
} from "../controllers/likeController.js";

const router = express.Router();

router.post("/posts/:postId/like", authMiddleware, likePost);
router.post("/posts/:postId/unlike", authMiddleware, unlikePost);
router.get("/posts/:postId/likes/me", authMiddleware, likedByMe);

export default router;
