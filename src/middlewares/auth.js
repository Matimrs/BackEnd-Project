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

export const authorization = (roles) => {
  return async (req, res, next) => {

    const user = await findUserByIDService(req.user.id);

    let isAuthorized = false;

    roles.forEach(role => {
      if(user.role === role) isAuthorized = true;
    });

    if(!isAuthorized) return res.status(401).send({message: "Unauthorized"});
    
    next();
}};
