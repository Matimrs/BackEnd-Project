import mongoose from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const productCollection = 'products';

const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    } ,
    code: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    stock: {
        type: Number, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    available: Boolean
});

productSchema.plugin(mongooseAggregatePaginate);

export const productModel = mongoose.model(productCollection, productSchema);