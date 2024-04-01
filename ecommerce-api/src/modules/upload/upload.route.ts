import { Route } from "@core/interfaces";
import { Router } from "express";
import UploadController from "./upload.controller";
import { authMiddleware } from "@core/middlewares";

export default class UploadRoute implements Route{
    public path: string = "/api/v1/upload";
    public router: Router = Router();
    public controller = new UploadController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes(){
        this.router.post(this.path, authMiddleware, this.controller.upload);
        this.router.get(this.path + "/files", this.controller.getFiles);
    }
}