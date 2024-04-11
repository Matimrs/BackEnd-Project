import config from "../config/config.js"
import { findUserByIDService } from "../dao/mongo/services/users.service.js";

export const existingUser = (req, res, next) => {
  try {
    //.env
    const token = req.cookies[config.cookieToken];

    if (token) {
      return res.redirect("/");
    }

    next();
  } catch (error) {
    res.redirect("/");
  }
};

export const authorization = (role) => {
  return async (req, res, next) => {

    const user = await findUserByIDService(req.user.id);
  
    if(user.role != role) return res.status(401).send({message: "Unauthorized"})

    next();

}};
