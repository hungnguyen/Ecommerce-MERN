import { compareIgnoreCase, isEmptyObject } from "@core/utils";
import ProductFileDto from "../dtos/product.files.dto";
import { IProduct, IProductFile } from "../products.interface";
import ProductSchema from "../products.model";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";

export default class ProductFileService {
    private modelSchema = ProductSchema;
    private modelName = "Product";

    public async create(parent: string, model: ProductFileDto): Promise<IProduct>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty");
        }
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.files.push({...model} as IProductFile);
        await product.save();
        return product;
    }

    public async update(parent: string, id: string, model: ProductFileDto): Promise<IProduct>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.files = product.files.map(f => f._id.toString() === id ? {...f, ...model} as IProductFile : f);
        await product.save();
        return product;
    }

    public async getAll(parent: string): Promise<IProductFile[]>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return product.files;
    }

    public async getById(parent: string, id: string): Promise<IProductFile>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return product.files.find(f => f._id.toString() === id) as IProductFile;
    }

    public async getAllPaging(parent: string, keyword: string, page: number): Promise<IPagination<IProductFile>>{
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);

        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }

        const filter = product.files.filter(f => compareIgnoreCase(f.name, keyword));
        const items = filter.slice((page - 1) * pageSize, page * pageSize)

        return {
            total: filter.length,
            page,
            pageSize,
            items
        } as IPagination<IProductFile>;
    }

    public async remove(parent:string, id: string): Promise<IProduct>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.files = product.files.filter(f => f._id.toString() !== id);
        await product.save();
        return product;
    }
}