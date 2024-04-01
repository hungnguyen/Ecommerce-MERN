import mongoose from "mongoose";
import { IProduct } from "./products.interface";

const ProductFileSchema = new mongoose.Schema({
    filePath:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
});

const ProductPriceSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    validFrom:{
        type: Date
    },
    validTo:{
        type: Date
    }
});

const ProductReviewSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    },
    score: {
        type: Number
    }
})

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    quantity: {
        type: Number
    },
    status: {
        type: String
    },
    detail: {
        type: String
    },
    badge: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    files: [ProductFileSchema],
    prices: [ProductPriceSchema],
    reviews: [ProductReviewSchema]
});

export default mongoose.model<IProduct & mongoose.Document>('product', ProductSchema);