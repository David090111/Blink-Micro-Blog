import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const ENV_KEYS = ["VITE_FB_API_KEY", "VITE_FB_AUTH_DOMAIN", "VITE_FB_PROJECT_ID", "VITE_FB_STORAGE_BUCKET", "VITE_FB_MESSAGING_SENDER_ID", "VITE_FB_APP_ID"];

const hasFirebaseEnv = ENV_KEYS.every((k) => !!import.meta.env[k]);

if (!hasFirebaseEnv) {
    console.warn("[firebase] Firebase disabled – missing VITE_FB_* env vars. App will run without Firebase.");
}

let app = null;

if (hasFirebaseEnv) {
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FB_API_KEY,
        authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FB_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FB_APP_ID,
    };

    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
}

// ===== Exports =====
export { app };

// If Firebase is disabled, these will be null.
// Your UI code should check for null before calling methods.
export const auth = app ? getAuth(app) : null;
export const provider = app ? new GoogleAuthProvider() : null;

if (app) {
    setPersistence(auth, browserLocalPersistence).catch(() => {
        // ignore persistence errors
    });
}

export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export const ts = () => (app ? serverTimestamp() : null);
