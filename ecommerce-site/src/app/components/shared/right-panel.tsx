"use client"

import clsx from "clsx";
import CartQuickViewList from "./cart-quick-view-list";
import { useRef, useState } from "react";
import CustomerInfo from "./customer-info";
import ThankYou from "./thank-you";

interface RightPanelProps{
    cartOpen: boolean;
    onClose: () => void;
}

export default function RightPanel({cartOpen, onClose}: RightPanelProps){
    const [stepIndex, setStepIndex] = useState<number>(0);
    const orderCode = useRef<string>("");
    
    const className = clsx(
        "fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300",
        {
            'translate-x-0 ease-out' : cartOpen, 
            'translate-x-full ease-in': !cartOpen
        }
    );
    
    return(
        <div className={className}>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
                <button onClick={onClose} className="text-gray-600 focus:outline-none">
                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <hr className="my-3" />
            <CartQuickViewList stepIndex={stepIndex} cartOpen={cartOpen} setStepIndex={setStepIndex}/>
            <CustomerInfo stepIndex={stepIndex} setStepIndex={setStepIndex} orderCode={orderCode}/>
            <ThankYou stepIndex={stepIndex} setStepIndex={setStepIndex} orderCode={orderCode.current} onClose={onClose}/>
            
        </div>
    )
}