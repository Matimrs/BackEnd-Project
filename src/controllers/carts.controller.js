import mongoose from "mongoose";
import {
  createCartService,
  findCartByIDService,
  getCartService,
  getCartsService,
  updateOneCartService,
} from "../services/carts.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await getCartsService();

    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

export const postCart = async (req, res) => {
  try {
    const status = await createCartService();

    res.status(201).send({ message: "Cart created" });
  } catch (error) {
    console.error(error);

    res.status(400).send({ error: "Cart not added" });
  }
};

export const getCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await getCartService(cid);

    if (!cart) {
      res.status(404).send({ error: "Cart not found" });
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

    if (!flag)
      await updateOneCartService(
        { _id: cid },
        { products: [...products, { product: pid, quantity: 1 }] }
      );
    else await updateOneCartService({ _id: cid }, { products: products });

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

    if (!cart) return res.status(400).send({ message: "Cart not found" });

    const product = cart.products.find((p) => p.product.equals(_pid));

    if (!product)
      return res
        .status(400)
        .send({ message: "Product not found in this cart" });

    const productIndex = cart.products.indexOf(product);

    cart.products.splice(productIndex, 1);

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

    if (!status) return res.status(400).send({ message: "Cart not found" });

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

    if (!cart) return res.status(400).send({ message: "Cart not found" });

    const product = cart.products.find((p) => p.product.equals(_pid));

    if (!product)
      return res.status(400).send({ message: "Product not found in the cart" });

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

    if (!cart) return res.status(400).send({ message: "Cart not found" });

    cart.products = products;

    cart.save();

    res.send({ message: "Products modified success" });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};
