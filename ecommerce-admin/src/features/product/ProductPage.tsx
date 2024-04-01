import React from "react";
import Layout from "../Layout";
import { Typography } from "@mui/material";
import ProductList from "./ProductList";
import { Outlet, useParams } from "react-router-dom";

export default function ProductPage(){
    const {parent} = useParams();
    return (
        <Layout>
            {parent ? <Outlet />:<>
                <Typography variant="h4" gutterBottom>Product</Typography>
                <ProductList />
            </>
            }
        </Layout>
    )
}