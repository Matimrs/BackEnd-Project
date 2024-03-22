import { findUserByIDService } from "../dao/mongo/services/users.service.js";
import { findCartByIDandPopulateService } from "../dao/mongo/services/carts.service.js";
import {
  findProductsService,
  productsAggregatePaginateService,
  productsAggregateService,
} from "../dao/mongo/services/products.service.js";

export const getHomeView = async (req, res) => {
  try {
    const user = await findUserByIDService(req.user.id);
    const products = await findProductsService();
    res.render("home", { products, user });
  } catch (error) {
    req.logger.error(error)
    res.redirect("/login");
  }
};

export const getRegisterView = (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    req.logger.error(error)
    res.status(400).send(error);
  }
};

export const getFailRegisterView = (req, res) => {
  try {
    res.render("failRegister");
  } catch (error) {
    req.logger.error(error)
    res.status(400).send(error);
  }
};

export const getLoginView = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    req.logger.error(error)
    res.status(400).send(error);
  }
};

export const getFailLoginView = (req, res) => {
  try {
    res.render("failLogin");
  } catch (error) {
    req.logger.error(error)
    res.status(400).send(error);
  }
};

export const getRealTimeProductsView = (req, res) => {
  res.render("realTimeProducts");
};

export const getChatView = (req, res) => {
  const isUser = req.user.role === "user";

  res.render("chat", { isUser });
};

export const getCartView = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await findCartByIDandPopulateService(cid);

    if (!cart) return res.status(404).send({ message: "Cart not found" });

    const products = cart.products;

    res.render("cart", { products });
  } catch (error) {
    req.logger.error(error)

    res.status(500).send(error);
  }
};

export const getProductsView = async (req, res) => {
  try {
    const { page } = req.query;

    const _page = page ? +page : 1;

    const products = await productsAggregatePaginateService(
      await productsAggregateService(),
      { page: _page }
    );

    if (!products)
      return res.status(404).send({ message: "Products not found" });

    res.render("products", products);
  } catch (error) {
    req.logger.error(error)

    res.status(500).send(error);
  }
};

export const getLoggerTest = (req, res) => {
  const date = new Date().toLocaleDateString();

  req.logger.debug("Debug logger - " + date);
  req.logger.http("Http logger - " + date);
  req.logger.info("Info logger - " + date);
  req.logger.warning("Warning logger - " + date);
  req.logger.error("Error logger - " + date);
  req.logger.fatal("Fatal logger - " + date);
  res.send({ message: "Logger works" });
};
