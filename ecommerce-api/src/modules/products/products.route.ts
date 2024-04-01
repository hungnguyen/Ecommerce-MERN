import { Route } from "@core/interfaces";
import { Router } from "express";
import ProductsController from "./products.controller";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import ProductDto from "./dtos/product.dto";

export default class ProductsRoute implements Route{
    public path = "/api/v1/products";
    public router = Router();
    public controller = new ProductsController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.path, this.controller.getAll);
        this.router.get(this.path + "/:id", this.controller.getById);
        this.router.get(this.path + "/paging/:page", this.controller.getAllPaging);
        this.router.post(this.path, authMiddleware, validationMiddleware(ProductDto, true), this.controller.create);
        this.router.put(this.path + "/:id", authMiddleware, validationMiddleware(ProductDto, true), this.controller.update);
        this.router.delete(this.path + "/:id", authMiddleware, this.controller.remove);
    }
}