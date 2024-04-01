"use client"

import ICustomer from "@/app/core/interfaces/customer.interface";
import { getToken } from "./account";
import CustomerDto from "@/app/core/dtos/customer.dto";

const endpoint = process.env.NEXT_PUBLIC_IMAGE_URL + "/api/v1/customers";

export async function createCustomer(customer: CustomerDto):Promise<ICustomer | null>{
    try{
        const token = await getToken() ?? "";
        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            } as any,
            body: JSON.stringify(customer)
        });
        return await result.json();
    }
    catch(e){
        console.error("Error: ", e);
        return null;
    }
}