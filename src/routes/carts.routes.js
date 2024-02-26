import { Router } from "express";
import { validateProducts } from "../middlewares/validateProducts.js";
import {
  deleteProductFromCart,
  deleteProductsFromCart,
  getCart,
  getCarts,
  postCart,
  postProductToCart,
  putProductFromCart,
  putCart,
} from "../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.get("/", getCarts);

cartsRouter.post("/", postCart);

cartsRouter.get("/:cid", getCart);

cartsRouter.post("/:cid/product/:pid", postProductToCart);

cartsRouter.delete("/:cid/product/:pid", deleteProductFromCart);

cartsRouter.delete("/:cid", deleteProductsFromCart);

cartsRouter.put("/:cid/product/:pid", putProductFromCart);

cartsRouter.put("/:cid", validateProducts, putCart);

export default cartsRouter;
