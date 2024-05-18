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
    req.logger.error(error);
    res.redirect("/login");
  }
};

export const getRegisterView = (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    req.logger.error(error);
    res.status(400).send(error);
  }
};

export const getFailRegisterView = (req, res) => {
  try {
    res.render("failRegister");
  } catch (error) {
    req.logger.error(error);
    res.status(400).send(error);
  }
};

export const getLoginView = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    req.logger.error(error);
    res.status(400).send(error);
  }
};

export const getFailLoginView = (req, res) => {
  try {
    res.render("failLogin");
  } catch (error) {
    req.logger.error(error);
    res.status(400).send(error);
  }
};

export const getRealTimeProductsView = (req, res) => {
  res.render("realTimeProducts");
};

export const getChatView = async (req, res) => {
  const user = await findUserByIDService(req.user.id);

  const isUser = user.role === "user";

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
    req.logger.error(error);

    res.status(500).send(error);
  }
};

export const getProductsView = async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const _limit = limit ? +limit : 10;

    const _page = page ? +page : 1;

    const _sort = sort ? +sort : 1;

    let match = null;

    if (query) {
      match = { $match: { category: query } };
    }

    const productsAggregate = match
      ? [match, { $sort: { price: _sort } }]
      : [{ $sort: { price: _sort } }];

    const products = await productsAggregatePaginateService(
      await productsAggregateService(productsAggregate),
      { limit: _limit, page: _page }
    );

    if (!products || products.docs.length === 0) {
      products = { status: "error" };
      req.logger.error("Product not found");
      return res.status(404).send({ message: "Products not found" });
    }

    res.render("products", products);
  } catch (error) {
    req.logger.error(error);

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

export const getRestorePasswordView = (req, res) => {
  const { token } = req.params;
  res.render("restorePassword", { token });
};

export const getUserView = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await findUserByIDService(uid);

    res.render("user", user )

  } catch (error) {
    req.logger.error(error);

    res.status(500).send(error);
  }
};
