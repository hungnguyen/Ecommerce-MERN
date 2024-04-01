import clsx from "clsx";
import { useEffect, useState } from "react";

interface AddToCartAlertProps{
    open: boolean;
    onClose: () => void;
}

export default function AddToCartAlert({open, onClose}: AddToCartAlertProps){
    const [isShow, setIsShow] = useState<boolean>(false);
    useEffect(()=>{
        if(open){
            setIsShow(true);
            setTimeout(() => {
                setIsShow(false);
            }, 3000);
        }
    },[open]);

    return (
        <div id="snackbar" className={clsx("bg-gray-900 text-white p-4 rounded-md fixed bottom-4 right-4 flex justify-between items-center",{
            "hidden": !isShow,
            "block": isShow
        })} >
            Product is added to cart!
            <button className="text-white" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    )
}