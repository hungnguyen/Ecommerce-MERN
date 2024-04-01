import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface ThankYouProps{
    stepIndex: number;
    setStepIndex: Dispatch<SetStateAction<number>>;
    orderCode: string;
    onClose: () => void;
}

export default function ThankYou({stepIndex, setStepIndex, orderCode, onClose}: ThankYouProps){
    const handleClose =()=>{
        onClose();
        setStepIndex(0);
    }
    return(
        <>
        <div className={clsx("text-gray-600",{
            "hidden": stepIndex !== 2,
            "block": stepIndex === 2
        })}>
            <h2 className="text-2xl font-semibold">Thank you</h2>
            <p className="mt-2 ">Your order is {orderCode}. It will be delivered in 7 business days</p>

            <div className="flex items-center justify-between gap-2">
                
                <a onClick={handleClose} className="flex-1 flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Close</span>
                </a>
            </div>
        </div>
        
        </>
    );
}