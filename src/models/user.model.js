import mongoose, { SchemaType } from "mongoose";

const userCollection = "users";

const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart:{
    type: Schema.Types.ObjectId,
    ref: 'carts'
  },
  role:{
    type: String,
    default: 'user'
  }
});

export const userModel = mongoose.model(userCollection, userSchema);
