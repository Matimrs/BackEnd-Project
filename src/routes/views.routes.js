import { Router } from "express";
import { productModel } from "../models/product.model.js";
import { cartModel } from "../models/cart.model.js";
import { existingUser, isAuth } from "../middlewares/auth.js";

export const viewsRouter = Router();

viewsRouter.get("/", isAuth , async (req, res) => {
  const { user } = req.session;
  const products = await productModel.find().lean();
  res.render("home", { products, user });
});

viewsRouter.get('/register', existingUser, (req, res) => {
  try {
    res.render('register');
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

viewsRouter.get('/login', existingUser, (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

viewsRouter.get("/chat", (req, res) => {
  res.render("chat");
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartModel
      .findById(cid)
      .populate("products.product")
      .lean();

    if (!cart) return res.status(404).send({ message: "Cart not found" });

    const products = cart.products;

    res.render("cart", { products });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const { page } = req.query;

    const _page = page ? +page : 1;

    const products = await productModel.aggregatePaginate(
      productModel.aggregate(),
      { page: _page }
    );

    if (!products)
      return res.status(400).send({ message: "Products not found" });

    res.render("products", products);
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
});


