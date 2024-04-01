import React from "react";
import Layout from "../Layout";
import { Typography } from "@mui/material";
import CategoryList from "./CategoryList";

export default function CategoryPage(){
    return (
        <Layout>
            <Typography variant="h4" gutterBottom>Category</Typography>
            <CategoryList />
        </Layout>
    )
}