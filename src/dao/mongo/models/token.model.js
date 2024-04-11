import mongoose from "mongoose";

const tokenCollection = "tokens";

const { Schema } = mongoose;

const tokenSchema = new Schema({
  user: {
    type: String,
    unique: true,
  },
  token: String,
  createdAt: Date,
});

export const tokenModel = mongoose.model(tokenCollection, tokenSchema);
