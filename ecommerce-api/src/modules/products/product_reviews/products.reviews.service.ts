import { compareIgnoreCase, isEmptyObject } from "@core/utils";
import ProductReviewDto from "../dtos/product.review.dto";
import { IProduct, IProductReview } from "../products.interface";
import ProductSchema from "../products.model";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";

export default class ProductReviewService {
    private modelSchema = ProductSchema;
    private modelName = "Product";

    public async create(parent: string, model: ProductReviewDto): Promise<IProduct>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty");
        }
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.reviews.push({...model} as IProductReview);
        await product.save();
        return product;
    }

    public async update(parent: string, id: string, model: ProductReviewDto): Promise<IProduct>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.reviews = product.reviews.map(f => f._id.toString() === id ? {...f, ...model} as IProductReview : f);
        await product.save();
        return product;
    }

    public async getAll(parent: string): Promise<IProductReview[]>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return product.reviews;
    }

    public async getById(parent: string, id: string): Promise<IProductReview>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        return product.reviews.find(f => f._id.toString() === id) as IProductReview;
    }

    public async getAllPaging(parent: string, keyword: string, page: number): Promise<IPagination<IProductReview>>{
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);

        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }

        const filter = product.reviews.filter(f => compareIgnoreCase(f.name, keyword));
        const items = filter.slice((page - 1) * pageSize, page * pageSize)

        return {
            total: filter.length,
            page,
            pageSize,
            items
        } as IPagination<IProductReview>;
    }

    public async remove(parent:string, id: string): Promise<IProduct>{
        const product = await this.modelSchema.findById(parent);
        if(!product){
            throw new HttpException(400, `${this.modelName} is not exist`);
        }
        product.reviews = product.reviews.filter(f => f._id.toString() !== id);
        await product.save();
        return product;
    }
}