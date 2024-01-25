export const validateRegister = (req, res, next) => {
  const { first_name, last_name, email, age, password } = req.body

  return "string" === typeof first_name &&
    "string" === typeof last_name &&
    "string" === typeof email &&
    "string" === typeof password &&
    "number" === typeof +age
    ? next()
    : res.status(400).send({ error: "Invalids fields" });
};
