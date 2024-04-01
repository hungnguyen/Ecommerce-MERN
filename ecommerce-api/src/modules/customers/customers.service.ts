import { isEmptyObject } from "@core/utils";
import CustomerDto from "./dtos/customer.dto";
import ICustomer from "./customers.interface";
import CustomerSchema from "./customers.model";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";
import { Query } from "mongoose";

export default class CustomerService {
    private modelSchema = CustomerSchema;
    private modelName = "Customer";

    public async create(model: CustomerDto): Promise<ICustomer>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty");
        }

        const newItem = new CustomerSchema({
            ...model
        });
        const item = await newItem.save();
        return item;
    }

    public async update(id: string, model: CustomerDto): Promise<ICustomer>{
        const updateId = await this.modelSchema.findByIdAndUpdate(
            id,
            { ...model },
            { new: true }
        ).exec();
        if(!updateId){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return updateId;
    }

    public async getAll(): Promise<ICustomer[]>{
        const items = await this.modelSchema.find().sort({createDate:-1}).exec();
        return items;
    }

    public async getById(id: string): Promise<ICustomer>{
        const item = await this.modelSchema.findById(id).exec();
        if(!item) throw new HttpException(404, `${this.modelName} is not found`);
        return item;
    }

    public async getAllPaging(keyword: string, page: number): Promise<IPagination<ICustomer>>{
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);

        let query = new Query();
        if(keyword){
            query.or([
                { "firstName" : { $regex : new RegExp(keyword, "i") } },
                { "lastName" : { $regex : new RegExp(keyword, "i") } },
                { "email" : { $regex : new RegExp(keyword, "i") } }
            ]);
        }

        const items = await this.modelSchema.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const rowCount = await this.modelSchema.find(query).countDocuments().exec();

        return {
            total: rowCount,
            page,
            pageSize,
            items
        } as IPagination<ICustomer>;
    }

    public async remove(id: string): Promise<ICustomer>{
        const item = await this.modelSchema.findById(id).exec();
        if(!item) throw new HttpException(400, `${this.modelName} is not found`);
        await item.deleteOne();
        return item;
    }
}