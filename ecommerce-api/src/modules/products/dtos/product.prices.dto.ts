import { IsNotEmpty } from "class-validator";

export default class ProductPriceDto{
    constructor(
        name: string,
        price: number,
        validFrom: Date,
        validTo: Date
    ){
        this.name = name;
        this.price = price;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public price: number;
    public validFrom: Date;
    public validTo: Date;
}