import { Router } from "express";
import { validateRegister } from "../middlewares/validateUser.js";
import passport from "passport";
import {
  getCurrent,
  getGitHub,
  getGitHubCallBack,
  postLogin,
  postLogout,
  postRegister,
} from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  validateRegister,
  passport.authenticate("register", {
    failureRedirect: "/failRegister",
    session: false,
  }),
  postRegister
);

sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/failLogin",
    session: false,
  }),
  postLogin
);

sessionRouter.post("/logout", postLogout);

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  getGitHub
);

sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/failLogin",
    session: false,
  }),
  getGitHubCallBack
);

sessionRouter.get(
  "/current",
  passport.authenticate("current", { session: false }),
  getCurrent
);

export default sessionRouter;
