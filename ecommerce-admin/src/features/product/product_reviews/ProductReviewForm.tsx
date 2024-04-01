import { Box, Button, TextField } from "@mui/material";
import { IProductReview } from "../../../types/product.interface";
import { useEffect, useState } from "react";
import QuickEdit from "../../components/QuickEdit";
import { useAddProductReviewMutation, useUpdateProductReviewMutation } from "../../../services/product";
import { useParams } from "react-router-dom";

const initState: IProductReview = {
    name: "",
    message: "",
    score: 0
} as IProductReview;

interface ProductReviewFormProps{
    isEdit: boolean;
    item?: IProductReview;
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
}

export default function ProductReviewForm(props: ProductReviewFormProps){
    const {item, open, onClose, onAdd, isEdit} = props;
    const [values, setValues] = useState<IProductReview>(initState);
    const [addProductReview] = useAddProductReviewMutation();
    const [updateProductReview] = useUpdateProductReviewMutation();
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
            updateProductReview({ parent, child: values});
        }
        else{
            addProductReview({ parent, child: values});
        }
        onClose();
    }
    return (
        <>
            <Button variant="outlined" onClick={onAdd} sx={{mb:2}}>
                Add new
            </Button>
            <QuickEdit open={open} onClose={onClose} onSave={handleSave} title="Add/Edit Product Review">
            <Box 
                sx={{'& .MuiTextField-root': {m:1}, '& .MuiFormControl-root': {m:1}, '& .MuiFormGroup-root': {m:1}}}
            >
                <TextField fullWidth label="Name" id="name" name="name" value={values.name} onChange={handleChange} />
                <TextField fullWidth label="Score" id="score" name="score" value={values.score} type="number" onChange={handleChange}/>
                <TextField fullWidth label="Message" id="message" name="message" value={values.message} multiline rows={2} onChange={handleChange}/>
            </Box>
        </QuickEdit>
        </>
        
    )
}