import mongoose from "mongoose";
import { ICategory } from "./categories.interface";

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    orderNumber:{
        type: String
    },
    status:{
        type: String
    },
    parent:{
        type: String
    }
});

export default mongoose.model<ICategory & mongoose.Document>("category", CategorySchema);