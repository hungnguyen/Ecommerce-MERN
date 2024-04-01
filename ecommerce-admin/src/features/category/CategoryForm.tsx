import { Box, Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { ICategory } from "../../types/category.interface";
import { useEffect, useState } from "react";
import QuickEdit from "../components/QuickEdit";
import { useAddCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "../../services/category";

const initState: ICategory = {
    name: "",
    orderNumber: 0,
    status: 'active',
    parent: "",
} as ICategory;

interface CategoryFormProps{
    isEdit: boolean;
    item?: ICategory;
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
}

export default function CategoryForm(props: CategoryFormProps){
    const {item, open, onClose, onAdd, isEdit} = props;
    const [values, setValues] = useState<ICategory>(initState);
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const {data} = useGetCategoriesQuery();

    useEffect(()=>{
        setValues(item || initState);
    },[item, isEdit]);
    
    const handleChange = (e: any) => {
        const {name, value, checked, type} = e.target;
        setValues({...values, [name]: ["checkbox"].includes(type) ? (checked ? "active" : "inactive") : value});
    }
    const handleSave = () => {
        if(isEdit){
            updateCategory(values);
        }
        else{
            addCategory(values);
        }
        onClose();
    }
    return (
        <>
            <Button variant="outlined" onClick={onAdd} sx={{mb:2}}>
                Add new
            </Button>
            <QuickEdit open={open} onClose={onClose} onSave={handleSave} title="Add/Edit Category">
            <Box 
                sx={{'& .MuiTextField-root': {m:1}, '& .MuiFormControl-root': {m:1}, '& .MuiFormGroup-root': {m:1}}}
            >
                <TextField fullWidth label="Name" id="name" name="name" value={values.name} onChange={handleChange} />
                <TextField fullWidth label="Order Number" id="orderNumber" name="orderNumber" value={values.orderNumber} onChange={handleChange} />
                <FormControl fullWidth>
                    <InputLabel id="parent-label">Parent</InputLabel>
                    <Select
                        labelId="parent-label"
                        id="parent"
                        name="parent"
                        value={values.parent}
                        label="Parent"
                        onChange={handleChange}
                    >
                        {
                            data && data.map(c => (
                                <MenuItem key={c._id} value={c.name}>{c.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormGroup>
                    <FormControlLabel control={
                        <Switch value={values.status} checked={values.status === "active"} onChange={handleChange} name="status" id="status"/>
                    } label="Status" />
                </FormGroup>
            </Box>
        </QuickEdit>
        </>
        
    )
}