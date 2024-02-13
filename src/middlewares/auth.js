<<<<<<< HEAD
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
=======
import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.redirect('/login');
    }
    
    jwt.verify(token, 'm4t14s', (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        next();
    });
};

export const existingUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'm4t14s', (err, decoded) => {
            if (!err) {
                return res.redirect('/');
            }
            next();
        });
    } else {
        next();
    }
};
>>>>>>> 04939e3b36d369fc724bb396220dbe182fcf118e
