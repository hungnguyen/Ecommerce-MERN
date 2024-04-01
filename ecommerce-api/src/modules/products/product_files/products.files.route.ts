import { Route } from "@core/interfaces";
import { Router } from "express";
import ProductFilesController from "./products.files.controller";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import ProductFileDto from "../dtos/product.files.dto";

export default class ProductFilesRoute implements Route{
    public path: string = "/api/v1/products";
    public router: Router = Router();
    public controller = new ProductFilesController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.get(`${this.path}/:parent/files`, this.controller.getAll);
        this.router.get(`${this.path}/:parent/files/:id`, this.controller.getById);
        this.router.get(`${this.path}/:parent/files/paging/:page`, this.controller.getAllPaging);
        this.router.post(`${this.path}/:parent/files`, 
            authMiddleware, 
            validationMiddleware(ProductFileDto, true), 
            this.controller.create);
        this.router.put(`${this.path}/:parent/files/:id`, 
            authMiddleware, 
            validationMiddleware(ProductFileDto,true), 
            this.controller.update);
        this.router.delete(`${this.path}/:parent/files/:id`, authMiddleware, this.controller.remove);
    }
}