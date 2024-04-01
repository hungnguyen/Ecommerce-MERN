import { Route } from "@core/interfaces";
import { Router } from "express";
import ProductPricesController from "./products.prices.controller";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import ProductPriceDto from "../dtos/product.prices.dto";

export default class ProductPricesRoute implements Route{
    public path: string = "/api/v1/products";
    public router: Router = Router();
    public controller = new ProductPricesController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.get(`${this.path}/:parent/prices`, this.controller.getAll);
        this.router.get(`${this.path}/:parent/prices/:id`, this.controller.getById);
        this.router.get(`${this.path}/:parent/prices/paging/:page`, this.controller.getAllPaging);
        this.router.post(`${this.path}/:parent/prices`, 
            authMiddleware, 
            validationMiddleware(ProductPriceDto, true), 
            this.controller.create);
        this.router.put(`${this.path}/:parent/prices/:id`, 
            authMiddleware, 
            validationMiddleware(ProductPriceDto,true), 
            this.controller.update);
        this.router.delete(`${this.path}/:parent/prices/:id`, authMiddleware, this.controller.remove);
    }
}