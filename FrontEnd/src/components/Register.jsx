import React from 'react'
import { useState } from 'react';

export const Register = ({onClose, onSwitch}) => {
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              alert(`Logging in: ${data.get("email")}`);
              // setShowRegister(false);
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="border w-full mb-3 px-3 py-2 rounded-md"
            />
            <input
              type="username"
              name="username"
              placeholder="Usermane"
              required
              className="border w-full mb-4 px-3 py-2 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="border w-full mb-4 px-3 py-2 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="border w-full mb-4 px-3 py-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 w-full rounded-md hover:opacity-90"
            >
              Sign up
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}
