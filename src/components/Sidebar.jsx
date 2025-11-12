import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && open && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const Item = ({ to, label }) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        onClick={onClose}
        className={`block px-3 py-2 rounded-md transition-colors ${active ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop left rail */}
      <nav className="hidden md:block w-64 shrink-0">
        <div className="sticky top-10 p-4 space-y-1 w-48">
            <Item to="/" label="Home" />
            <Item to="/favorites" label="Favorites" />
            <Item to="/stories" label="My Stories" />
            <Item to="/profile" label="Profile" />
            <Item to="/About" label="About" />
            <Item to="/Resources" label="Resources" />
        </div>
      </nav>

      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl p-4 overflow-y-auto transition-transform duration-200 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Menu</h2>
          <button onClick={onClose} className="px-3 py-1 rounded hover:bg-gray-100">
            Close
          </button>
        </div>
        <div className="space-y-1">
          <Item to="/" label="Home" />
          <Item to="/favorites" label="Favorites" />
          <Item to="/stories" label="My Stories" />
          <Item to="/profile" label="Profile" />
          <Item to="/About" label="About" />
          <Item to="/Resources" label="Resources" />
        </div>
      </aside>
    </>
  );
}
