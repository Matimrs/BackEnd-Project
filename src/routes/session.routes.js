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
      res.redirect("/");
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
      res.redirect("/");
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

export default sessionRouter;
