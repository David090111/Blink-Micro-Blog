import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open = false, onClose = () => {} }) {
    const { pathname } = useLocation();

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && open && onClose();
        document.addEventListener("keydown", onKey);
        // console.log(open);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const Item = ({ to, label, icon }) => {
        const active = pathname === to;
        return (
            <Link
                to={to}
                onClick={onClose}
                className={`block px-2 py-2 rounded-md transition-colors ${active ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
            >
                <div className="flex items-center gap-3">
                    {icon}
                    {label}
                </div>
            </Link>
        );
    };

    return (
        <>
            {/* Desktop left rail */}
            <nav className="hidden md:block w-56 shrink-0">
                <div className="sticky mt-6 space-y-2">
                    <Item
                        to="/"
                        label="Home"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-linejoin="round"
                                    d="M4.5 21.25V10.875a.25.25 0 0 1 .1-.2l7.25-5.438a.25.25 0 0 1 .3 0l7.25 5.438a.25.25 0 0 1 .1.2V21.25a.25.25 0 0 1-.25.25h-4.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v5.5a.25.25 0 0 1-.25.25h-4.5a.25.25 0 0 1-.25-.25Z"
                                ></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m22 9-9.1-6.825a1.5 1.5 0 0 0-1.8 0L2 9"></path>
                            </svg>
                        }
                    />
                    {/* <Item to="/favorites" label="Favorites" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" d="M6.44 6.69a1.5 1.5 0 0 1 1.06-.44h9a1.5 1.5 0 0 1 1.06.44l.354-.354-.353.353A1.5 1.5 0 0 1 18 7.75v14l-5.694-4.396-.306-.236-.306.236L6 21.75v-14c0-.398.158-.78.44-1.06Z"></path><path stroke="currentColor" stroke-linecap="round" d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5"></path></svg>}/> */}
                    <Item
                        to="/stories"
                        label="Stories"
                        icon={
                            // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            //     <path
                            //         fill="currentColor"
                            //         d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
                            //     ></path>
                            //     <path
                            //         stroke="currentColor"
                            //         d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
                            //     ></path>
                            // </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    d="M4.75 21.5h14.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .138.112.25.25.25Z"
                                ></path>
                                <path stroke="currentColor" stroke-linecap="round" d="M8 8.5h8M8 15.5h5M8 12h8"></path>
                            </svg>
                         }
                    />
                    {/* <Item to="/profile" label="Profile" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle><path stroke="currentColor" stroke-linecap="round" d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"></path></svg>}/> */}
                    <Item
                        to="/About"
                        label="About"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    d="M4.75 21.5h14.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .138.112.25.25.25Z"
                                ></path>
                                <path stroke="currentColor" stroke-linecap="round" d="M8 8.5h8M8 15.5h5M8 12h8"></path>
                            </svg>
                        }
                    />
                    <Item
                        to="/Resources"
                        label="Resources"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    d="M6.44 6.69a1.5 1.5 0 0 1 1.06-.44h9a1.5 1.5 0 0 1 1.06.44l.354-.354-.353.353A1.5 1.5 0 0 1 18 7.75v14l-5.694-4.396-.306-.236-.306.236L6 21.75v-14c0-.398.158-.78.44-1.06Z"
                                ></path>
                                <path stroke="currentColor" stroke-linecap="round" d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5"></path>
                            </svg>
                        }
                    />
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
                <div className="space-y-1 w-48">
                    <Item
                        to="/"
                        label="Home"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-linejoin="round"
                                    d="M4.5 21.25V10.875a.25.25 0 0 1 .1-.2l7.25-5.438a.25.25 0 0 1 .3 0l7.25 5.438a.25.25 0 0 1 .1.2V21.25a.25.25 0 0 1-.25.25h-4.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v5.5a.25.25 0 0 1-.25.25h-4.5a.25.25 0 0 1-.25-.25Z"
                                ></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m22 9-9.1-6.825a1.5 1.5 0 0 0-1.8 0L2 9"></path>
                            </svg>
                        }
                    />
                    {/* <Item to="/favorites" label="Favorites" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" d="M6.44 6.69a1.5 1.5 0 0 1 1.06-.44h9a1.5 1.5 0 0 1 1.06.44l.354-.354-.353.353A1.5 1.5 0 0 1 18 7.75v14l-5.694-4.396-.306-.236-.306.236L6 21.75v-14c0-.398.158-.78.44-1.06Z"></path><path stroke="currentColor" stroke-linecap="round" d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5"></path></svg>}/> */}
                    <Item
                        to="/stories"
                        label="Stories"
                        icon={
                            // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            //     <path
                            //         fill="currentColor"
                            //         d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
                            //     ></path>
                            //     <path
                            //         stroke="currentColor"
                            //         d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
                            //     ></path>
                            // </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    d="M4.75 21.5h14.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .138.112.25.25.25Z"
                                ></path>
                                <path stroke="currentColor" stroke-linecap="round" d="M8 8.5h8M8 15.5h5M8 12h8"></path>
                            </svg>
                        }
                    />
                    {/* <Item to="/profile" label="Profile" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle><path stroke="currentColor" stroke-linecap="round" d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"></path></svg>}/> */}
                    <Item
                        to="/About"
                        label="About"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    d="M4.75 21.5h14.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .138.112.25.25.25Z"
                                ></path>
                                <path stroke="currentColor" stroke-linecap="round" d="M8 8.5h8M8 15.5h5M8 12h8"></path>
                            </svg>
                        }
                    />
                    <Item
                        to="/Resources"
                        label="Resources"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    d="M6.44 6.69a1.5 1.5 0 0 1 1.06-.44h9a1.5 1.5 0 0 1 1.06.44l.354-.354-.353.353A1.5 1.5 0 0 1 18 7.75v14l-5.694-4.396-.306-.236-.306.236L6 21.75v-14c0-.398.158-.78.44-1.06Z"
                                ></path>
                                <path stroke="currentColor" stroke-linecap="round" d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5"></path>
                            </svg>
                        }
                    />
                </div>
            </aside>
        </>
    );
}
