import { Router } from "express";
import { existingUser } from "../middlewares/auth.js";
import passport from "passport";
import {
  getCartView,
  getChatView,
  getFailLoginView,
  getFailRegisterView,
  getHomeView,
  getLoginView,
  getProductsView,
  getRealTimeProductsView,
  getRegisterView,
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

viewsRouter.get("/mockingproducts", getMockingProducts)
