"use client"

import { IOrder } from "../app/core/interfaces/order.interface";
import { getToken } from "./account";

const endpoint = process.env.NEXT_PUBLIC_IMAGE_URL + "/api/v1/orders";

export async function createOrder(order: IOrder):Promise<IOrder | null>{
    try{
        const token = await getToken() ?? "";
        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            } as any,
            body: JSON.stringify(order)
        });
        return await result.json();
    }
    catch(e){
        console.error("Error: ", e);
        return null;
    }
}