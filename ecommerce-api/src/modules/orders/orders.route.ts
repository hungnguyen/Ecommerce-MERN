import { Route } from "@core/interfaces";
import { Router } from "express";
import OrdersController from "./orders.controller";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import OrderDto from "./dtos/order.dto";

export default class OrdersRoute implements Route{
    public path = "/api/v1/orders";
    public router = Router();
    public controller = new OrdersController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.path, this.controller.getAll);
        this.router.get(this.path + "/:id", this.controller.getById);
        this.router.get(this.path + "/paging/:page", this.controller.getAllPaging);
        this.router.post(this.path, authMiddleware, validationMiddleware(OrderDto, true), this.controller.create);
        this.router.put(this.path + "/:id", authMiddleware, validationMiddleware(OrderDto, true), this.controller.update);
        this.router.delete(this.path + "/:id", authMiddleware, this.controller.remove);
    }
}