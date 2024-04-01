import React from "react";
import Layout from "../Layout";
import { Typography } from "@mui/material";
import OrderList from "./OrderList";

export default function OrderPage(){
    return (
        <Layout>
            <Typography variant="h4" gutterBottom>Order</Typography>
            <OrderList />
        </Layout>
    )
}