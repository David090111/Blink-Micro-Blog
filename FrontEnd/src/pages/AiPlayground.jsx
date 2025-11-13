import React, { useState } from "react";
import { aiRewrite, aiSuggestTitle, aiSummarize } from "../services/aiApi";

export default function AiPlayground() {
  const [content, setContent] = useState("Today I built a blog with AI…");
  const [tone, setTone] = useState("friendly, concise");
  const [out, setOut] = useState(null);
  const [loading, setLoading] = useState(false);

  const call = async (fn) => {
    try {
      setLoading(true);
      setOut(null);
      let res; 
      if (fn === "rewrite") {
        res = await aiRewrite(content, tone); 
      } else if (fn === "suggest") {
        res = await aiSuggestTitle(content); 
      } else {
        
        res = await aiSummarize(content); 
      }
      setOut(res.data);
    } catch (e) {
      console.error(e);
      setOut({ error: e?.response?.data || e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Playground</h1>
      <textarea
        rows={6}
        style={{ width: "100%" }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste blog content here…"
      />
      <div style={{ marginTop: 8 }}>
        <input
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          placeholder="Tone, e.g. 'funny, casual'"
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => call("suggest")} disabled={loading}>
          Suggest Title
        </button>
        <button onClick={() => call("summarize")} disabled={loading}>
          Summarize
        </button>
        <button onClick={() => call("rewrite")} disabled={loading}>
          Rewrite
        </button>
      </div>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 12,
          marginTop: 12,
        }}
      >
        {loading ? "Loading..." : JSON.stringify(out, null, 2)}
      </pre>
    </div>
  );
}
