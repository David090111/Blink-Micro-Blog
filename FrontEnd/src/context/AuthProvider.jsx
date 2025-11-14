// src/context/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import { auth, provider } from "../firebase";

const AuthCtx = createContext(null);

export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================================================
    // 🔄 Listen to auth state (SAFE even when auth=null)
    // ================================================
    useEffect(() => {
        if (!auth) {
            console.warn("[AuthProvider] Firebase auth disabled.");
            setUser(null);
            setLoading(false);
            return;
        }

        const unsub = onAuthStateChanged(auth, (fbUser) => {
            setUser(fbUser);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    // ========================================================
    // 🟢 REGISTER (Safe guard if Firebase is disabled)
    // ========================================================
    const register = async (name, email, password) => {
        if (!auth) {
            return {
                ok: false,
                message: "Authentication is disabled (missing Firebase config).",
            };
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            if (name) {
                await updateProfile(res.user, { name });
            }

            return { ok: true, user: res.user };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    };

    // ========================================================
    // 🔵 LOGIN (Safe guard)
    // ========================================================
    const login = async (email, password) => {
        if (!auth) {
            return {
                ok: false,
                message: "Authentication is disabled (missing Firebase config).",
            };
        }

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            return { ok: true, user: res.user };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    };

    // ========================================================
    // 🟣 LOGIN WITH GOOGLE (Safe guard)
    // ========================================================
    const loginWithGoogle = async () => {
        if (!auth || !provider) {
            return {
                ok: false,
                message: "Google login is disabled (missing Firebase config).",
            };
        }

        try {
            const res = await signInWithPopup(auth, provider);
            return { ok: true, user: res.user };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    };

    // ========================================================
    // 🔴 LOGOUT (Safe guard) <-- New function added
    // ========================================================
    const logout = async () => {
        if (!auth) {
            return {
                ok: false,
                message: "Authentication is disabled (missing Firebase config).",
            };
        }

        try {
            await signOut(auth);
            return { ok: true };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    };

    return (
        <AuthCtx.Provider
            value={{
                user,
                loading,
                register,
                login,
                loginWithGoogle,
                logout, // <-- Exported logout
            }}
        >
            {children}
        </AuthCtx.Provider>
    );
}