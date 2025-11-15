import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ensureDemoSeed, getAllPostsNewestFirst } from "../lib/postsOffice";
import home from "../assets/homepicture.jpg";
import { useAuth } from "../context/AuthProvider";


export default function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        ensureDemoSeed();
        setPosts(getAllPostsNewestFirst());
    }, []);

    const openPost = (id) => {
        navigate(`/stories/${id}`);
    };

    return (
        <section className="space-y-6">
            {/* {console.log("User in Home:", user)} */}
            {/* Page header */}
            <header>
                <h1 className="text-3xl font-bold text-gray-800">
                    {user ? (
                        <>Welcome <span className="text-red-500">{user.displayName}</span> ! 👋</>
                    ) : (
                        <>Welcome to save your story!</>
                    )}
                </h1>
                
                {/* <p className="mt-1 text-sm text-gray-500">Your latest stories at a glance.</p> */}
            </header>

            {/* Recent stories */}
            <div className="space-y-3 rounded-2xl">
                {/* <h2 className="text-lg font-semibold text-gray-800">Recent stories</h2> */}

                {/* {posts.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
                        You don&apos;t have any stories yet.
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
                        {posts.slice(0, 5).map((post) => (
                            <li key={post.id} className="flex gap-4 p-4">
                                <button type="button" onClick={() => openPost(post.id)} className="flex-1 text-left">
                                    <h3 className="text-base font-semibold text-gray-800 line-clamp-1">{post.title || "Untitled story"}</h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {post.updatedAt ? `Updated ${new Date(post.updatedAt).toLocaleDateString()}` : "Recently added"}
                                    </p>
                                    {post.excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>}
                                </button>

                                {post.coverUrl && (
                                    <button type="button" onClick={() => openPost(post.id)} className="hidden shrink-0 sm:block">
                                        <img src={post.coverUrl} alt={post.title} className="h-24 w-32 rounded-lg object-cover" />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )} */}
                <img src={home} alt="" />
            </div>
        </section>
    );
}
