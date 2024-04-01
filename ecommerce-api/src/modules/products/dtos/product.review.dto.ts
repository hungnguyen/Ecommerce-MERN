import { IsNotEmpty } from "class-validator";

export default class ProductReviewDto{
    constructor(
        name: string,
        message: string,
        score: number
    ){
        this.name = name;
        this.message = message;
        this.score = score;
    }

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public message: string;
    public score: number;
}