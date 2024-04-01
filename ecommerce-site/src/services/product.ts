import { IProduct } from "../app/core/interfaces/product.interface";

const endpoint = process.env.API_BASE_URL + "/api/v1/products";

export async function getProducts(): Promise<IProduct[]> {
    try{
        const response = await fetch(endpoint, { cache: "reload" });
        return await response.json();
    }
    catch(e){
        console.log("Error: ", e);
        return [];
    }
}
