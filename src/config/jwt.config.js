import jwt from "jsonwebtoken";

export function generateToken(user) {
  const payload = {
    id: user._id,
  };
  return jwt.sign(payload, "m4t14s", { expiresIn: "7d" });
}
