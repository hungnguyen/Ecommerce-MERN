import { Route } from "@core/interfaces";
import { Router } from "express";
import ProductReviewsController from "./products.reviews.controller";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import ProductReviewDto from "../dtos/product.review.dto";

export default class ProductReviewsRoute implements Route{
    public path: string = "/api/v1/products";
    public router: Router = Router();
    public controller = new ProductReviewsController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.get(`${this.path}/:parent/reviews`, this.controller.getAll);
        this.router.get(`${this.path}/:parent/reviews/:id`, this.controller.getById);
        this.router.get(`${this.path}/:parent/reviews/paging/:page`, this.controller.getAllPaging);
        this.router.post(`${this.path}/:parent/reviews`, 
            authMiddleware, 
            validationMiddleware(ProductReviewDto, true), 
            this.controller.create);
        this.router.put(`${this.path}/:parent/reviews/:id`, 
            authMiddleware, 
            validationMiddleware(ProductReviewDto,true), 
            this.controller.update);
        this.router.delete(`${this.path}/:parent/reviews/:id`, authMiddleware, this.controller.remove);
    }
}