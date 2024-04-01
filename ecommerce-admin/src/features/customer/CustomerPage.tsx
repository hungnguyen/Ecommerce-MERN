import React from "react";
import Layout from "../Layout";
import { Typography } from "@mui/material";
import CustomerList from "./CustomerList";

export default function CustomerPage(){
    return (
        <Layout>
            <Typography variant="h4" gutterBottom>Customer</Typography>
            <CustomerList />
        </Layout>
    )
}