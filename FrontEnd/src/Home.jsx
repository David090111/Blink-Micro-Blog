// Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import Header from "./components/Header";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <Header />

        {/* Hero / Intro */}
        <section className="mt-6 rounded-2xl bg-white shadow p-6">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {user ? (
              <>
                Welcome back,{" "}
                <span className="text-indigo-700">
                  {user.email || user.uid}
                </span>{" "}
                👋
              </>
            ) : (
              <>
                Share your ideas with{" "}
                <span className="text-indigo-700">Blink</span> ✨
              </>
            )}
          </h1>

          <p className="mt-2 text-gray-600">
            A minimalist micro-blog with authentication and protected routes.
            Browse posts or start writing your own.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/posts")}
              className="rounded-xl border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              View Posts
            </button>

            <button
              onClick={() =>
                user ? navigate("/posts/new") : navigate("/login")
              }
              className={`rounded-xl px-4 py-2 text-white ${
                user ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400"
              }`}
              title={user ? "Create a new post" : "Login to create posts"}
            >
              {user ? "Create Post" : "Login to Create"}
            </button>
          </div>
        </section>

        {/* Quick tips / Shortcuts */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white shadow p-5">
            <h2 className="font-semibold mb-2">Quick Start</h2>
            <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
              <li>Sign in (Email/Password hoặc Google)</li>
              <li>
                Vào <span className="font-medium">Posts</span> để xem danh sách
              </li>
              <li>
                Nhấn <span className="font-medium">New Post</span> để viết bài
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white shadow p-5">
            <h2 className="font-semibold mb-2">Status</h2>
            <div className="text-sm text-gray-700">
              {user ? (
                <p>
                  Authenticated as{" "}
                  <span className="font-medium">{user.email || user.uid}</span>.
                </p>
              ) : (
                <p>Guest mode — please login to create or edit posts.</p>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-gray-500">
          Built with React + Tailwind. © {new Date().getFullYear()} Blink.
        </footer>
      </div>
    </div>
  );
}
