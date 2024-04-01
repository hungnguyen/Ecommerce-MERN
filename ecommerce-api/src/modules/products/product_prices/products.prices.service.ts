import { compareIgnoreCase, isEmptyObject } from "@core/utils";
import ProductPriceDto from "../dtos/product.prices.dto";
import { IProduct, IProductPrice } from "../products.interface";
import ProductSchema from "../products.model";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";

export default class ProductPriceService {
    private modelSchema = ProductSchema;
    private modelName = "Product";

    public async create(parent: string, model: ProductPriceDto): Promise<IProduct>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty");
        }
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.prices.push({...model} as IProductPrice);
        await product.save();
        return product;
    }

    public async update(parent: string, id: string, model: ProductPriceDto): Promise<IProduct>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.prices = product.prices.map(f => f._id.toString() === id ? {...f, ...model} as IProductPrice : f);
        await product.save();
        return product;
    }

    public async getAll(parent: string): Promise<IProductPrice[]>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return product.prices;
    }

    public async getById(parent: string, id: string): Promise<IProductPrice>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return product.prices.find(f => f._id.toString() === id) as IProductPrice;
    }

    public async getAllPaging(parent: string, keyword: string, page: number): Promise<IPagination<IProductPrice>>{
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);

        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }

        const filter = product.prices.filter(f => compareIgnoreCase(f.name, keyword));
        const items = filter.slice((page - 1) * pageSize, page * pageSize)

        return {
            total: filter.length,
            page,
            pageSize,
            items
        } as IPagination<IProductPrice>;
    }

    public async remove(parent:string, id: string): Promise<IProduct>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.prices = product.prices.filter(f => f._id.toString() !== id);
        await product.save();
        return product;
    }
}