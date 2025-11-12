import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-800">Home</h2>
            <p className="mt-2 mb-2 text-gray-700">Welcome back.</p>
            <p className="text-gray-700">To Do: New Posts Feed Here</p>
        </section>
    );
}
