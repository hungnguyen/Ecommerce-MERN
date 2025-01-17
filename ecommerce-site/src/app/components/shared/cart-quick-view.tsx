"use client";
import { useState } from "react";
import CartQuickViewList from "./cart-quick-view-list";

interface CartQuickViewProps{
    cartOpen: boolean;
    onOpenCart: () => void;
    onOpenMenu: () => void;
}

export default function CartQuickView({cartOpen, onOpenCart, onOpenMenu}: CartQuickViewProps){
    return(
        <>
            <div className="flex items-center justify-end w-full">
                <button onClick={onOpenCart} className="text-gray-600 focus:outline-none mx-4 sm:mx-0">
                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                </button>

                <div className="flex sm:hidden">
                    <button onClick={onOpenMenu} type="button" className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </>
        
    )
}