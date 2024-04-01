"use client"

import React,{ Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import useCache from "@/app/core/hooks/useCache";
import { IOrderItem } from "@/app/core/interfaces/order.interface";

interface CartQuickViewListProps{
    stepIndex: number;
    cartOpen: boolean;
    setStepIndex: Dispatch<SetStateAction<number>>;
}

export default function CartQuickViewList({stepIndex, cartOpen, setStepIndex}: CartQuickViewListProps){
    const className = clsx(
        {
            'block' : stepIndex === 0, 
            'hidden': stepIndex !== 0
        }
    );
    const [currentCart, setCurrentCart] = useState<IOrderItem[]>([]);
    const {getItemT, setItem} = useCache("sessionStorage", "your-cart");
    useEffect(()=>{
        if(cartOpen){
            setCurrentCart(getItemT<IOrderItem[]>() ?? []);
        }
    }, [cartOpen]);

    const increment = (cart: IOrderItem)=>{
        let shopCart = getItemT<IOrderItem[]>();
        if(!shopCart){
            return;
        }
        const quantity = cart.quantity + 1;
        const amount = cart.price * quantity;
        shopCart = shopCart.map(c => c.product === cart.product ? {...cart, quantity, amount} as IOrderItem : c);
        setItem(JSON.stringify(shopCart));
        setCurrentCart(shopCart);
    }
    const decrement = (cart: IOrderItem)=>{
        let shopCart = getItemT<IOrderItem[]>();
        if(!shopCart){
            return;
        }
        const quantity = cart.quantity - 1;
        const amount = cart.price * quantity;
        if(quantity>0){
            shopCart = shopCart.map(c => c.product === cart.product ? {...cart, quantity, amount} as IOrderItem : c);
        }
        else{
            shopCart = shopCart.filter(c => c.product !== cart.product);
        }
        setItem(JSON.stringify(shopCart));
        setCurrentCart(shopCart);
    }

    return(
        <>
        <div className={className}>
            {currentCart && currentCart.map((cart)=>(
                <div className="flex justify-between mt-6" key={cart.product}>
                    <div className="flex">
                        <img className="h-20 w-20 object-cover rounded" src={process.env.NEXT_PUBLIC_IMAGE_URL + cart.image} alt="" />
                        <div className="mx-3">
                            <h3 className="text-sm text-gray-600">{cart.name}</h3>
                            <div className="flex items-center mt-2">
                                <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={()=>increment(cart)}>
                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                                <span className="text-gray-700 mx-2">{cart.quantity}</span>
                                <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={()=>decrement(cart)}>
                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <span className="text-gray-600">${cart.price}</span>
                </div>
            ))}
            
            {/* <div className="mt-8">
                <form className="flex items-center justify-center">
                    <input className="form-input w-48" type="text" placeholder="Add promocode" />
                    <button className="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <span>Apply</span>
                    </button>
                </form>
            </div> */}
            {currentCart && currentCart.length>0 ? (<div className="flex items-center justify-between gap-2">
                <a onClick={()=>setStepIndex(stepIndex+1)} className="flex-1 flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Checkout</span>
                    <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>) : (<>
                <p className="mt-2 text-gray-600">Your cart is empty</p>
            </>)}
        </div>
        
        </>
    )
}