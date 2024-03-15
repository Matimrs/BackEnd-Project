import { productModel } from "../models/product.model.js";
import { faker } from "@faker-js/faker";

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
};

export const deleteOneProduct = async (filter) => {
  return await productModel.findOneAndDelete(filter);
};

export const getAllMockingProducts = (quantity) => {
  let products = [];

  for (let i = 0; i < quantity; i++) {
    const product = {
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      decription: faker.commerce.productDescription(),
      code: faker.string.alpha({ length: { min: 5, max: 30 } }),
      price: parseFloat(faker.commerce.price({ min: 100, max: 100000 })),
      stock: faker.number.int({ max: 50000 }),
      category: faker.commerce.product(),
      avalaible: faker.datatype.boolean(),
    };

    products.push(product);
  }

  return products;
};
