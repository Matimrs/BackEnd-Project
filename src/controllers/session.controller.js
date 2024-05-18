import config from "../config/config.js";
import { generateToken } from "../config/jwt.config.js";
import { UserDTO } from "../dao/dto/user.dto.js";
import { findOneUserService, findUserByIDAndUpdateService } from "../dao/mongo/services/users.service.js";
import crypto from "crypto";
import { transporter } from "../config/mailer.config.js";
import { createOneTokenService, findOneTokenAndUpdateService, findOneTokenService } from "../dao/mongo/services/tokens.service.js";
import { hashing } from "../utils/crypt.js";

const COOKIE_TOKEN = config.cookieToken;

export const postRegister = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res
      .cookie(COOKIE_TOKEN, token, {
        maxAge: 60 * 60 * 168,
        httpOnly: true,
      })
      .status(200)
      .redirect("/");
  } catch (error) {
    req.logger.error(error);

    res.status(500).send({ error: "Internal server error" });
  }
};

export const postLogin = async (req, res) => {
  try {
    const updatedUser = await findUserByIDAndUpdateService(req.user._id, {last_connection: new Date()});
    const token = generateToken(req.user);
    return res
      .cookie(COOKIE_TOKEN, token, {
        maxAge: 60 * 60 * 168,
        httpOnly: true,
      })
      .status(302)
      .redirect("/");
  } catch (error) {
    req.logger.error(error);

    res.status(500).send({ error: "Internal server error" });
  }
};

export const postLogout = async (req, res) => {
  try {
    const updatedUser = await findUserByIDAndUpdateService(req.user._id, {last_connection: new Date()});
    res.cookie(COOKIE_TOKEN, "", {
      expires: new Date(0),
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    req.logger.error(error);

    res.status(500).send({ error: "Internal server error" });
  }
};

export const getGitHub = (req, res) => {};

export const getGitHubCallBack = (req, res) => {
  req.session.user = req.user;
  res.redirect("/");
};

export const getCurrent = (req, res) => {
  try {
    const { first_name, last_name, age, email, cart, role } = req.user;
    const userDto = new UserDTO(first_name, last_name, age, email, cart, role);
    const user = userDto.getCurrent();
    res.send(user);
  } catch (error) {
    req.logger.error(error);
    res.status(404).send({ error: "User not found" });
  }
};

export const getCurrentCart = async (req, res) => {
  try {

    const user = await findUserByIDService(req.user.id);
    
    const cid = user.cart;

    res.send(cid);
  } catch (error) {
    req.logger.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const postRestorePassword = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = await findOneUserService({ email: email });

    if (!userExists)
      return res.status(404).send({ message: "User not found, wrong mail" });

    const tokenExists = await findOneTokenService({user: userExists._id});

    let token = "";

    if(tokenExists){
      const tokenUpdated = await findOneTokenAndUpdateService({user: userExists._id}, {createdAt: new Date()});

      token = tokenExists.token;
    }
    else{
      token = crypto.randomBytes(20).toString("hex");

      const saveToken = await createOneTokenService({
        user: userExists._id,
        token: token,
        createAt: new Date(),
      });
    }

    const resetLink = `http://localhost:8080/restorePassword/${token}`;

    transporter.sendMail(
      {
        from: "contactmatiasmorales@gmail.com",
        to: email,
        subject: "Restore Password",
        text: `To reset your password, visit the following link: ${resetLink}`,
      },
      (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send("Failed to send email");
        } else {
          console.log("E-mail send: " + info.response);
          res.send("E-mail send");
        }
      }
    );

    res.send({ message: "E-mail send" });
  } catch (error) {
    req.logger.error(error);

    res.status(500).send({ error: "Internal server error" });
  }
};

export const postRestorePasswordWithToken = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    const fullToken = await findOneTokenService({token: token});

    const createdAtDate = new Date(fullToken.createdAt);

    const tokenIsValid = ((Math.abs(new Date() - createdAtDate) / (1000 * 60 * 60)) < 1);

    if (!tokenIsValid) return res.status(401).send({ message: "Token expired" });

    const hashedPassword = await hashing(password);

    const updatedUser = await findUserByIDAndUpdateService(fullToken.user, {password: hashedPassword});

    res.send({ message: "Password updated" });
  } catch (error) {
    req.logger.error(error);

    res.status(500).send({ error: "Internal server error" });
  }
};
