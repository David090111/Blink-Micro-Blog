import React, { useEffect, useState } from "react";
import API from "../api";

export default function LikeButton({ postId, initialCount = 0 }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get(`/posts/${postId}/likes/me`);
        setLiked(!!data.liked);
      } catch {
        /* ignore */
      }
    })();
  }, [postId]);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (liked) {
        await API.post(`/posts/${postId}/unlike`);
        setLiked(false);
        setCount((c) => Math.max(0, c - 1));
      } else {
        await API.post(`/posts/${postId}/like`);
        setLiked(true);
        setCount((c) => c + 1);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`px-3 py-1 rounded border ${
        liked ? "bg-pink-600 text-white" : ""
      }`}
      disabled={busy}
      title={liked ? "Unlike" : "Like"}
    >
      ❤️ {count}
    </button>
  );
}
