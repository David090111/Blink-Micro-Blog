import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api";
import LikeButton from "../components/LikeButton";
import Comments from "../components/Comments";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState(null);
  const [busy, setBusy] = useState(true);

  const load = async () => {
    setBusy(true);
    try {
      const { data } = await API.get(`/posts/${id}`);
      // console.log("Loaded post data:", data);
      setPost(data);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const remove = async () => {
    if (!confirm("Delete this post?")) return;
    await API.delete(`/posts/${id}`);
    nav("/stories");
  };

  if (busy) return <div className="max-w-3xl mx-auto p-4">Loading...</div>;
  if (!post) return <div className="max-w-3xl mx-auto p-4">Not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex gap-2">
          <Link to={`/stories/${id}/edit`} className="px-3 py-1 border rounded hover:bg-gray-50 hover:opacity-90  hover:cursor-pointer">
            Edit
          </Link>
          <button
            onClick={remove}
            className="px-3 py-1 border rounded text-red-600 hover:bg-red-50 hover:opacity-90 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {post.coverUrl ? (
        <img
          src={post.coverUrl}
          alt="cover"
          className="w-full rounded border mb-4"
        />
      ) : null}

      <div className="prose max-w-none whitespace-pre-wrap">{post.content}</div>

      <div className="flex items-center gap-3 mt-4">
        <LikeButton postId={id} initialCount={post.likesCount || 0} />
        <span className="text-sm text-gray-500">
          {post.commentCount || 0} comments
        </span>
      </div>

      <Comments postId={id} />
    </div>
  );
}
