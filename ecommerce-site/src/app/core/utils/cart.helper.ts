import { IOrderItem } from "../interfaces/order.interface";

export default class CartHelper{
    private yourCart: IOrderItem[]
    constructor(carts: IOrderItem[]){
        this.yourCart = carts;
    }

    calcTotalAmount = (): number => {
        return this.yourCart.reduce<number>((acc, obj) => acc + obj.amount, 0);
    }
}