import { Box, Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";
import { IProduct } from "../../types/product.interface";
import { useEffect, useState } from "react";
import QuickEdit from "../components/QuickEdit";
import { useAddProductMutation, useUpdateProductMutation } from "../../services/product";
import { useGetCategoriesQuery } from "../../services/category";
import { CloudUpload } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/VisuallyHiddenInput";
import { useUploadFileMutation } from "../../services/upload";

const initState: IProduct = {
    name: "",
    badge: "",
    detail: "",
    status: "active",
    category: "",
    quantity: 0,
    updateDate: new Date()
} as IProduct;

interface ProductFormProps{
    isEdit: boolean;
    item?: IProduct;
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
}

export default function ProductForm(props: ProductFormProps){
    const {item, open, onClose, onAdd, isEdit} = props;
    const [values, setValues] = useState<IProduct>(initState);
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const {data} = useGetCategoriesQuery();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadFile] = useUploadFileMutation();

    useEffect(()=>{
        setValues(item || initState);
    },[item, isEdit]);
    
    const handleChange = (e: any) => {
        const {name, value, checked, type} = e.target;
        setValues({...values, [name]: ["checkbox"].includes(type) ? (checked ? "active" : "inactive") : value});
    }
    const handleFileChange = (e:any)=>{
        const file = e.target.files[0];
        setImageFile(file);
    }
    const handleSave = async () => {
        let valuesToSave = {...values};
        if(imageFile){
            let formData = new FormData();
            //TODO: escape special chars and unicode chars for file name here
            formData.append("file", imageFile, imageFile.name);
            const result = await uploadFile(formData).unwrap();
            valuesToSave = {...valuesToSave, image: result.filePath!};
        }

        if(isEdit){
            await updateProduct(valuesToSave);
        }
        else{
            await addProduct(valuesToSave);
        }
        onClose();
    }
    return (
        <>
            <Button variant="outlined" onClick={onAdd} sx={{mb:2}}>
                Add new
            </Button>
            <QuickEdit open={open} onClose={onClose} onSave={handleSave} title="Add/Edit Product">
            <Box 
                sx={{'& .MuiTextField-root': {m:1}, 
                '& .MuiFormControl-root': {m:1}, 
                '& .MuiFormGroup-root': {m:1},
                '& .MuiButton-root': {m:1},
                '& p': {m:1}
            }}
            >
                <TextField fullWidth label="Name" id="name" name="name" value={values.name} onChange={handleChange} />
                <TextField fullWidth label="Quantity" id="quantity" name="quantity" value={values.quantity} onChange={handleChange}/>
                <TextField fullWidth label="Badge" id="badge" name="badge" value={values.badge} onChange={handleChange}/>
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={values.category}
                        label="Category"
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
                {values.image && <p><img src={values.image} alt="" height={50} /></p>}
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                    >
                    Upload image
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} id="upload-label"/>
                </Button>
                
                <TextField fullWidth label="Detail" id="detail" name="detail" multiline value={values.detail} onChange={handleChange} rows={4}/>
            </Box>
        </QuickEdit>
        </>
        
    )
}