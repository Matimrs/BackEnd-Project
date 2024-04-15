import { getCartService } from "../dao/mongo/services/carts.service.js";
import { findProductByIdService } from "../dao/mongo/services/products.service.js";

export const validateProducts = (req, res, next) => {
  const { products } = req.body;

  if (typeof products !== typeof [])
    return res.status(400).send({ error: "Invalid format" });

  const typeId = typeof "id";

  let isCreator = false;

  let valid = true;

  products.forEach((p) => {
    if(p.owner === req.user.id) isCreator = true;
    if (typeof p.product !== typeId) valid = false;
    if (typeof p.quantity !== typeof 1) valid = false;
    if (typeof p._id !== typeId) valid = false;
  });

  if (!valid) return res.status(400).send({ message: "Invalid format" });

  if(isCreator) return res.status(400).send({ message: "A created product cannot be purchased by the creator" });

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

export const validateProductOwner = async (req, res, next) => {
  const { cid, pid } = req.params;

  const product = await findProductByIdService(pid);

  if(product.owner !== "admin" && product.owner === req.user.id) return res.status(400).send({ message: "A created product cannot be purchased by the creator" });

  next();
};
