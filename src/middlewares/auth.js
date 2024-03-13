import config from "../config/config.js"

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
  return (req, res, next) => {

    if(req.user.role != role) return res.status(401).send({message: "Unauthorized"})

    next();

}};
