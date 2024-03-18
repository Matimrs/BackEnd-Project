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

    let products;

    if (sort) {
      if (query) {
        products = await productsAggregatePaginateService(
          await productsAggregateService([
            {
              $match: {
                category: query,
              },
            },
            {
              $sort: { price: +sort },
            },
          ]),
          { limit: _limit, page: _page }
        );
      } else {
        products = await productsAggregatePaginateService(
          await productsAggregateService([
            {
              $sort: { price: +sort },
            },
          ]),
          { limit: _limit, page: _page }
        );
      }
    } else {
      if (query) {
        products = await productsAggregatePaginateService(
          await productsAggregateService([
            {
              $match: {
                category: query,
              },
            },
          ]),
          { limit: _limit, page: _page }
        );
      } else {
        products = await productsAggregatePaginateService(
          await productsAggregateService([]),
          { limit: _limit, page: _page }
        );
      }
    }

    products.payload = products.docs;

    delete products.docs;

    if (!products) {
      products = { status: "error" };

      return res.status(404).send({ message: "Products not found" });
    }

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

    res.status(500).send({ error: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await findProductByIdService(pid);
    if (!product) {
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
        return res.status(409).send({ message: "The product already exists" });
      }
      await createProductService({ ...product, available: true });
      res.status(201).send({ message: "Product added" });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: "All fields are required" });
    }
  } catch (error) {
    console.error(error);
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
      console.error(error);
      res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    try {
      await deleteOneProductService({ _id: pid });
      res.send({ message: "Product deleted" });
    } catch (error) {
      console.error(error);
      res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getMockingProducts = (req, res) => {
  try {
    const quantity = 100;

    const products = getAllMockingProductsService(quantity);

    res.send({products: [...products]});

  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Products not found" });
  }
};
