// utils/token.js
import jwt from "jsonwebtoken";

export function generateTokens(user) {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new Error(
      "Missing JWT secrets. Set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET in .env"
    );
  }

  const payload = { sub: user.id, email: user.email };

  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
  });

  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d",
  });

  return { accessToken, refreshToken };
}
