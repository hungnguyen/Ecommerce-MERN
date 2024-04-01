import { Box, Button, TextField } from "@mui/material";
import { IProductPrice } from "../../../types/product.interface";
import { useEffect, useState } from "react";
import QuickEdit from "../../components/QuickEdit";
import { useAddProductPriceMutation, useUpdateProductPriceMutation } from "../../../services/product";
import { useParams } from "react-router-dom";

const initState: IProductPrice = {
    name: "",
    price: 0,
    validFrom: new Date(),
    validTo: new Date()
} as IProductPrice;

interface ProductPriceFormProps{
    isEdit: boolean;
    item?: IProductPrice;
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
}

export default function ProductPriceForm(props: ProductPriceFormProps){
    const {item, open, onClose, onAdd, isEdit} = props;
    const [values, setValues] = useState<IProductPrice>(initState);
    const [addProductPrice] = useAddProductPriceMutation();
    const [updateProductPrice] = useUpdateProductPriceMutation();
    const {parent} = useParams();

    useEffect(()=>{
        setValues(item || initState);
    },[item, isEdit]);
    
    const handleChange = (e: any) => {
        const {name, value, checked, type} = e.target;
        setValues({...values, [name]: ["checkbox"].includes(type) ? (checked ? "active" : "inactive") : value});
    }
    const handleSave = () => {
        if(isEdit){
            updateProductPrice({ parent, child: values});
        }
        else{
            addProductPrice({ parent, child: values});
        }
        onClose();
    }
    return (
        <>
            <Button variant="outlined" onClick={onAdd} sx={{mb:2}}>
                Add new
            </Button>
            <QuickEdit open={open} onClose={onClose} onSave={handleSave} title="Add/Edit Product Price">
            <Box 
                sx={{'& .MuiTextField-root': {m:1}, '& .MuiFormControl-root': {m:1}, '& .MuiFormGroup-root': {m:1}}}
            >
                <TextField fullWidth label="Name" id="name" name="name" value={values.name} onChange={handleChange} />
                <TextField fullWidth label="Price" id="price" name="price" value={values.price} onChange={handleChange}/>
                <TextField fullWidth label="Valid From" id="validFrom" name="validFrom" value={values.validFrom} type="date" onChange={handleChange}/>
                <TextField fullWidth label="Valid To" id="validTo" name="validTo" value={values.validTo} type="date" onChange={handleChange}/>
            </Box>
        </QuickEdit>
        </>
        
    )
}