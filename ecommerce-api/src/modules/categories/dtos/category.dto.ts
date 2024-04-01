import { IsNotEmpty } from "class-validator";

export class CategoryDto{
    constructor(
        name: string,
        orderNumber: number,
        status: string,
        parent: string
    ){
        this.name = name;
        this.orderNumber = orderNumber;
        this.status = status;
        this.parent = parent;
    }

    @IsNotEmpty()
    public name: string;
    public orderNumber: number;
    public status: string;
    public parent: string;
}