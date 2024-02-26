import jwt from "jsonwebtoken";
import config from "./config.js";

const TOKEN_SECRET = config.tokenSecret;

export function generateToken(user) {
  const payload = {
    id: user._id,
  };
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: "7d" }); 
}

export function verifyToken(token) {
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (!err) {
      return true;
    }
    return false;
  });
}
