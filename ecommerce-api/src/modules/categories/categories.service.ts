import { isEmptyObject } from "@core/utils";
import { ICategory } from "./categories.interface";
import CategorySchema from "./categories.model";
import { CategoryDto } from "./dtos/category.dto";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";

export default class CategoryService {
    private modelSchema = CategorySchema;
    private modelName = "Category";

    public async create(model: CategoryDto): Promise<ICategory>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty");
        }
        const newItem = new CategorySchema({
            ...model
        });
        const item = await newItem.save();
        return item;
    }

    public async update(id: string, model: CategoryDto): Promise<ICategory>{
        const updateId = await this.modelSchema.findByIdAndUpdate(
            id,
            { ...model },
            { new: true }
        ).exec();
        if(!updateId){
            throw new HttpException(400, `${this.modelName} is not exist.`);
        }
        return updateId;
    }

    public async getAll(): Promise<ICategory[]>{
        const items = await this.modelSchema.find().sort({name:1}).exec();
        return items;
    }

    public async getById(id: string): Promise<ICategory>{
        const item = await this.modelSchema.findById(id).exec();
        if(!item) throw new HttpException(404, `${this.modelName} is not found`);
        return item;
    }

    public async getAllPaging(keyword: string, page:number): Promise<IPagination<ICategory>>{
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);
        let query = {};
        if(keyword){
            query = { "name" : { $regex : new RegExp(keyword, "i") } };
        }

        const items = await this.modelSchema.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const total = await this.modelSchema.find(query).countDocuments().exec();

        return {
            total,
            page,
            pageSize,
            items
        } as IPagination<ICategory>;
    }

    public async remove(id: string): Promise<ICategory>{
        const item = await this.modelSchema.findById(id).exec();
        if(!item) throw new HttpException(400, `${this.modelName} is not found.`);
        await item.deleteOne();
        return item;
    }
}