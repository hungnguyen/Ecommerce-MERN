import { compareIgnoreCase, isEmptyObject } from "@core/utils";
import OrderItemDto from "../dtos/order.item.dto";
import { IOrder, IOrderItem } from "../orders.interface";
import OrderSchema from "../orders.model";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";

export default class OrderItemService {
    private modelSchema = OrderSchema;
    private modelName = "Order";

    public async create(parent: string, model: OrderItemDto): Promise<IOrder>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty");
        }
        const order = await this.modelSchema.findById(parent);
        if(!order){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        order.items.push({...model} as IOrderItem);
        await order.save();
        return order;
    }

    public async update(parent: string, id: string, model: OrderItemDto): Promise<IOrder>{
        const order = await this.modelSchema.findById(parent);
        if(!order){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        order.items = order.items.map(f => f._id.toString() === id ? {...f, ...model} as IOrderItem : f);
        await order.save();
        return order;
    }

    public async getAll(parent: string): Promise<IOrderItem[]>{
        const order = await this.modelSchema.findById(parent);
        if(!order){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return order.items;
    }

    public async getById(parent: string, id: string): Promise<IOrderItem>{
        const order = await this.modelSchema.findById(parent);
        if(!order){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return order.items.find(f => f._id.toString() === id) as IOrderItem;
    }

    public async getAllPaging(parent: string, keyword: string, page: number): Promise<IPagination<IOrderItem>>{
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);

        const order = await this.modelSchema.findById(parent);
        if(!order){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }

        const filter = order.items.filter(f => compareIgnoreCase(f.name, keyword));
        const items = filter.slice((page - 1) * pageSize, page * pageSize)

        return {
            total: filter.length,
            page,
            pageSize,
            items
        } as IPagination<IOrderItem>;
    }

    public async remove(parent:string, id: string): Promise<IOrder>{
        const order = await this.modelSchema.findById(parent);
        if(!order){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        order.items = order.items.filter(f => f._id.toString() !== id);
        await order.save();
        return order;
    }
}