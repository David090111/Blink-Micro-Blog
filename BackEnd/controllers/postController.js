// controllers/postController.js
import { admin, db } from "../config/firebase.js";
import cloudinary from "../config/cloudinary.js";
import { FieldPath, Timestamp } from "firebase-admin/firestore";


async function deleteQueryInBatches(query, batchSize = 400) {
  let lastDoc = null;
  // eslint-disable-next-line no-constant-condition
  for (;;) {
    let q = query.limit(batchSize);
    if (lastDoc) q = q.startAfter(lastDoc);

    const snap = await q.get();
    if (snap.empty) break;

    const batch = db.batch();
    for (const d of snap.docs) batch.delete(d.ref);

    try {
      await batch.commit();
    } catch (e) {
      console.warn("Batch commit failed, continue next:", e.message);
    }

    lastDoc = snap.docs[snap.docs.length - 1];
    if (snap.size < batchSize) break;
  }
}

// POST /posts
export const createPost = async (req, res) => {
  try {
    const {
      title = "",
      content = "",
      tags = [],
      coverUrl, 
      coverPublicId, 
      
      imageURL,
      public_id,
    } = req.body;

    const userId = req.user?.id; 
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const now = Timestamp.now();

    const doc = {
      title: String(title).trim(),
      content: String(content || ""),
      tags: Array.isArray(tags) ? tags : [],
      coverUrl: coverUrl ?? imageURL ?? null,
      coverPublicId: coverPublicId ?? public_id ?? null,
      authorId: userId,
      createdAt: now,
      updatedAt: now,
    };

    const postRef = await db.collection("posts").add(doc);
    return res.status(201).json({ id: postRef.id, message: "Post created" });
  } catch (e) {
    console.error("createPost error:", e);
    return res.status(500).json({ message: "Create failed" });
  }
};

// PUT /posts/:id
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "user";

    const ref = db.collection("posts").doc(id);
    const old = await ref.get();
    if (!old.exists) return res.status(404).json({ message: "Post not found" });

    const prev = old.data();

    // 
    if (prev.authorId !== userId && userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const {
      title,
      content,
      tags,
      coverUrl,
      coverPublicId,
      
      imageURL,
      public_id,
    } = req.body;

    const nextCoverUrl = coverUrl ?? imageURL;
    const nextCoverPublicId = coverPublicId ?? public_id;

    
    if (
      prev.coverPublicId &&
      nextCoverPublicId &&
      nextCoverPublicId !== prev.coverPublicId
    ) {
      try {
        await cloudinary.uploader.destroy(prev.coverPublicId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch (err) {
        console.warn("Cloudinary destroy failed:", err.message);
      }
    }

    const update = {
      ...(title !== undefined && { title: String(title).trim() }),
      ...(content !== undefined && { content: String(content || "") }),
      ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : [] }),
      ...(nextCoverUrl !== undefined && { coverUrl: nextCoverUrl || null }),
      ...(nextCoverPublicId !== undefined && {
        coverPublicId: nextCoverPublicId || null,
      }),
      updatedAt: Timestamp.now(),
    };

    await ref.update(update);
    return res.json({ message: "Post updated" });
  } catch (e) {
    console.error("updatePost error:", e);
    return res.status(500).json({ message: "Update failed" });
  }
};

// DELETE /posts/:id
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "user";

    const postRef = db.collection("posts").doc(id);
    const postSnap = await postRef.get();
    if (!postSnap.exists)
      return res.status(404).json({ message: "Post not found" });

    const post = postSnap.data();

    if (post.authorId !== userId && userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // 
    if (post.coverPublicId) {
      try {
        await cloudinary.uploader.destroy(post.coverPublicId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch (err) {
        console.warn("Cloudinary destroy failed:", err.message);
      }
    }

    //
    const likesColl = postRef.collection("likes");
    await deleteQueryInBatches(likesColl.orderBy(FieldPath.documentId()));

    // 
    const commentsQuery = db
      .collection("comments")
      .where("postId", "==", id)
      .orderBy("createdAt", "asc");
    await deleteQueryInBatches(commentsQuery);

    await postRef.delete();
    return res.json({ message: "Post deleted" });
  } catch (e) {
    console.error("deletePost error:", e);
    return res.status(500).json({ message: "Delete failed" });
  }
};

// 
export const getPosts = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 50);

    const snap = await db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return res.json(posts); // 
  } catch (e) {
    console.error("getPosts error:", e);
    return res.status(500).json({ message: "Fetch failed" });
  }
};

// GET /posts/:id
export const getPostById = async (req, res) => {
  try {
    const snap = await db.collection("posts").doc(req.params.id).get();
    if (!snap.exists)
      return res.status(404).json({ message: "Post not found" });
    return res.json({ id: snap.id, ...snap.data() });
  } catch (e) {
    console.error("getPostById error:", e);
    return res.status(500).json({ message: "Fetch failed" });
  }
};
