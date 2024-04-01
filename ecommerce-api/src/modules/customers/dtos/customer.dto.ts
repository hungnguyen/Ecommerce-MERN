import { IsNotEmpty } from "class-validator";

export default class CustomerDto{
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address: string,
    ){
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public phone: string;
    
    @IsNotEmpty()
    public address: string;
}