import React from "react";
import { Typography } from "@mui/material";
import ProductReviewList from "./ProductReviewList";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../../services/product";

export default function ProductReviewPage(){
    const {parent} = useParams();
    const { data } = useGetProductQuery(parent!);
    return (
        <>
            <Typography variant="h4" gutterBottom>Product Review
                <Typography variant="subtitle1" gutterBottom>
                    {data?.name}
                </Typography>
            </Typography>
            <ProductReviewList />
        </>
    )
}