import { IsNotEmpty } from "class-validator";

export default class OrderItemDto{
    constructor(
        product: string,
        quantity: number,
        price: number,
        amount: number,
        name: string,
        image: string,
    ){
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.amount = amount;
        this.name = name;
        this.image = image;
    }
    @IsNotEmpty()
    public product: string;

    @IsNotEmpty()
    public quantity: number;
    
    @IsNotEmpty()
    public price: number;
    public amount: number;
    public name: string;
    public image: string;
}