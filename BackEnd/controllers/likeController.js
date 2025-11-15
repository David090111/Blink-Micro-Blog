import admin from "firebase-admin";
import { db } from "../config/firebase.js";

const { FieldValue } = admin.firestore;


export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const postRef = db.collection("posts").doc(postId);
    const likeRef = postRef.collection("likes").doc(userId);

    await db.runTransaction(async (tx) => {
      const postSnap = await tx.get(postRef);
      if (!postSnap.exists) throw new Error("Post not found");

      const likeSnap = await tx.get(likeRef);
      if (likeSnap.exists) return; // 

      tx.set(likeRef, { userId, createdAt: Date.now() });
      tx.update(postRef, { likesCount: FieldValue.increment(1) });
    });

    res.json({ message: "Liked" });
  } catch (e) {
    console.error(e);
    if (e.message === "Post not found")
      return res.status(404).json({ message: e.message });
    res.status(500).json({ message: "Like failed" });
  }
};


export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const postRef = db.collection("posts").doc(postId);
    const likeRef = postRef.collection("likes").doc(userId);

    await db.runTransaction(async (tx) => {
      const postSnap = await tx.get(postRef);
      if (!postSnap.exists) throw new Error("Post not found");

      const likeSnap = await tx.get(likeRef);
      if (!likeSnap.exists) return; //

      tx.delete(likeRef);
      tx.update(postRef, { likesCount: FieldValue.increment(-1) });
    });

    res.json({ message: "Unliked" });
  } catch (e) {
    console.error(e);
    if (e.message === "Post not found")
      return res.status(404).json({ message: e.message });
    res.status(500).json({ message: "Unlike failed" });
  }
};


export const likedByMe = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const likeSnap = await db
      .collection("posts")
      .doc(postId)
      .collection("likes")
      .doc(userId)
      .get();
    res.json({ liked: likeSnap.exists });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Check like failed" });
  }
};
