import { Route } from "@core/interfaces";
import { Router } from "express";
import OrderItemsController from "./order.items.controller";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import OrderItemDto from "../dtos/order.item.dto";

export default class OrderItemsRoute implements Route{
    public path: string = "/api/v1/orders";
    public router: Router = Router();
    public controller = new OrderItemsController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.get(`${this.path}/:parent/items`, this.controller.getAll);
        this.router.get(`${this.path}/:parent/items/:id`, this.controller.getById);
        this.router.get(`${this.path}/:parent/items/paging/:page`, this.controller.getAllPaging);
        this.router.post(`${this.path}/:parent/items`, 
            authMiddleware, 
            validationMiddleware(OrderItemDto, true), 
            this.controller.create);
        this.router.put(`${this.path}/:parent/items/:id`, 
            authMiddleware, 
            validationMiddleware(OrderItemDto,true), 
            this.controller.update);
        this.router.delete(`${this.path}/:parent/items/:id`, authMiddleware, this.controller.remove);
    }
}