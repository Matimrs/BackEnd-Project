import { Router } from "express";
import { authorization, existingUser } from "../middlewares/auth.js";
import passport from "passport";
import {
  getCartView,
  getChatView,
  getFailLoginView,
  getFailRegisterView,
  getHomeView,
  getLoggerTest,
  getLoginView,
  getProductsView,
  getRealTimeProductsView,
  getRegisterView,
  getRestorePasswordView,
  getUserView,
} from "../controllers/views.controller.js";
import { getMockingProducts } from "../controllers/products.controller.js";


export const viewsRouter = Router();

viewsRouter.get(
  "/",
  passport.authenticate("jwt", { failureRedirect: "/login", session: false }),
  getHomeView
);

viewsRouter.get("/register", existingUser, getRegisterView);

viewsRouter.get("/failRegister", getFailRegisterView);

viewsRouter.get("/login", existingUser, getLoginView);

viewsRouter.get("/failLogin", getFailLoginView);

viewsRouter.get("/realtimeproducts", getRealTimeProductsView);

viewsRouter.get(
  "/chat",
  passport.authenticate("current", { session: false }),
  getChatView
);

viewsRouter.get("/carts/:cid", getCartView);

viewsRouter.get("/products", getProductsView);

viewsRouter.get("/mockingproducts", getMockingProducts);

viewsRouter.get("/loggertest", getLoggerTest);

viewsRouter.get("/restorePassword/:token", getRestorePasswordView)

viewsRouter.get("/user/:uid", passport.authenticate("current", { session: false }), authorization(["admin"]), getUserView)
