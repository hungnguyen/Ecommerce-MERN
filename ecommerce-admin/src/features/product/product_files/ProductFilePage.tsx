import React from "react";
import { Typography } from "@mui/material";
import ProductFileList from "./ProductFileList";
import { useGetProductQuery } from "../../../services/product";
import { useParams } from "react-router-dom";

export default function ProductFilePage(){
    const {parent} = useParams();
    const { data } = useGetProductQuery(parent!);
    return (
        <>
            <Typography variant="h4" gutterBottom>Product File
                <Typography variant="subtitle1" gutterBottom>
                    {data?.name}
                </Typography>
            </Typography>
            
            <ProductFileList />
        </>
    )
}