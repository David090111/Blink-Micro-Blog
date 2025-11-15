import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register, loginWithGoogle, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await register(name, email, password);
    if (res.ok) navigate("/");
    else setError(res.message);
  };

  const handleGoogle = async () => {
    setError("");
    const res = await loginWithGoogle();
    if (res.ok) navigate("/");
    else setError(res.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring focus:ring-indigo-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring focus:ring-indigo-200"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring focus:ring-indigo-200"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full rounded-xl border border-gray-300 py-2 font-semibold hover:bg-gray-50 disabled:opacity-50"
        >
          Continue with Google
        </button>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
