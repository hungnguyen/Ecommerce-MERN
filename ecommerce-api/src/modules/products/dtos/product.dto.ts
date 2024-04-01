import { IsNotEmpty } from "class-validator";

export default class ProductDto{
    constructor(
        name: string,
        quantity: number,
        status: string,
        detail: string,
        badge: string,
        category: string,
        image: string,
        updateDate: Date
    ){
        this.name = name;
        this.quantity = quantity;
        this.status = status;
        this.detail = detail;
        this.badge = badge;
        this.category = category;
        this.image = image;
        this.updateDate = updateDate;
    }

    @IsNotEmpty()
    public name: string;
    public quantity: number;
    public status: string;
    public detail: string;
    public badge: string;
    public category: string;
    public image: string;
    public updateDate: Date;
}