import { findProductByIdService } from "../dao/mongo/services/products.service.js";
import { findUserByIDService } from "../dao/mongo/services/users.service.js";

export const validateRegister = (req, res, next) => {
  const { first_name, last_name, email, age, password } = req.body;

  return "string" === typeof first_name &&
    "string" === typeof last_name &&
    "string" === typeof email &&
    "string" === typeof password &&
    "number" === typeof +age
    ? next()
    : res.status(400).send({ error: "Invalids format" });
};

export const validateUserDeleteProduct = async (req, res, next) => {
  const user = await findUserByIDService(req.user.id);

  const { pid } = req.params;
  
  const product = await findProductByIdService(pid);

  switch (user.role) {
    case "admin":
      next();
      break;
    case "premium":
      if(product.owner !== req.user.id)
      next();
      break;
    default:
      break;
  }

  return res.status(401).send({message: "Unathorized"});
};
