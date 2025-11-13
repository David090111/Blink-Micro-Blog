import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import CoverUploader from "../components/CoverUploader";


import { aiRewrite, aiSuggestTitle, aiSummarize } from "../services/aiApi";

export default function CreatePost() {
  const nav = useNavigate();

  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [coverUrl, setCoverUrl] = useState(null);
  const [coverPublicId, setCoverPublicId] = useState(null);
  const [busy, setBusy] = useState(false);

  const [aiLoading, setAiLoading] = useState(null); // 'suggest', 'summarize', 'rewrite'

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // ---  ---
  const handleAICall = async (type) => {
    
    if (!form.content.trim())
      return alert("enter content before call AI.");

    setAiLoading(type);
    try {
      let res;

      if (type === "suggest") {
      
        res = await aiSuggestTitle(form.content);
        if (res.data?.suggestions?.length > 0) {
         
          setForm((f) => ({ ...f, title: res.data.suggestions[0] }));
          alert(`title template: "${res.data.suggestions[0]}"`);
        } else {
          alert("AI cannot suggest title. Please try again.");
        }
      } else if (type === "summarize") {
        // summarize 
        res = await aiSummarize(form.content);
        if (res.data?.summary) {
          // 
          const newContent = `(TL;DR: ${res.data.summary})\n\n${form.content}`;
          setForm((f) => ({ ...f, content: newContent }));
          alert("Content has been summarized and updated.");
        }
      } else if (type === "rewrite") {
        
        const defaultTone = "friendly, concise, and engaging";
        res = await aiRewrite(form.content, defaultTone);
        if (res.data?.rewritten) {
          setForm((f) => ({ ...f, content: res.data.rewritten }));
          alert(`content afet rewriting: ${defaultTone}`);
        }
      }
    } catch (err) {
      console.error(" AI Error:", err);
      const msg = err?.response?.data?.message || err.message;
      alert(`Error: ${msg}. please check.`);
    } finally {
      setAiLoading(null);
    }
  };
  

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");

    setBusy(true);
    try {
      const tags = Array.from(
        new Set(
          form.tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        )
      );
      const payload = {
        title: form.title.trim(),
        content: form.content || "",
        tags,
        coverUrl: coverUrl || null,
      };

      const { data } = await API.post("/posts", payload);
      nav(`/stories/${data.id}`);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-medium mb-4">Create your story</h1>
      <form className="space-y-4" onSubmit={submit}>
       
        <div className="flex gap-2 items-center">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <button
            type="button"
            onClick={() => handleAICall("suggest")}
            disabled={aiLoading !== null}
            className={`px-3 py-2 text-sm rounded-lg text-white whitespace-nowrap ${
              aiLoading === "suggest" ? "bg-blue-400" : "bg-blue-600"
            }`}
          >
            {aiLoading === "suggest" ? "AI suggesting..." : "Suggest Title"}
          </button>
        </div>
       
        <div className="relative">
          <textarea
            name="content"
            placeholder="Write something..."
            className="w-full border rounded px-3 py-2 min-h-40"
            value={form.content}
            onChange={onChange}
          />
          <div className="flex gap-2 absolute top-2 right-2">
            <button
              type="button"
              onClick={() => handleAICall("summarize")}
              disabled={aiLoading !== null || !form.content.trim()}
              className={`px-3 py-1 text-xs rounded-lg text-white ${
                aiLoading === "summarize" ? "bg-purple-400" : "bg-purple-600"
              }`}
            >
              {aiLoading === "summarize" ? "Summarizing..." : "Summarize"}
            </button>
            <button
              type="button"
              onClick={() => handleAICall("rewrite")}
              disabled={aiLoading !== null || !form.content.trim()}
              className={`px-3 py-1 text-xs rounded-lg text-white ${
                aiLoading === "rewrite" ? "bg-teal-400" : "bg-teal-600"
              }`}
            >
              {aiLoading === "rewrite" ? "Rewriting..." : "Rewrite (Friendly)"}
            </button>
          </div>
        </div>
        
        <input
          name="tags"
          placeholder="tags, comma, separated"
          value={form.tags}
          onChange={onChange}
          className="w-full border rounded px-3 py-2"
        />

        <CoverUploader
          value={coverUrl}
          onChange={setCoverUrl}
          onMeta={({ publicId }) => setCoverPublicId(publicId)}
        />

        <button
          disabled={busy || !form.title.trim() || aiLoading !== null} 
          className={`px-4 py-2 rounded-lg text-white ${
            busy || !form.title.trim() || aiLoading !== null
              ? "bg-gray-400"
              : "bg-black"
          }`}
        >
          {busy ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
}
