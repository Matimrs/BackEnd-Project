import { getCartService } from "../dao/mongo/services/carts.service.js";

export const validateProducts = (req, res, next) => {
  const { products } = req.body;

  if (typeof products !== typeof [])
    return res.status(400).send({ error: "Invalid format" });

  const typeId = typeof "id";

  let valid = true;

  products.forEach((p) => {
    if (typeof p.product !== typeId) valid = false;
    if (typeof p.quantity !== typeof 1) valid = false;
    if (typeof p._id !== typeId) valid = false;
  });

  if (!valid) return res.status(400).send({ message: "Invalid format" });

  next();
};

export const validateCart = (req, res, next) => {
  const { cid } = req.params;
  const cart = getCartService(cid);

  if (cart.products == []) {
    return res.status(400).send({ message: "Cart empty" });
  }
  next();
};
