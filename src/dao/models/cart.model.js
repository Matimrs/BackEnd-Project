import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = mongoose.Schema({
    products: [
        {
            product: String,
            quantity: Number
        }
    ]
});

export const cartModel =  mongoose.model(cartCollection, cartSchema);