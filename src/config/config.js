import dotenv from "dotenv";

dotenv.config();

export default {
  tokenSecret: process.env.TOKEN_SECRET,
  cookieToken: process.env.COOKIE_TOKEN,
  connectMongo: process.env.CONNECT_MONGO,
  port: process.env.PORT,
  clientIDGitHub: process.env.CLIENT_ID_GITHUB,
  clientSecretGitHub: process.env.CLIENT_SECRET_GITHUB,
  callbackURLGitHub: process.env.CALLBACK_URL_GITHUB,
  lastNameGitHub: process.env.GITHUB_LAST_NAME,
  passwordGitHub: process.env.GITHUB_PASSWORD,
  sessionAPI: process.env.API_SESSION,
};
