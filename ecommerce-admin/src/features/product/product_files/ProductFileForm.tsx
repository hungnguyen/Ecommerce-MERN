import { Box, Button, TextField } from "@mui/material";
import { IProductFile } from "../../../types/product.interface";
import { useEffect, useState } from "react";
import QuickEdit from "../../components/QuickEdit";
import { useAddProductFileMutation, useUpdateProductFileMutation } from "../../../services/product";
import { useParams } from "react-router-dom";
import { useUploadFileMutation } from "../../../services/upload";
import { CloudUpload } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../../components/VisuallyHiddenInput";

const initState: IProductFile = {
    name: "",
    filePath: ""
} as IProductFile;

interface ProductFormProps{
    isEdit: boolean;
    item?: IProductFile;
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
}

export default function ProductFileForm(props: ProductFormProps){
    const {item, open, onClose, onAdd, isEdit} = props;
    const [values, setValues] = useState<IProductFile>(initState);
    const [addProductFile] = useAddProductFileMutation();
    const [updateProductFile] = useUpdateProductFileMutation();
    const [uploadFile] = useUploadFileMutation();
    const {parent} = useParams();
    const [imageFile, setImageFile] = useState<File | null>(null);

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
            valuesToSave = {...valuesToSave, filePath: result.filePath!};
        }

        if(isEdit){
            await updateProductFile({ parent, child: valuesToSave});
        }
        else{
            await addProductFile({ parent, child: valuesToSave});
        }
        onClose();
    }
    return (
        <>
            <Button variant="outlined" onClick={onAdd} sx={{mb:2}}>
                Add new
            </Button>
            <QuickEdit open={open} onClose={onClose} onSave={handleSave} title="Add/Edit Product File">
            <Box 
                sx={{'& .MuiTextField-root': {m:1}, '& .MuiButton-root': {m:1}, '& .MuiFormGroup-root': {m:1}}}
            >
                <TextField fullWidth label="Name" id="name" name="name" value={values.name} onChange={handleChange} />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                    >
                    Upload file
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>
            </Box>
        </QuickEdit>
        </>
        
    )
}