// api.js
import axios from "axios";
import { auth } from "./firebase";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE ||
    "https://blog-app-geminiai.onrender.com/api",
});


API.interceptors.request.use(async (config) => {
  const u = auth.currentUser;
  if (u) {
    const idToken = await u.getIdToken(/* forceRefresh */ false);
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

export default API;
