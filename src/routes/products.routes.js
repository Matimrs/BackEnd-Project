import { Router } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  postProduct,
  putProduct,
} from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:pid", getProduct);

productsRouter.post("/", postProduct);

productsRouter.put("/:pid", putProduct);

productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
