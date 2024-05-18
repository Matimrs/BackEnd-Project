import { sendDeletionProductEmail } from "../config/mailer.config.js";
import { findUserByID } from "../dao/mongo/persistence/users.mongo.js";
import {
  createProductService,
  deleteOneProductService,
  findOneProductService,
  findProductByIdService,
  getAllMockingProductsService,
  productsAggregatePaginateService,
  productsAggregateService,
  updateOneProductService,
} from "../dao/mongo/services/products.service.js";

export const getProducts = async (req, res) => {
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

    products.payload = products.docs;

    delete products.docs;

    products.status = "success";

    const linkLimit = limit ? `&limit=${_limit}` : "";

    const linkSort = sort ? `&sort=${sort}` : "";

    const linkQuery = query ? `&query=${query}` : "";

    products.nextLink = products.hasNextPage
      ? `/products?page=${_page + 1}${linkLimit + linkQuery + linkSort}`
      : null;

    products.prevLink = products.hasPrevPage
      ? `/products?page=${_page - 1}${linkLimit + linkQuery + linkSort}`
      : null;

    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    
    req.logger.error(error);

    res.status(500).send({ error: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await findProductByIdService(pid);
    if (!product) {
      req.logger.error("Product not found");
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

export const postProduct = async (req, res) => {
  try {
    const product = req.body;
    try {
      const existing = await findOneProductService({ code: product.code });
      if (existing) {
        req.logger.warning("The product already exists");
        return res.status(409).send({ message: "The product already exists" });
      }
      await createProductService({ ...product, available: true });
      return res.status(201).send({ message: "Product added" });
    } catch (error) {
      req.logger.error(error);
      return res.status(400).send({ error: "All fields are required" });
    }
  } catch (error) {
    req.logger.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const putProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    try {
      await updateOneProductService({ _id: pid }, product);
      res.status(201).send({ message: "Product updated" });
    } catch (error) {
      req.logger.error(error);
      res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    req.logger.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = findProductByIdService(pid);

    if (!product) return res.status(404).send({ error: "Product not found" });

    const ownerID = product.owner;

    await deleteOneProductService({ _id: pid });

    if (ownerID !== "admin") {
      const owner = await findUserByID(ownerID);
      await sendDeletionProductEmail(
        owner.email,
        owner.first_name,
        product.title,
        product.code
      );
    }

    res.send({ message: "Product deleted" });
  } catch (error) {
    req.logger.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getMockingProducts = (req, res) => {
  try {
    const quantity = 100;

    const products = getAllMockingProductsService(quantity);

    res.send({ products: [...products] });
  } catch (error) {
    req.logger.error(error);
    res.status(404).send({ message: "Products not found" });
  }
};
