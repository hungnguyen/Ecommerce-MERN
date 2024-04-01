import mongoose from "mongoose";
import ICustomer from "./customers.interface";

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<ICustomer & mongoose.Document>("customer", CustomerSchema);