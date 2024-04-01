import { IsNotEmpty } from "class-validator";
import { IOrderItem } from "../orders.interface";

export default class OrderDto{
    constructor(
        status: string,
        payStatus: string,
        orderCode: string,
        customer: string,
        note: string,
        payMethod: string,
        totalAmount: number,
        totalAmountNet: number,
        taxFee: number,
        items: IOrderItem[]
    ){
        this.status = status;
        this.payMethod = payMethod;
        this.payStatus = payStatus,
        this.orderCode = orderCode;
        this.customer = customer;
        this.note = note;
        this.totalAmount = totalAmount;
        this.totalAmountNet = totalAmountNet;
        this.taxFee = taxFee;
        this.items = items
    }

    public status: string;
    public payStatus: string;
    public orderCode: string;
    @IsNotEmpty()
    public customer: string;
    public note: string;
    public payMethod: string;
    public totalAmount: number;
    public totalAmountNet: number;
    public taxFee: number;
    public items: IOrderItem[]
}