import mongoose from "mongoose";

const ticketCollection = "tickets";

const { Schema } = mongoose;

const ticketSchema = new Schema({
  code: {
    type: String,
    default: (Math.floor(Math.random() * 99999)).toString() + (Date.now()).toString(),
    unique: true,
  },
  purchase_datatime: {
    type: Date,
    default: Date.now(),
  },
  amount: Number,
  purchaser: String,
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
