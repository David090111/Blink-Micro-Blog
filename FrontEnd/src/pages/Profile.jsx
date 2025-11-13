import React, { useState } from "react";

export default function Profile() {
  const [displayName] = useState("");
  const [bio, setBio] = useState("");
  const [savedBio, setSavedBio] = useState("");

  const handleSave = () => {
    setSavedBio(bio.trim());
    alert("Your profile has been saved!");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your bio?")) {
      setBio("");
      setSavedBio("");
    }
  };

  return (
    <section className="text-gray-800">
      {/* User name */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold tracking-tight">{displayName}</h1>
        <button aria-label="More options" className="px-2 py-1 rounded hover:bg-gray-100 text-2xl leading-none">
          …
        </button>
      </div>

      {/* Main card */}
      <div className="mt-8 rounded-md border border-gray-200 bg-gray-50 p-10 text-center">
        {savedBio ? (
          <>
            <h2 className="text-lg font-semibold mb-4">About {displayName}</h2>
            <p className="text-gray-700 whitespace-pre-line">{savedBio}</p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setBio(savedBio);
                  setSavedBio("");
                }}
                className="w-20 inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-20 nline-flex items-center justify-center rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Tell the world about yourself</h2>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
              rows={6}
              className="mt-6 w-full max-w-xl mx-auto rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={handleSave}
                disabled={!bio.trim()}
                className="w-20 inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
              <button
                onClick={handleDelete}
                className="w-20 inline-flex items-center justify-center rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
