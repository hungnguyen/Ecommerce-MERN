import CustomerDto from "@/app/core/dtos/customer.dto";
import useCache from "@/app/core/hooks/useCache";
import { IOrder, IOrderItem } from "@/app/core/interfaces/order.interface";
import CartHelper from "@/app/core/utils/cart.helper";
import { createCustomer } from "@/services/customer";
import { createOrder } from "@/services/order";
import clsx from "clsx";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";

interface CustomerInfoProps{
    stepIndex: number;
    setStepIndex: Dispatch<SetStateAction<number>>;
    orderCode: MutableRefObject<string>;
}

const initCustomer: CustomerDto = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    createDate: new Date(),
    note: ""
}

export default function CustomerInfo({stepIndex, setStepIndex, orderCode}: CustomerInfoProps){
    const [customerInfo, setCustomerInfo] = useState<CustomerDto>(initCustomer);
    const {getItemT, removeItem} = useCache("sessionStorage", "your-cart");
    
    const handleChange = (e: any) => {
        setCustomerInfo({...customerInfo, [e.target.name]: e.target.value});
    }
    const handleSubmit = async () => {
        const yourCart = getItemT<IOrderItem[]>() ?? [];
        const customer = await createCustomer(customerInfo);
        const cartHelper = new CartHelper(yourCart);
        const order = await createOrder({
            status: "new",
            payStatus: "unpaid",
            orderDate: new Date(),
            orderCode: new Date().getTime().toString(),
            customer: customer?._id,
            totalAmount: cartHelper.calcTotalAmount(),
            totalAmountNet: cartHelper.calcTotalAmount(),
            taxFee: 0,
            note: customerInfo.note,
            payMethod: "cash",
            items: yourCart,
        } as IOrder);
        orderCode.current = order?.orderCode ?? "";
        //clear cart
        removeItem();
        setCustomerInfo(initCustomer);
        setStepIndex(stepIndex+1);
    }
    return(
        <>
        <div className={clsx(
            "flex flex-col space-y-4",
            {
                "hidden": stepIndex !== 1,
                "block": stepIndex === 1
            }
        )}>
            <input className="w-full border rounded-md pl-4 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline text-black" type="text" placeholder="First Name" 
                value={customerInfo.firstName} onChange={handleChange} name="firstName"/>
            <input className="w-full border rounded-md pl-4 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline text-black" type="text" placeholder="Last Name" 
                value={customerInfo.lastName} onChange={handleChange} name="lastName"/>
            <input className="w-full border rounded-md pl-4 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline text-black" type="text" placeholder="Email" 
                value={customerInfo.email} onChange={handleChange} name="email"/>
            <input className="w-full border rounded-md pl-4 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline text-black" type="text" placeholder="Phone" 
                value={customerInfo.phone} onChange={handleChange} name="phone"/>
            <input className="w-full border rounded-md pl-4 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline text-black" type="text" placeholder="Address" 
                value={customerInfo.address} onChange={handleChange} name="address"/>
            <textarea className="w-full border rounded-md pl-4 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline text-black" rows={2} placeholder="Note" 
                value={customerInfo.note} onChange={handleChange} name="note"></textarea>

            <div className="flex items-center justify-between gap-2">
                <a onClick={()=>setStepIndex(stepIndex-1)} className={clsx(
                    "mt-4 px-3 py-2 bg-gray-600 text-white text-sm uppercase font-medium rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-500",
                    {
                        "hidden": stepIndex === 0
                    }
                )}>
                    <span>Back</span>
                </a>
                <a onClick={handleSubmit} className="flex-1 flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Submit</span>
                    <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>
        </div>
        
        </>
    )
}