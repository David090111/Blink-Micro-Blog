// Backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { admin } from "../config/firebase.js";

const JWT_SECRET =
  process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET || "change-me";

export async function authMiddleware(req, res, next) {
  const hdr = req.headers.authorization || "";
  if (!hdr.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }
  const token = hdr.slice(7);

  
  try {
    const p = jwt.verify(token, JWT_SECRET);
    const id = p.userId || p.id || p.sub || p.uid || p.user_id;
    if (id) {
      req.user = { id, email: p.email || null, role: p.role || "user" };
      return next();
    }
  } catch (e) {
    /* ignore */
  }

  
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { id: decoded.uid, email: decoded.email || null, role: "user" };
    return next();
  } catch (e2) {
    console.error("auth verify error:", e2.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
export default authMiddleware;
