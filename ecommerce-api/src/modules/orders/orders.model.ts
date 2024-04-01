import mongoose from "mongoose";
import { IOrder } from "./orders.interface";

const OrderItemSchema = new mongoose.Schema({
    product:{
        type: String,
        require: true
    },
    quantity:{
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    amount: {
        type: Number,
    },
    name:{
        type: String,
    },
    image:{
        type: String,
    },
})

const OrderSchema = new mongoose.Schema({
    status:{
        type: String,
        default: "new"
    },
    payStatus:{
        type: String
    },
    payMethod:{
        type: String
    },
    orderCode:{
        type: String
    },
    customer:{
        type: String,
        require: true
    },
    note:{
        type: String
    },
    totalAmount:{
        type: Number,
    },
    totalAmountNet:{
        type: Number,
    },
    taxFee:{
        type: Number,
    },
    orderDate:{
        type: Date,
        default: Date.now
    },
    items: [OrderItemSchema]
})

export default mongoose.model<IOrder & mongoose.Document>("order", OrderSchema);