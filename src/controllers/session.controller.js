import config from "../config/config.js";
import { generateToken } from "../config/jwt.config.js";
import { UserDTO } from "../dao/dto/user.dto.js";

const COOKIE_TOKEN = config.cookieToken;

export const postRegister = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res
      .cookie(COOKIE_TOKEN, token, {
        maxAge: 60 * 60 * 168,
        httpOnly: true,
      })
      .status(300)
      .redirect("/");
  } catch (error) {
    console.error(error);

    res.status(400).send(error);
  }
};

export const postLogin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res
      .cookie(COOKIE_TOKEN, token, {
        maxAge: 60 * 60 * 168,
        httpOnly: true,
      })
      .status(300)
      .redirect("/");
  } catch (error) {
    console.error(error);

    res.status(400).send({ error });
  }
};

export const postLogout = async (req, res) => {
  try {
    res.cookie(COOKIE_TOKEN, "", {
      expires: new Date(0),
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    console.error(error);

    res.status(400).send({ error });
  }
};

export const getGitHub = (req, res) => {};

export const getGitHubCallBack = (req, res) => {
  req.session.user = req.user;
  res.status(300).redirect("/");
};

export const getCurrent = (req, res) => {
  try {
    const { first_name, last_name, age ,email, cart, role } = req.user;
    const userDto = new UserDTO( first_name, last_name, age ,email, cart, role );
    const user = userDto.getCurrent();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "User not found" });
  }
};

export const getCurrentCart = async (req, res) => {
  try {
    const cid = req.user.cart;

    res.send(cid);
  } catch (error) {
    console.error(error);
    res.send({ error: error });
  }
};
