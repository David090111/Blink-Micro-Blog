import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-white mt-16">
            <div className="mx-auto max-w-6xl px-6 py-2">
                {/* Bottom Row: Copyright /About / Resources / Terms / Privacy */}
                <div className="my-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <p>© {new Date().getFullYear()} Blink Micro Blog</p>
                    <div className="space-x-4">
                        <a href="/About" className="hover:underline">
                            About
                        </a>
                        <a href="/Resources" className="hover:underline">
                            Resources
                        </a>
                        <a href="/Terms" className="hover:underline">
                            Terms
                        </a>
                        <a href="/Privacy" className="hover:underline">
                            Privacy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
