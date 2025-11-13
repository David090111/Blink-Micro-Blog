// src/pages/Posts.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Posts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

useEffect(() => {
  const ac = new AbortController();

  (async () => {
    setLoading(true);
    setErr("");
    try {
      const { data } = await API.get("/posts", { signal: ac.signal });
      console.log("[/posts] response =", data); // 👈 xem dữ liệu thực tế

      // chấp nhận nhiều dạng: [], {posts:[]}, {items:[]}, {data:[]}
      const list =
        (Array.isArray(data) && data) ||
        (Array.isArray(data?.posts) && data.posts) ||
        (Array.isArray(data?.items) && data.items) ||
        (Array.isArray(data?.data) && data.data) ||
        [];

      // chuẩn hoá id/slug & các field cần thiết
      const normalized = list.map((p) => ({
        id: p.id || p._id || p.slug || p.docId,
        title: p.title ?? "",
        content: p.content ?? "",
        tags: Array.isArray(p.tags) ? p.tags : [],
        coverUrl: p.coverUrl || p.imageURL || null,
        createdAt: p.createdAt ?? null,
      }));

      setItems(normalized);
    } catch (e) {
      if (e.name !== "CanceledError" && e.name !== "AbortError") {
        setErr(e?.response?.data?.message || e.message || "Load posts failed");
      }
    } finally {
      setLoading(false);
    }
  })();

  return () => ac.abort();
}, []);


  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">All Stories</h1>
        <Link
          to="/stories/new"
          className="px-3 py-2 bg-black text-white rounded-lg"
        >
          New Story
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && err && <p className="text-red-600">{err}</p>}
      {!loading && !err && items.length === 0 && (
        <p className="text-gray-500">No posts yet.</p>
      )}

      {!loading && !err && items.length > 0 && (
        <ul className="space-y-4">
          {items.map((p) => {
            const key = p.id || p.slug;
            return (
              <li key={key} className="border rounded-lg hover:shadow-sm">
                <Link to={`/stories/${key}`} className="block p-3">
                  
                  {p.coverUrl && (
                    <img
                      src={p.coverUrl}
                      alt=""
                      className="mb-3 w-full max-h-56 object-cover rounded-md"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {p.content}
                  </p>

                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-gray-100"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                 
                  {p.createdAt && (
                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(
                        p.createdAt._seconds
                          ? p.createdAt._seconds * 1000
                          : p.createdAt
                      ).toLocaleString()}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
