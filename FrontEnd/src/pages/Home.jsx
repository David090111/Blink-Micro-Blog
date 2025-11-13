import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ensureDemoSeed, getAllPostsNewestFirst } from "../lib/postsOffice";

export default function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        ensureDemoSeed();
        setPosts(getAllPostsNewestFirst());
    }, []);

    const openPost = (id) => {
        navigate(`/stories/${id}`);
    };

    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const estimateReadTime = (content = "") => {
        const words = content.trim().split(/\s+/).filter(Boolean).length;
        const minutes = Math.max(1, Math.round(words / 200));
        return `${minutes} min read`;
    };

    const makeExcerpt = (content = "") => {
        const plain = content.replace(/\n+/g, " ");
        if (plain.length <= 140) return plain;
        return plain.slice(0, 140) + "…";
    };

    return (
        <section className="ml-44 px-6 pt-10">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-4 text-2xl font-bold text-gray-800"></h1>

                {posts.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-600">
                        No stories yet.{" "}
                        <Link to="/stories" className="font-medium text-blue-600 hover:underline">
                            Go to “My Stories”
                        </Link>{" "}
                        to create your first one.
                    </div>
                ) : (
                    <ul className="space-y-8">
                        {posts.map((post) => (
                            <li key={post.id} className="flex gap-4 border-b border-gray-200 pb-6 last:border-b-0">
                                {/* Left side text */}
                                <button type="button" onClick={() => openPost(post.id)} className="flex-1 min-w-0 text-left">
                                    {/* In Collection */}
                                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Blink Stories
                                        {post.tags?.length ? ` · ${post.tags[0]}` : ""}
                                    </p>

                                    {/* Title */}
                                    <h2 className="text-xl font-semibold leading-snug text-gray-800 hover:underline">{post.title || "Untitled story"}</h2>

                                    {/* Subtitle */}
                                    {post.content && <p className="mt-1 text-sm text-gray-600">{makeExcerpt(post.content)}</p>}

                                    {/* Meta row */}
                                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                        <span>{formatDate(post.createdAt || post.updatedAt)}</span>
                                        <span>•</span>
                                        <span>{estimateReadTime(post.content)}</span>
                                        {post.tags?.length ? (
                                            <>
                                                <span>•</span>
                                                <span>{post.tags.join(", ")}</span>
                                            </>
                                        ) : null}
                                    </div>
                                </button>

                                {/* Thumbnail */}
                                {post.coverUrl && (
                                    <button type="button" onClick={() => openPost(post.id)} className="hidden shrink-0 sm:block">
                                        <img src={post.coverUrl} alt={post.title} className="h-24 w-32 rounded-lg object-cover" />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
