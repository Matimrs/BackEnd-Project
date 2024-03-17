import { cartModel } from "../models/cart.model.js";

export const getCartsPersistence = async () => {
  return await cartModel.find().populate("products.product");
};

export const createCart = async () => {
  return await cartModel.create({ products: [] });
};

export const getCartPersistence = async (cid) => {
  return await cartModel.findOne({ _id: cid }).populate("products.product");
};

export const findCartByID = async (cid) => {
  return await cartModel.findById(cid);
};

export const findCartByIDandPopulate = async (cid) => {
  return await cartModel.findById(cid).populate("products.product").lean();
};

export const updateOneCart = async (filter, updates) => {
  return await cartModel.updateOne(filter, updates);
};
