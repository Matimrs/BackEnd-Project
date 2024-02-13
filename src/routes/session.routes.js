import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { validateRegister } from "../middlewares/validateUser.js";
import { hashing, passwordValidation } from "../utils/crypt.js";
import passport from "passport";
import { generateToken } from "../config/jwt.config.js";
import { COOKIE_TOKEN } from "../utils/consts.js";

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  validateRegister,
  passport.authenticate("register", {
    failureRedirect: "/failRegister",
    session: false,
  }),
  async (req, res) => {
    try {
      const token = generateToken(req.user);
      res
        .cookie(COOKIE_TOKEN, token, {
          maxAge: 60 * 60 * 168,
          httpOnly: true,
        })
        .status(300)
        .redirect("/");
    } catch (error) {
      console.error(error);

      res.status(400).send(error);
    }
  }
);

sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/failLogin",
    session: false,
  }),
  async (req, res) => {
    try {
      const token = generateToken(req.user);
      res
        .cookie(COOKIE_TOKEN, token, {
          maxAge: 60 * 60 * 168,
          httpOnly: true,
        })
        .status(300)
        .redirect("/");
    } catch (error) {
      console.error(error);

      res.status(400).send({ error });
    }
  }
);

sessionRouter.post("/logout", async (req, res) => {
  try {
    res.cookie(COOKIE_TOKEN, "", {
      expires: new Date(0),
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    console.error(error);

    res.status(400).send({ error });
  }
});

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  (req, res) => {}
);

sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/failLogin",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.status(300).redirect("/");
  }
);

sessionRouter.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    try {
      res.send(req.user);
    } catch (error) {
      console.error(error);
      res.status(401).send({ error: "User not found" });
    }
  }
);

export default sessionRouter;
