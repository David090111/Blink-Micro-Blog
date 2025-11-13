// src/firebase.js
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// ❗ Bỏ getStorage nếu không dùng Firebase Storage
import { getStorage } from "firebase/storage";

// ===== Check ENV rõ ràng =====
function requireEnv(key) {
  const v = import.meta.env[key];
  if (!v) console.error(`[firebase] Missing env: ${key}`);
  return v;
}

const firebaseConfig = {
  apiKey: requireEnv("VITE_FB_API_KEY"),
  authDomain: requireEnv("VITE_FB_AUTH_DOMAIN"),
  projectId: requireEnv("VITE_FB_PROJECT_ID"),
  storageBucket: requireEnv("VITE_FB_STORAGE_BUCKET"),
  messagingSenderId: requireEnv("VITE_FB_MESSAGING_SENDER_ID"),
  appId: requireEnv("VITE_FB_APP_ID"),
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ===== Core SDKs =====
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence).catch(() => {
  // ignore persistence errors (SSR/Private mode/Strict mode double-init)
});

export const db = getFirestore(app);
export const storage = getStorage(app); // <- bật lại nếu thực sự dùng

export const ts = () => serverTimestamp();
