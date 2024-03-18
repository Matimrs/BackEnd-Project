import mongoose from "mongoose";
import {
  createCartService,
  findCartByIDService,
  getCartService,
  getCartsService,
  updateOneCartService,
} from "../dao/mongo/services/carts.service.js";
import { findProductByIdService } from "../dao/mongo/services/products.service.js";
import { ticketModel } from "../dao/mongo/models/ticket.model.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await getCartsService();

    res.status(200).send(carts);
  } catch (error) {
    res.status(404).send({ error: "Carts not found" });
  }
};

export const postCart = async (req, res) => {
  try {
    const status = await createCartService();

    res.status(201).send({ message: "Cart created" });
  } catch (error) {
    console.error(error);

    res.status(422).send({ error: "Cart not created" });
  }
};

export const getCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await getCartService(cid);

    if (!cart) {
      return res.status(404).send({ error: "Cart not found" });
    }

    res.status(200).send(cart.products);
  } catch (error) {
    console.error(error);

    res.status(500).send({ error: "Internal server error" });
  }
};

export const postProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await findCartByIDService(cid);

    let flag = false;

    const _pid = new mongoose.Types.ObjectId(pid);

    const products = cart.products.map((p) => {
      if (p.product.equals(_pid)) {
        flag = true;

        return { product: _pid, quantity: p.quantity + 1 };
      }

      return p;
    });

    if (!flag) products.push({ product: pid, quantity: 1 });

    await updateOneCartService({ _id: cid }, { products: products });

    res.send({ message: "Product added" });
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const _pid = new mongoose.Types.ObjectId(pid);

    const cart = await findCartByIDService(cid);

    if (!cart) return res.status(404).send({ message: "Cart not found" });

    const product = cart.products.find((p) => p.product.equals(_pid));

    if (!product)
      return res
        .status(404)
        .send({ message: "Product not found" });

    cart.products = cart.products.filter(p => !p.product.equals(_pid));

    cart.save();

    res.send({ message: "Product deleted" });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};

export const deleteProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const status = await updateOneCartService({ _id: cid }, { products: [] });

    if (!status) return res.status(404).send({ message: "Cart not found" });

    res.send({ message: "Products deleted from cart" });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};

export const putProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const { quantity } = req.body;

    const _pid = new mongoose.Types.ObjectId(pid);

    const cart = await findCartByIDService(cid);

    if (!cart) return res.status(404).send({ message: "Cart not found" });

    const product = cart.products.find((p) => p.product.equals(_pid));

    if (!product)
      return res.status(404).send({ message: "Product not found" });

    product.quantity = quantity;

    cart.save();

    res.send({ message: "Product updated" });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};

export const putCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const { products } = req.body;

    const cart = await findCartByIDService(cid);

    if (!cart) return res.status(404).send({ message: "Cart not found" });

    cart.products = products;

    cart.save();

    res.send({ message: "Products modified success" });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};

export const postPurchase = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await getCartService(cid);

    let valid = true;

    const insufficientStock = [];

    let amount = 0;

    for (let i = 0; i < cart.products.length; i++) {
      const cartProduct = cart.products[i];

      const product = await findProductByIdService(cartProduct.product);

      if (product.stock - cartProduct.quantity < 0) {
        valid = false;

        insufficientStock.push(cartProduct.product);
      } else {
        product.stock -= cartProduct.quantity;

        product.save();

        amount += product.price * cartProduct.quantity;

        cartProduct.quantity = 0;
      }
    }

    cart.products = cart.products.filter((p) => p.quantity > 0);

    cart.save();

    const purchaser = req.user.email;

    await ticketModel.create({ amount, purchaser });

    if (!valid) {
      return res.send(insufficientStock);
    }

    res.send({ message: "Successful purchase" });
  } catch (error) {
    console.error(error);
    res.status(500).send({error: "Internal server error" });
  }
};
