import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import CoverUploader from "../components/CoverUploader";

export default function EditPost() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [cover, setCover] = useState({ imageURL: "", public_id: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await API.get(`/posts/${id}`);
      setForm({
        title: data.title || "",
        content: data.content || "",
        tags: (data.tags || []).join(", "),
      });
      setCover({
        imageURL: data.imageURL || "",
        public_id: data.public_id || "",
      });
    })();
  }, [id]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await API.put(`/posts/${id}`, {
        title: form.title.trim(),
        content: form.content,
        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        imageURL: cover.imageURL,
        public_id: cover.public_id,
      });
      nav(`/posts/${id}`);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form className="space-y-4" onSubmit={submit}>
        <input
          name="title"
          className="w-full border rounded px-3 py-2"
          value={form.title}
          onChange={onChange}
        />
        <textarea
          name="content"
          className="w-full border rounded px-3 py-2 min-h-40"
          value={form.content}
          onChange={onChange}
        />
        <input
          name="tags"
          className="w-full border rounded px-3 py-2"
          value={form.tags}
          onChange={onChange}
        />

        <CoverUploader value={cover} onChange={setCover} />

        <button
          className="px-4 py-2 bg-black text-white rounded-lg"
          disabled={busy}
        >
          {busy ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
