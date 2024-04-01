import { IsNotEmpty, NotEquals, ValidateIf } from "class-validator";

export default class ProductFileDto{
    constructor(
        name: string,
        filePath: string){
            this.name = name;
            this.filePath = filePath;
    }
    
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public filePath: string;
}