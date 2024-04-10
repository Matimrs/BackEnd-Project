import dotenv from "dotenv";

dotenv.config();

let PORT, API_SESSION;

if (process.env.ENV_MODE === "development") {
  dotenv.config({ path: ".development.env" });
  PORT = process.env.PORT;
  API_SESSION = process.env.API_SESSION;
} else {
  dotenv.config({ path: ".production.env" });
  PORT = process.env.PORT;
  API_SESSION = process.env.API_SESSION;
}

export default {
  env_mode: process.env.ENV_MODE,
  tokenSecret: process.env.TOKEN_SECRET,
  cookieToken: process.env.COOKIE_TOKEN,
  connectMongo: process.env.CONNECT_MONGO,
  port: PORT,
  clientIDGitHub: process.env.CLIENT_ID_GITHUB,
  clientSecretGitHub: process.env.CLIENT_SECRET_GITHUB,
  callbackURLGitHub: process.env.CALLBACK_URL_GITHUB,
  lastNameGitHub: process.env.GITHUB_LAST_NAME,
  passwordGitHub: process.env.GITHUB_PASSWORD,
  sessionAPI: API_SESSION,
  passwordGoogle: process.env.GOOGLE_PASSWORD,
};
