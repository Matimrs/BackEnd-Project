import passport from "passport";
import local from "passport-local";
import { userModel } from "../models/user.model.js";
import { hashing, passwordValidation } from "../utils/crypt.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
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

          const result = await userModel.create({
            first_name,
            last_name,
            email,
            age: +age,
            password: hashedPassword,
          });

          req.session.user = result;

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

          if (!user){
            console.log('Invalid credentials');
            return done(null, false);
          } 

          const passwordValid = await passwordValidation(password, user.password);

          if (!passwordValid){
                console.log('Invalid credentials');
              return done(null, false);
          }
          console.log(user);
          req.session.user = user;

          return done(null, user);
        } catch (error) {
          return done(error);
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
