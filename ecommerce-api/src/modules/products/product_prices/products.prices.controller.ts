import { NextFunction, Request, Response } from "express";
import ProductPriceService from "./products.prices.service";
import ProductPriceDto from "../dtos/product.prices.dto";

export default class ProductPricesController{
    private service = new ProductPriceService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model: ProductPriceDto = req.body;
            const parent = req.params.parent;
            const result = await this.service.create(parent, model);
            res.status(201).json(result);
        }
        catch(e){
            next(e);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const model: ProductPriceDto = req.body;
            const id = req.params.id;
            const parent = req.params.parent;
            const result = await this.service.update(parent, id, model);
            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const parent = req.params.parent;
            const result = await this.service.getAll(parent);
            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const parent = req.params.parent;
            const id = req.params.id;
            const result = await this.service.getById(parent, id);
            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    public getAllPaging = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const parent = req.params.parent;
            const page: number = Number(req.params.page);
            const keyword = req.query.keyword?.toString() || "";
            const result = await this.service.getAllPaging(parent, keyword, page);
            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const parent = req.params.parent;
            const id = req.params.id;
            const result = await this.service.remove(parent, id);
            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }
}