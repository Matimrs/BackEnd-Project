import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    available: Boolean
});

export const productModel = mongoose.model(productCollection, productSchema);