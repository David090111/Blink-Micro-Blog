import React, { useState } from "react";
import API from "../api";

export default function CoverUploader({ value, onChange, onMeta }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handlePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type?.startsWith("image/")) {
      setError("Please select an image file.");
      e.target.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image is too large (> 10MB).");
      e.target.value = "";
      return;
    }

    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);

      const { data } = await API.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = data?.secure_url;
      if (!url) throw new Error("Upload succeeded but no URL returned.");

      onChange?.(url); // coverUrl (string)
      onMeta?.({ publicId: data.public_id }); //
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Upload failed");
      console.error("[CoverUploader] error:", err);
    } finally {
      setBusy(false);
      if (e.target) e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {/* <label className="block font-medium">Cover Image</label>
      {!value && (
        <input
          type="file"
          accept="image/*"
          onChange={handlePick}
          disabled={busy}
          className="bg-red-400 text-amber-100 w-39 rounded-2xl p-2"
        />
      )} */}
      <label className="text-sm relative cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handlePick}
          disabled={busy}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      {busy && <p className="text-sm text-gray-600">Uploading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {value && (
        <div>
          <img src={value} alt="cover" className="rounded border max-h-48" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Remove cover
          </button>
        </div>
      )}
    </div>
  );
}
