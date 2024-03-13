import { Router } from "express";
import {
  validateCart,
  validateProducts,
} from "../middlewares/validateProducts.js";
import {
  deleteProductFromCart,
  deleteProductsFromCart,
  getCart,
  getCarts,
  postCart,
  postProductToCart,
  putProductFromCart,
  putCart,
  postPurchase,
} from "../controllers/carts.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/auth.js";

const cartsRouter = Router();

cartsRouter.get("/", getCarts);

cartsRouter.post("/", postCart);

cartsRouter.get("/:cid", getCart);

cartsRouter.post(
  "/:cid/product/:pid",
  passport.authenticate("current", { session: false }),
  authorization("user"),
  postProductToCart
);

cartsRouter.delete("/:cid/product/:pid", deleteProductFromCart);

cartsRouter.delete("/:cid", deleteProductsFromCart);

cartsRouter.put("/:cid/product/:pid", putProductFromCart);

cartsRouter.put("/:cid", validateProducts, putCart);

cartsRouter.post(
  "/:cid/purchase",
  passport.authenticate("current", { session: false }),
  validateCart,
  postPurchase
);

export default cartsRouter;
