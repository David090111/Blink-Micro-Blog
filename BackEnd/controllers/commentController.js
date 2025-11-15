import admin from "firebase-admin";
import { db } from "../config/firebase.js";

const { FieldValue } = admin.firestore;

/**
 * POST /api/comments
 * body: { postId, content }
 */
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    if (!postId || !content?.trim()) {
      return res.status(400).json({ message: "postId & content are required" });
    }

    // 
    const postRef = db.collection("posts").doc(postId);
    const postSnap = await postRef.get();
    if (!postSnap.exists)
      return res.status(404).json({ message: "Post not found" });

    // 
    const commentRef = db.collection("comments").doc();
    await db.runTransaction(async (tx) => {
      tx.set(commentRef, {
        postId,
        authorId: userId,
        content: content.trim(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      tx.update(postRef, { commentCount: FieldValue.increment(1) });
    });

    res.json({ id: commentRef.id, message: "Comment created" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Create comment failed" });
  }
};

/**
 * PUT /api/comments/:id
 * body: { content }
 */
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const ref = db.collection("comments").doc(id);
    const snap = await ref.get();
    if (!snap.exists)
      return res.status(404).json({ message: "Comment not found" });

    const data = snap.data();
    if (data.authorId !== userId && req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    await ref.update({
      content: content?.trim() ?? data.content,
      updatedAt: Date.now(),
    });

    res.json({ message: "Comment updated" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Update comment failed" });
  }
};

/**
 * DELETE /api/comments/:id
 */
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const commentRef = db.collection("comments").doc(id);
    const snap = await commentRef.get();
    if (!snap.exists)
      return res.status(404).json({ message: "Comment not found" });

    const data = snap.data();
    if (data.authorId !== userId && req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    const postRef = db.collection("posts").doc(data.postId);

    await db.runTransaction(async (tx) => {
      tx.delete(commentRef);
      tx.update(postRef, { commentCount: FieldValue.increment(-1) });
    });

    res.json({ message: "Comment deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Delete comment failed" });
  }
};

export const listCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const limit = Math.min(parseInt(req.query.limit || "20", 10), 50);
    const after = req.query.after ? Number(req.query.after) : null;

    let q = db
      .collection("comments")
      .where("postId", "==", postId)
      .orderBy("createdAt", "desc")
      .limit(limit);

    if (after) q = q.startAfter(after);

    const snap = await q.get();
    const comments = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const nextCursor = comments.length
      ? comments[comments.length - 1].createdAt
      : null;

    res.json({ items: comments, nextCursor });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "List comments failed" });
  }
};
