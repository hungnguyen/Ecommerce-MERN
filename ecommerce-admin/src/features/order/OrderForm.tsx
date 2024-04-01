import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { IOrder, IOrderItem } from "../../types/order.interface";
import { useEffect, useState } from "react";
import QuickEdit from "../components/QuickEdit";
import { useAddOrderMutation, useUpdateOrderMutation } from "../../services/order";
import OrderItemListForm from "./OrderItemListForm";

const initState: IOrder = {
    customer: "",
    note: "",
    status: "new",
    payStatus: "unpaid",
    payMethod: "cash",
    orderDate: new Date(),
    items: [] as IOrderItem[]
} as IOrder;

interface OrderFormProps{
    isEdit: boolean;
    item?: IOrder;
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
}

export default function OrderForm(props: OrderFormProps){
    const {item, open, onClose, onAdd, isEdit} = props;
    const [values, setValues] = useState<IOrder>(initState);
    const [addOrder] = useAddOrderMutation();
    const [updateOrder] = useUpdateOrderMutation();

    useEffect(()=>{
        setValues(item || initState);
    },[item, isEdit]);
    
    const handleChange = (e: any) => {
        const {name, value, checked, type} = e.target;
        setValues({...values, [name]: ["checkbox"].includes(type) ? (checked ? "active" : "inactive") : value});
    }
    const handleSave = () => {
        if(isEdit){
            updateOrder(values);
        }
        else{
            addOrder(values);
        }
        onClose();
    }
    return (
        <>
            <Button variant="outlined" onClick={onAdd} sx={{mb:2}}>
                Add new
            </Button>
            <QuickEdit open={open} onClose={onClose} onSave={handleSave} title="Update Order">
            <Box 
                sx={{'& .MuiTextField-root': {m:1}, '& .MuiFormControl-root': {m:1}, '& .MuiFormGroup-root': {m:1}}}
            >
                <TextField fullWidth label="Customer" id="customer" name="customer" value={values.customer} onChange={handleChange} />
                <TextField fullWidth label="Note" id="note" name="note" value={values.note} onChange={handleChange} />
                <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={values.status}
                        label="Status"
                        onChange={handleChange}
                    >
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="in-process">In Process</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="payStatus-label">Pay Status</InputLabel>
                    <Select
                        labelId="payStatus-label"
                        id="payStatus"
                        name="payStatus"
                        value={values.payStatus}
                        label="Pay Status"
                        onChange={handleChange}
                    >
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="unpaid">Unpaid</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="payMethod-label">Pay Method</InputLabel>
                    <Select
                        labelId="payMethod-label"
                        id="payMethod"
                        name="payMethod"
                        value={values.payMethod}
                        label="Pay Method"
                        onChange={handleChange}
                    >
                        <MenuItem value="cash">Cash</MenuItem>
                        <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
                        <MenuItem value="credit-card">Credit Card</MenuItem>
                    </Select>
                </FormControl>
                <OrderItemListForm rows={values.items}/>
            </Box>
        </QuickEdit>
        </>
        
    )
}