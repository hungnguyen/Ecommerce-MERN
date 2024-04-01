import { Route } from "@core/interfaces";
import { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import { CategoryDto } from "./dtos/category.dto";

export default class CategoriesRoute implements Route{
    public path: string = "/api/v1/categories";
    public router: Router = Router();
    public controller = new CategoriesController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.get(`${this.path}`, this.controller.getAll);
        this.router.get(`${this.path}/:id`, this.controller.getById);
        this.router.get(`${this.path}/paging/:page`, this.controller.getAllPaging);
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CategoryDto,true), this.controller.create);
        this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CategoryDto,true), this.controller.update);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.controller.remove);
    }
}