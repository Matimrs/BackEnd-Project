import { Router } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
  putProduct,
} from "../controllers/products.controller.js";
import passport from "passport";
import { authorization } from "../middlewares/auth.js";
import { validateUserDeleteProduct } from "../middlewares/validateUser.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:pid", getProduct);

productsRouter.post(
  "/",
  passport.authenticate("current", { session: false }),
  authorization("admin"),
  postProduct
);

productsRouter.put(
  "/:pid",
  passport.authenticate("current", { session: false }),
  authorization("admin"),
  putProduct
);

productsRouter.delete(
  "/:pid",
  passport.authenticate("current", { session: false }),
  validateUserDeleteProduct,
  deleteProduct
);



export default productsRouter;
