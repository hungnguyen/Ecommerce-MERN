import { HttpException } from "@core/exceptions";
import uploadFile from "@core/middlewares/upload.middleware";
import { NextFunction, Request, Response } from "express";
import fs from "fs";

export default class UploadController{
    public upload = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            await uploadFile(req, res);

            if(!req.file){
                throw new HttpException(400, "Please upload a file");
            }

            res.status(200).json({
                message: "Upload the file successfully",
                filePath: "/uploads/"+req.file.originalname
            });
        }
        catch(e){
            next(e);
        }
    }

    public getFiles = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const directoryPath = process.env.UPLOAD_FOLDER ?? "/uploads/";
            fs.readdir(directoryPath, function(err, files){
                if(err){
                    throw new HttpException(500, "Unable to scan files");
                }
                let fileInfos: any = [];

                files.forEach((file)=>{
                    fileInfos.push({
                        name: file,
                        url: "/uploads/"+file
                    });
                });

                res.status(200).json(fileInfos);
            })
        }
        catch(e){
            next(e);
        }
    }
}