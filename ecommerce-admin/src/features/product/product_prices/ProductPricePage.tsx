import React from "react";
import { Typography } from "@mui/material";
import ProductPriceList from "./ProductPriceList";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../../services/product";

export default function ProductPricePage(){
    const {parent} = useParams();
    const { data } = useGetProductQuery(parent!);
    return (
        <>
            <Typography variant="h4" gutterBottom>Product Price
                <Typography variant="subtitle1" gutterBottom>
                    {data?.name}
                </Typography>
            </Typography>
            <ProductPriceList />
        </>
    )
}