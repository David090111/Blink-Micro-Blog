// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // 
import admin from "firebase-admin";
import { db } from "../config/firebase.js";
import { generateTokens } from "../utils/token.js";

/**
 * POST /auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const exists = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (!exists.empty) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const userRef = await db.collection("users").add({
      email,
      name: name || null,
      password: hashed,
      createdAt: new Date(),
      provider: "local",
    });

    return res.status(201).json({ id: userRef.id, message: "User created" });
  } catch (err) {
    return next(err);
  }
};

/**
 * POST /auth/login
 */
export const login = async (req, res, next) => {
  //  login()
  console.log("login headers:", req.headers["content-type"]);
  console.log("login body:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const snap = await db.collection("users").where("email", "==", email).get();
    if (snap.empty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const doc = snap.docs[0];
    const user = { id: doc.id, ...doc.data() };

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 
    const { accessToken, refreshToken } = generateTokens(user.id);

    // 
    return res.status(200).json({
      userId: user.id,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * POST /auth/google
 * body: { idToken }
 */
export const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Missing idToken" });
    }

    //
    const decoded = await admin.auth().verifyIdToken(idToken);
    const uid = decoded.uid;
    const email = decoded.email || null;
    const name = decoded.name || null;
    const picture = decoded.picture || null;

    //
    const userRef = db.collection("users").doc(uid);
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
      await userRef.set({
        email,
        name,
        avatar: picture,
        provider: "google",
        createdAt: new Date(),
      });
    }

    const { accessToken, refreshToken } = generateTokens(uid);

    return res.status(200).json({
      message: "Google login success",
      userId: uid,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

/**
 * POST /auth/refresh
 * body: { refreshToken }
 */
export const refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Missing refreshToken" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const payload = { userId: decoded.userId };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const newRefresh = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ accessToken, refreshToken: newRefresh });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
