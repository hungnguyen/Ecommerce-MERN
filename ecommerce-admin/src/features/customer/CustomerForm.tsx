import { Box, Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import ICustomer from "../../types/customer.interface";
import { useEffect, useState } from "react";
import QuickEdit from "../components/QuickEdit";
import { useAddCustomerMutation, useUpdateCustomerMutation } from "../../services/customer";

const initState: ICustomer = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    createDate: new Date()
} as ICustomer;

interface CustomerFormProps{
    isEdit: boolean;
    item?: ICustomer;
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
}

export default function CustomerForm(props: CustomerFormProps){
    const {item, open, onClose, onAdd, isEdit} = props;
    const [values, setValues] = useState<ICustomer>(initState);
    const [addCustomer] = useAddCustomerMutation();
    const [updateCustomer] = useUpdateCustomerMutation();

    useEffect(()=>{
        setValues(item || initState);
    },[item, isEdit]);
    
    const handleChange = (e: any) => {
        const {name, value, checked, type} = e.target;
        setValues({...values, [name]: ["checkbox"].includes(type) ? (checked ? "active" : "inactive") : value});
    }
    const handleSave = () => {
        if(isEdit){
            updateCustomer(values);
        }
        else{
            addCustomer(values);
        }
        onClose();
    }
    return (
        <>
            <Button variant="outlined" onClick={onAdd} sx={{mb:2}}>
                Add new
            </Button>
            <QuickEdit open={open} onClose={onClose} onSave={handleSave} title="Add/Edit Customer">
            <Box 
                sx={{'& .MuiTextField-root': {m:1}, '& .MuiFormControl-root': {m:1}, '& .MuiFormGroup-root': {m:1}}}
            >
                <TextField fullWidth label="First Name" id="firstName" name="firstName" value={values.firstName} onChange={handleChange} />
                <TextField fullWidth label="Last Name" id="lastName" name="lastName" value={values.lastName} onChange={handleChange} />
                <TextField fullWidth label="Email" id="email" name="email" value={values.email} onChange={handleChange} />
                <TextField fullWidth label="Phone" id="phone" name="phone" value={values.phone} onChange={handleChange} />
                <TextField fullWidth label="Address" id="address" name="address" value={values.address} onChange={handleChange} />
            </Box>
        </QuickEdit>
        </>
        
    )
}