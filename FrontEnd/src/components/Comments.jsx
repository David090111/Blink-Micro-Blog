import React, { useEffect, useState } from "react";
import API from "../api";

export default function Comments({ postId }) {
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const load = async (cursor) => {
    setBusy(true);
    try {
      const url = cursor
        ? `/posts/${postId}/comments?after=${cursor}`
        : `/posts/${postId}/comments`;
      const { data } = await API.get(url);
      // setItems((prev) => [...prev, ...data.items]);
      setItems((prev) => [...data.items]);
      setNextCursor(data.nextCursor);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    setItems([]);
    setNextCursor(null);
    load(null);
    // eslint-disable-next-line
  }, [postId]);

  const create = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSaving(true);
    try {
      await API.post("/comments", {
        postId,
        content: text.trim(),
      });
      // 
      setItems([]);
      setNextCursor(null);
      setText("");
      await load(null);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditText(c.content);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    await API.put(`/comments/${id}`, { content: editText.trim() });
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, content: editText } : x))
    );
    setEditingId(null);
    setEditText("");
  };

  const remove = async (id) => {
    if (!confirm("Delete this comment?")) return;
    await API.delete(`/comments/${id}`);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comments</h3>

      <form onSubmit={create} className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          className="px-3 py-2 bg-black text-white rounded hover:opacity-90 hover:cursor-pointer"
          disabled={saving}
        >
          {saving ? "Posting..." : "Post"}
        </button>
      </form>

      <ul className="space-y-3">
        {items.map((c) => (
          <li key={c.id} className="border rounded p-3">
            {editingId === c.id ? (
              <div className="space-y-2">
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-black text-white rounded hover:opacity-90 hover:cursor-pointer"
                    onClick={() => saveEdit(c.id)}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 border rounded hover:opacity-90 hover:cursor-pointer"
                    onClick={() => {
                      setEditingId(null);
                      setEditText("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="whitespace-pre-wrap">{c.content}</p>
                <div className="text-xs text-gray-500 mt-2 flex gap-3">
                  <button className="underline hover:opacity-90 hover:cursor-pointer" onClick={() => startEdit(c)}>
                    Edit
                  </button>
                  <button
                    className="underline text-red-600 hover:opacity-90 hover:cursor-pointer"
                    onClick={() => remove(c.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-3">
        {nextCursor ? (
          <button
            className="px-3 py-1 border rounded hover:opacity-90 hover:cursor-pointer"
            onClick={() => load(nextCursor)}
            disabled={busy}
          >
            {busy ? "Loading..." : "Load more"}
          </button>
        ) : items.length > 0 ? (
          <p className="text-xs text-gray-500">No more comments.</p>
        ) : null}
      </div>
    </div>
  );
}
