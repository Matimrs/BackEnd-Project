import jwt from "jsonwebtoken";
import { COOKIE_TOKEN, TOKEN_SECRET } from "../utils/consts.js";

export const existingUser = (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_TOKEN];

    if (token) {
      return res.redirect("/");
    }

    next();
  } catch (error) {
    res.redirect("/");
  }
};
