import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { validateRegister } from "../middlewares/validateUser.js";

const sessionRouter = Router();

sessionRouter.post("/register", validateRegister, async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) return res.status(400).send({ message: "User not added" });
    const result = await userModel.create({
      first_name,
      last_name,
      email,
      age: +age,
      password,
    });

    req.session.user = result;

    res.redirect('/');
  } catch (error) {
    console.error(error);

    res.status(400).send(error);
  }
});

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });

    if (!user) return res.status(404).send({ error: "User not found" });

    if (password !== user.password)
      return res.status(400).send({ error: "Invalids credentials" });

    req.session.user = user;

    res.redirect("/");
  } catch (error) {
    console.error(error);

    res.status(400).send({ error });
  }
});

sessionRouter.post("/logout", async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) return res.status(500).send({ message: "Logout failed" });
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    console.error(error);

    res.status(400).send({ error });
  }
});

export default sessionRouter;
