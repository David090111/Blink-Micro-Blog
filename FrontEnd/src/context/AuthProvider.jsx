import { createContext, useContext, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

function parseFbError(err) {
  const code = err?.code || err?.message || "";
  if (code.includes("auth/email-already-in-use")) return "Email already exists.";
  if (code.includes("auth/weak-password")) return "Password must be ≥ 6 characters.";
  if (code.includes("auth/invalid-email")) return "Invalid email.";
  if (code.includes("auth/operation-not-allowed")) return "Provider not enabled.";
  return code || "Registration failed.";
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // theo dõi phiên
  onAuthStateChanged(auth, (u) => setUser(u));

  const register = async (name, email, password) => {
    if (loading) return { ok: false, message: "Processing..." };
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password); // ✅ 1 lần duy nhất
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      // nếu cần gọi backend tạo hồ sơ/mint JWT thì gọi tiếp ở đây (1 lần)
      return { ok: true, user: cred.user };
    } catch (err) {
      console.error("register error:", err);
      return { ok: false, message: parseFbError(err) };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    if (loading) return { ok: false, message: "Processing..." };
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return { ok: true, user: cred.user };
    } catch (err) {
      return { ok: false, message: "Wrong email or password." };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    if (loading) return { ok: false, message: "Processing..." };
    setLoading(true);
    try {
      const prov = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, prov);
      return { ok: true, user: cred.user };
    } catch (err) {
      return { ok: false, message: "Google sign-in failed." };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCtx.Provider
      value={{ user, loading, register, login, loginWithGoogle }}
    >
      {children}
    </AuthCtx.Provider>
  );
}
