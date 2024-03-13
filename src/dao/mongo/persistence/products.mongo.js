import { productModel } from "../models/product.model.js";

export const productsAggregate = async (array) => {
  return await productModel.aggregate(array);
};

export const productsAggregatePaginate = async (aggregate, options) => {
  return await productModel.aggregatePaginate(aggregate, options);
};

export const findProductByID = async (pid) => {
  return await productModel.findById(pid);
};

export const findOneProduct = async (filters) => {
  return await productModel.findOne(filters);
};

export const createProduct = async (product) => {
  return await productModel.create(product);
};

export const updateOneProduct = async (filter, updates) => {
return await productModel.findOneAndUpdate(filter, updates);
}

export const deleteOneProduct = async (filter) => {
    return await productModel.findOneAndDelete(filter);
}

