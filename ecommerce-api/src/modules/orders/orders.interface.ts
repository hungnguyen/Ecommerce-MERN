export interface IOrder{
    _id: string;
    status: "new" | "cancelled" | "in-process" | "completed",
    payStatus: "paid" | "unpaid",
    orderDate: Date,
    orderCode: string;
    customer: string;
    totalAmount: number;
    totalAmountNet: number;
    taxFee: number;
    note: string;
    payMethod: "cash" | "bank-transfer" | "credit-card";
    items: IOrderItem[];
}

export interface IOrderItem{
    _id: string;
    product: string;
    quantity: number;
    price: number;
    amount: number;
    name: string;
    image: string;
}