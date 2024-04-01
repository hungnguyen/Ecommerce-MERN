import { isEmptyObject } from "@core/utils";
import OrderDto from "./dtos/order.dto";
import { IOrder } from "./orders.interface";
import OrderSchema from "./orders.model";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";

export default class OrderService {
    private modelSchema = OrderSchema;
    private modelName = "Order";

    public async create(model: OrderDto): Promise<IOrder>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty");
        }

        const newItem = new OrderSchema({
            ...model
        });
        const item = await newItem.save();
        return item;
    }

    public async update(id: string, model: OrderDto): Promise<IOrder>{
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

    public async getAll(): Promise<IOrder[]>{
        const items = await this.modelSchema.find().sort({orderDate:-1}).exec();
        return items;
    }

    public async getById(id: string): Promise<IOrder>{
        const item = await this.modelSchema.findById(id).exec();
        if(!item) throw new HttpException(404, `${this.modelName} is not found`);
        return item;
    }

    public async getAllPaging(keyword: string, page: number): Promise<IPagination<IOrder>>{
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);

        let query = {};
        if(keyword){
            query = { "orderCode" : { $regex : new RegExp(keyword, "i") } };
        }

        const items = await this.modelSchema.find(query)
            .sort({orderDate:-1})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const rowCount = await this.modelSchema.find(query).countDocuments().exec();

        return {
            total: rowCount,
            page,
            pageSize,
            items
        } as IPagination<IOrder>;
    }

    public async remove(id: string): Promise<IOrder>{
        const item = await this.modelSchema.findById(id).exec();
        if(!item) throw new HttpException(400, `${this.modelName} is not found`);
        await item.deleteOne();
        return item;
    }
}