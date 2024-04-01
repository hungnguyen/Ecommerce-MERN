import { isEmptyObject } from "@core/utils";
import ProductDto from "./dtos/product.dto";
import { IProduct } from "./products.interface";
import ProductSchema from "./products.model";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";

export default class ProductService {
    private modelSchema = ProductSchema;
    private modelName = "Product";

    public async create(model: ProductDto): Promise<IProduct>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty");
        }

        const newItem = new ProductSchema({
            ...model
        });
        const item = await newItem.save();
        return item;
    }

    public async update(id: string, model: ProductDto): Promise<IProduct>{
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

    public async getAll(): Promise<IProduct[]>{
        const items = await this.modelSchema.find().sort({updateDate:-1}).exec();
        return items;
    }

    public async getById(id: string): Promise<IProduct>{
        const item = await this.modelSchema.findById(id).exec();
        if(!item) throw new HttpException(404, `${this.modelName} is not found`);
        return item;
    }

    public async getAllPaging(keyword: string, page: number): Promise<IPagination<IProduct>>{
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);

        let query = {};
        if(keyword){
            query = { "name" : { $regex : new RegExp(keyword, "i") } };
        }

        const items = await this.modelSchema.find(query)
            .sort({updateDate:-1})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const rowCount = await this.modelSchema.find(query).countDocuments().exec();

        return {
            total: rowCount,
            page,
            pageSize,
            items
        } as IPagination<IProduct>;
    }

    public async remove(id: string): Promise<IProduct>{
        const item = await this.modelSchema.findById(id).exec();
        if(!item) throw new HttpException(400, `${this.modelName} is not found`);
        await item.deleteOne();
        return item;
    }
}