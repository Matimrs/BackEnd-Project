import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { validateRegister } from "../middlewares/validateUser.js";
import { hashing, passwordValidation } from "../utils/crypt.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  validateRegister,
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    try {
      req.session.user = req.user;
      res.status(300).redirect("/");
    } catch (error) {
      console.error(error);

      res.status(400).send(error);
    }
  }
);

sessionRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  async (req, res) => {
    try {
      req.session.user = req.user;
      res.status(300).redirect("/");
    } catch (error) {
      console.error(error);

      res.status(400).send({ error });
    }
  }
);

sessionRouter.post("/logout", async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) return res.status(500).send({ message: "Logout failed" });
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
  passport.authenticate("github", { failureRedirect: "/failLogin" }),
  (req, res) => {
    req.session.user = req.user;
    res.status(300).redirect("/");
  }
);

export default sessionRouter;
