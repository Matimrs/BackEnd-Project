import mongoose from "mongoose";

const userCollection = "users";

const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
});

export const userModel = mongoose.model(userCollection, userSchema);
