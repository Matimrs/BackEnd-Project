import {
  productsAggregatePaginate,
  productsAggregate,
  findProductByID,
  findOneProduct,
  createProduct,
  updateOneProduct,
  deleteOneProduct
} from "../persistence/products.persistence.js";

export const productsAggregateService = async (array) => {
  return productsAggregate(array);
};

export const productsAggregatePaginateService = (aggregate, options) => {
  return productsAggregatePaginate(aggregate, options);
};

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
}

export const deleteOneProductService = (filter) => {
    return deleteOneProduct(filter);
}