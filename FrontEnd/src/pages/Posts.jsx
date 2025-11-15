// src/pages/Posts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Posts() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                setLoading(true);
                setErr("");

                const { data } = await API.get("/posts", {
                    signal: ac.signal,
                });

                setItems(Array.isArray(data) ? data : []);
            } catch (e) {
                if (e.name !== "CanceledError" && e.name !== "AbortError") {
                    console.error(e);
                    setErr("Unable to load stories. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => ac.abort();
    }, []);

    const editPost = (id) => {
        // adjust this route if your edit page uses a different pattern
        navigate(`/stories/${id}/edit`);
    };

    const deletePost = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this story?");
        if (!confirmed) return;

        try {
            console.log("Current items:", items);
            await API.delete(`/posts/${id}`);
            setItems((prev) => prev.filter((p) => p.id !== id));
        } catch (e) {
            console.error(e);
            alert("Unable to delete. You are not own this story.");
        }
    };

    const formatUpdated = (post) => {
        const source = post.updatedAt || post.createdAt;
        if (!source) return null;

        const date = typeof source === "object" && source._seconds ? new Date(source._seconds * 1000) : new Date(source);

        return `Updated ${date.toLocaleDateString()}`;
    };

    const getContent = (post) => {
        // try common field names, fall back gracefully
        return post.content || post.body || "";
    };

    return (
        <section className="space-y-6">
            {/* Page header */}
            <header>
                <h1 className="text-3xl font-bold text-gray-800">All Stories</h1>
                <p className="mt-1 text-sm text-gray-500">All of your stories, shown in full.</p>
            </header>

            <div className="space-y-4">
                {loading && <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-500">Loading your stories…</div>}

                {err && !loading && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{err}</div>}

                {!loading && !err && items.length === 0 && (
                    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
                        You haven&apos;t published any stories yet.
                    </div>
                )}

                {!loading &&
                    !err &&
                    items.length > 0 &&
                    items.map((p) => (
                        <article key={p.id} className="space-y-3 rounded-lg border border-gray-200 bg-white p-5">
                            {/* Title + updated time */}
                            <header className="space-y-1">
                                <h2 className="text-xl font-semibold text-gray-800">{p.title || "Untitled story"}</h2>
                                {formatUpdated(p) && <p className="text-xs text-gray-500">{formatUpdated(p)}</p>}
                            </header>

                            {/* Full image (original look) */}
                            {p.coverUrl && (
                                <div className="overflow-hidden rounded-lg hover:opacity-90 hover:cursor-pointer" onClick={() => navigate(`/stories/${p.id}`)}>
                                    <img src={p.coverUrl} alt={p.title || "Story cover"} className="w-full max-h-[420px] object-cover" />
                                </div>
                            )}
                            

                            {/* Full content */}
                            {getContent(p) && <div className="text-sm text-gray-700 whitespace-pre-wrap hover:opacity-90 hover:cursor-pointer" onClick={() => navigate(`/stories/${p.id}`)}>{getContent(p)}</div>}

                            {/* Footer: actions */}
                            <footer className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => editPost(p.id)}
                                    className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:opacity-90 hover:cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {deletePost(p.id); console.log("Deleting post id:", p.authorId);}}
                                    className="inline-flex items-center rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 hover:opacity-90 hover:cursor-pointer"
                                >
                                    Delete
                                </button>
                            </footer>
                        </article>
                    ))}
            </div>
        </section>
    );
}
