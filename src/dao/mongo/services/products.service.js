import {
  productsAggregatePaginate,
  productsAggregate,
  findProductByID,
  findOneProduct,
  createProduct,
  updateOneProduct,
  deleteOneProduct,
  getAllMockingProducts,
  findProducts,
} from "../persistence/products.mongo.js";

export const productsAggregateService = (array) => {
  return productsAggregate(array);
};

export const productsAggregatePaginateService = (aggregate, options) => {
  return productsAggregatePaginate(aggregate, options);
};

export const findProductsService = () => {
  return findProducts();
}

export const findProductByIdService = (pid) => {
  return findProductByID(pid);
};

export const findOneProductService = (filters) => {
  return findOneProduct(filters);
};

export const createProductService = (product) => {
  return createProduct(product);
};

export const updateOneProductService = (filter, updates) => {
  return updateOneProduct(filter, updates);
};

export const deleteOneProductService = (filter) => {
  return deleteOneProduct(filter);
};

export const getAllMockingProductsService = (quantity) => {
  return getAllMockingProducts(quantity);
};
