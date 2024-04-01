"use client"

import useCache from "@/app/core/hooks/useCache";
import { IOrderItem } from "@/app/core/interfaces/order.interface";
import { IProduct } from "@/app/core/interfaces/product.interface";
import AddToCartAlert from "./add-to-cart-alter";
import { useState } from "react";

interface ProductItemProps{
    product: IProduct;
}

export default function ProductItem({product}: ProductItemProps){
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const {setItem, getItemT} =  useCache("sessionStorage", "your-cart");
    const addToCart = (product: IProduct): void =>{
        let currentCart = getItemT<IOrderItem[]>();
        if(!currentCart){
            currentCart = [];
        }
        const foundProduct = currentCart.find(c=>c.product === product._id);
        if(foundProduct){
            const quantity = foundProduct.quantity + 1;
            const amount = foundProduct.price * quantity;
            currentCart = currentCart.map(c => c.product === foundProduct.product ? {...foundProduct, quantity, amount } as IOrderItem : c);
        }
        else
        {
            currentCart.push({
                product: product._id,
                name: product.name,
                image: product.image,
                quantity: 1,
                price: product.prices[0]?.price ?? 0,
                amount: product.prices[0]?.price ?? 0
            } as IOrderItem);
        }
        setItem(JSON.stringify(currentCart));
        setOpenAlert(true);
    }
    return(
        <>
            <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                <div className="flex items-end justify-end h-56 w-full bg-cover" style={{backgroundImage: `url('${process.env.NEXT_PUBLIC_IMAGE_URL+product.image}')`}}>
                    <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                        onClick={()=>addToCart(product)}
                    >
                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </button>
                </div>
                <div className="px-5 py-3">
                    <h3 className="text-gray-700 uppercase">{product.name}</h3>
                    <span className="text-gray-500 mt-2">${product.prices[0]?.price}</span>
                </div>
            </div>
            <AddToCartAlert open={openAlert} onClose={()=>setOpenAlert(false)}/>
        </>
    )
}