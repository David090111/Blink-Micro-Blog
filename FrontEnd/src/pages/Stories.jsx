import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ensureDemoSeed,
  getAllPostsNewestFirst,
  // getPost,
  savePost,
  deletePost,
} from "../lib/postsOffice";

// Browser-safe id (UUID if available; fallback to timestamp+rand)
function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("");

  const [mode, setMode] = useState("create"); // "create" | "edit"
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState("");

  const [coverImageData, setCoverImageData] = useState(null);

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    ensureDemoSeed?.();
    refreshList();
  }, []);

  function refreshList() {
    const arr = getAllPostsNewestFirst?.() || [];
    setStories(arr);
  }

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return stories;
    return stories.filter((p) => {
      const t = (p.title || "").toLowerCase();
      const c = (p.content || "").toLowerCase();
      const tags = (p.tags || []).join(",").toLowerCase();
      return t.includes(q) || c.includes(q) || tags.includes(q);
    });
  }, [stories, filter]);

  function onPickFileClick() {
    fileInputRef.current?.click();
  }

  async function onFilesChosen(files) {
    const f = files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB).");
      return;
    }
  }

  function onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }
  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }
  async function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer?.files;
    if (files && files.length) await onFilesChosen(files);
  }

  function clearCover() {
    setCoverImageData(null);
  }

  // -------- CRUD --------
  function startCreate() {
    setMode("create");
    setEditingId(null);
    setTitle("");
    setTagsInput("");
    setContent("");
    clearCover();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function loadForEdit(id) {
    const p = stories.find((x) => x.id === id);
    if (!p) return;
    setMode("edit");
    setEditingId(id);
    setTitle(p.title || "");
    setTagsInput((p.tags || []).join(", "));
    setContent(p.content || "");
    setCoverImageData(p.coverImageData || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function remove(id) {
    if (!confirm("Delete this story? This cannot be undone.")) return;
    deletePost?.(id); // postsOffice should delete by id
    if (mode === "edit" && editingId === id) startCreate();
    refreshList();
  }

  function parseTags(s) {
    return s
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  function onSave() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("Please enter a title.");
      return;
    }
    const tags = parseTags(tagsInput);

    const now = new Date().toISOString();
    const id = editingId || makeId();

    const payload = {
      id,
      title: trimmedTitle,
      content,
      tags,
      coverImageData: coverImageData || null,
      updatedAt: now,
      ...(mode === "create" ? { createdAt: now } : {}),
    };

    // Save to store (upsert by id)
    savePost?.(payload);

    // Refresh and reset editor
    refreshList();
    startCreate();
  }

  // -------- UI --------
  const hasPreview = !!coverImageData;
  const previewSrc = coverImageData || "";

  return (
    <section className="space-y-8">
      {/* Editor */}
      <div className="bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">{mode === "create" ? "Create Your Story" : "Edit Story"}</h2>
          {mode === "edit" && (
              <button onClick={startCreate} className="text-sm rounded-md px-3 py-1.5 border border-gray-300 hover:bg-gray-50">
                  + New
              </button>
          )}
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-800">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My first Blink story"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Tags (comma-separated)</label>
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="demo, hello"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              Cover Image
              <span className="ml-2 text-xs font-normal text-gray-500">(Drag & drop or click to add from computer.)</span>
            </label>

            <div
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={[
                  "mt-1 flex flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-8 cursor-pointer",
                  dragActive ? "border-gray-800 bg-gray-50" : "border-gray-300",
              ].join(" ")}
              onClick={onPickFileClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPickFileClick()}
              aria-label="Choose a cover image file"
            >
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFilesChosen(e.target.files)} />
              <div className="text-center">
                <p className="text-sm text-gray-700">{coverImageData ? "File selected ✔" : "Drop an image here or click to choose"}</p>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG, or GIF (max 5MB)</p>
              </div>
            </div>

            {/* Preview */}
            {hasPreview && (
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Preview</span>
                  <button className="text-sm text-red-600 hover:underline" onClick={clearCover} type="button">
                    Clear cover
                  </button>
                </div>
                <div className="mt-2 overflow-hidden rounded-md border border-gray-200">
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                  <img src={previewSrc} alt="Cover preview image" className="w-full max-h-72 object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your story..."
              rows={10}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={onSave} className="w-28 rounded-md bg-[#FB3243] px-4 py-2 text-white text-xs hover:opacity-95">
              {mode === "create" ? "Create Story" : "Save Changes"}
            </button>
            {mode === "edit" && (
              <button onClick={startCreate} className="rounded-md border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-50">
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 my-4" />

      {/* List */}
      <div className="bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Your Stories</h3>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by title, content, or tags…"
            className="w-64 rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <ul className="mt-6 divide-y divide-gray-200">
          {filtered.length === 0 ? (
            <li className="py-10 text-center text-gray-600">No stories yet.</li>
          ) : (
            filtered.map((p) => {
              const displayImg = p.coverImageData || "";
              return (
                <li key={p.id} className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    {displayImg ? (
                      <img src={displayImg} alt="" className="h-16 w-24 flex-none rounded-md object-cover ring-1 ring-gray-200" />
                    ) : (
                      <div className="h-16 w-24 flex-none rounded-md bg-gray-100 ring-1 ring-gray-200" />
                    )}
                    <div>
                      <Link to={`/stories/${p.id}`} className="text-base font-semibold text-gray-800 hover:underline">
                        {p.title || "(untitled)"}
                      </Link>
                      <div className="mt-1 text-sm text-gray-600 line-clamp-2">{p.content}</div>
                      {p.tags?.length ? (
                        <div className="mt-1 text-xs text-gray-500">
                          {p.tags.map((t) => (
                            <span key={`${p.id}-${t}`} className="mr-2 rounded bg-gray-100 px-2 py-0.5">
                              #{t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadForEdit(p.id)}
                      className="w-20 rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50"
                    >
                        Edit
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="w-20 rounded-md border border-red-300 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </section>
  );
}
