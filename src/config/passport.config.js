import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import local from "passport-local";
import { userModel } from "../dao/mongo/models/user.model.js";
import { cartModel } from "../dao/mongo/models/cart.model.js";
import { hashing, passwordValidation } from "../utils/crypt.js";
import { Strategy as GitHubStrategy } from "passport-github2";
import config from "./config.js";

const COOKIE_TOKEN = config.cookieToken;

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
  const cookieExtractor = (req) => {
    let token = null;
    try {
      if (req && req.cookies) {
        token = req.cookies[COOKIE_TOKEN]; 
      }
    } catch (error) {
      console.error(error);
    }
    return token;
  };
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }
          const hashedPassword = await hashing(password);

          if (!hashedPassword) return done("Error saving password", false);

          const cart = await cartModel.create({ products: [] });

          if (!cart) {
            return done("Error creating cart", false);
          }

          const result = await userModel.create({
            first_name,
            last_name,
            email,
            age: +age,
            password: hashedPassword,
            cart: cart._id,
          });

          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            console.log("Invalid credentials");
            return done(null, false);
          }

          const passwordValid = await passwordValidation(
            password,
            user.password
          );

          if (!passwordValid) {
            console.log("Invalid credentials");
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.clientIDGitHub,
        clientSecret: config.clientSecretGitHub,
        callbackURL: config.callbackURLGitHub,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const OldUser = await userModel.findOne({
            email: profile._json.email ?? profile.username,
          });

          const cart = await cartModel.create({ products: [] });

          if (!cart) {
            return done("Error creating cart", false);
          }

          if (!OldUser) {
            const newUser = {
              first_name: profile._json.name.split(" ")[0],
              last_name: profile._json.name.split(" ")[1] ?? config.lastNameGitHub, 
              age: 18,
              email: profile._json.email ?? profile.username,
              password: config.passwordGitHub,
              cart: cart._id,
            };
            const user = await userModel.create(newUser);

            return done(null, user);
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.tokenSecret,
      },
      async (payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        //.env
        secretOrKey: config.tokenSecret,
      },
      async (payload, done) => {
        try {
          const user = await userModel.findById(payload.id);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};
