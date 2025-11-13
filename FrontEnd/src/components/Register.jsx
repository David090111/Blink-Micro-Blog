import React from 'react'
import { useState } from 'react';
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";


export const Register = ({onClose, onSwitch}) => {

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
    if (res.ok) {
      navigate("/");
      onClose();
    }
    else setError(res.message);
  };

  const handleGoogle = async () => {
    setError("");
    const res = await loginWithGoogle();
    if (res.ok) {
      navigate("/");
      onClose();
    }
    else setError(res.message);
  };


  return (
    <div>
      <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-80 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm">
              {error}
            </div>
          )}
          <form
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   const data = new FormData(e.currentTarget);
            //   alert(`Logging in: ${data.get("email")}`);
            //   setShowRegister(false);
            onSubmit={handleSubmit}
          >
            <input
              type="name"
              name="username"
              placeholder="Usermane"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full mb-4 px-3 py-2 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full mb-3 px-3 py-2 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full mb-4 px-3 py-2 rounded-md"
            />
            {/* <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="border w-full mb-4 px-3 py-2 rounded-md"
            /> */}
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white px-4 py-2 mt-2 w-full rounded-md hover:opacity-90"
            >
              Create Account
            </button>
          </form>

          <div class="mt-6 flex items-center gap-3">
            <div class="h-px bg-gray-200 flex-1"></div>
            <span class="text-xs text-gray-500">OR</span>
            <div class="h-px bg-gray-200 flex-1"></div>
          </div>
          <div className='flex justify-center'>
            <button 
              className='flex border border-gray-800 rounded-4xl py-2 px-4 mt-4 items-center'
              disabled={loading}
              onClick={handleGoogle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.72 1.23 9.21 3.26l6.85-6.85C36.45 2.57 30.64 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.28 13.6 17.64 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.98 24.55c0-1.62-.15-3.18-.43-4.68H24v9.04h12.94a11.1 11.1 0 0 1-4.83 7.28l7.38 5.73C43.74 37.34 46.98 31.49 46.98 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.54 28.42a14.47 14.47 0 0 1-.75-4.42c0-1.54.27-3.03.75-4.42l-7.98-6.2A23.92 23.92 0 0 0 0 24c0 3.86.92 7.52 2.56 10.62l7.98-6.2z"
                />
                <path
                  fill="#4285F4"
                  d="M24 48c6.48 0 11.92-2.13 15.89-5.79l-7.38-5.73c-2.05 1.38-4.69 2.19-8.51 2.19-6.36 0-11.72-4.1-13.46-9.7l-7.98 6.2C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span className='ml-3 text-sm'>
                Sign in with Google
              </span>
            </button>
          </div>
          <div className='flex justify-center mt-3 text-sm'>
            <p className='mr-1'>Already have an account?</p>
            <button
              className='underline'
              onClick={onSwitch}
            >
              Sign in
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
