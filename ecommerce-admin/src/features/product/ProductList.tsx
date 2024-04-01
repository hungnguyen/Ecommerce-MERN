import { GridColDef } from "@mui/x-data-grid";
import TableView from "../components/TableView";
import { useDeleteProductMutation, useGetProductsQuery } from "../../services/product";
import { IProduct } from "../../types/product.interface";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Chip, IconButton } from "@mui/material";
import { Delete, Edit, FilePresent, PriceChange, Reviews } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ProductList(){
  const navigate = useNavigate();
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 130, flex: 1 },
        { field: 'category', headerName: 'Category', width: 90, flex: 1 },
        { field: 'badge', headerName: 'Badge', width: 90, flex: 0.5 },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 90,
            flex: 0.5
        },
        {
          field: "status",
          headerName: "Status",
          flex: 0.5,
          renderCell: (params: any) => (<Chip label={params.row.status} color={params.row.status === "active" ? "success" : "default"} size="small" />)
        },
        {
          field: "image",
          headerName: "Image",
          flex: 0.5,
          renderCell: (params: any) => (<img src={import.meta.env.VITE_API_BASE_URL + params.row.image} alt={params.row.image} height={20} />)
        },
        {
            field: "dummy",
            headerName: "Action",
            flex: 0.5,
            renderCell: (params: any) => (
              <strong>
                <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
                    <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(params.row)}
                >
                  <Delete />
                </IconButton>
                <IconButton color="primary" size="small" onClick={() => navigate(`/product/${params.row._id}/file`)}>
                    <FilePresent />
                </IconButton>
                <IconButton color="primary" size="small" onClick={() => navigate(`/product/${params.row._id}/price`)}>
                    <PriceChange />
                </IconButton>
                <IconButton color="primary" size="small" onClick={() => navigate(`/product/${params.row._id}/review`)}>
                    <Reviews />
                </IconButton>
              </strong>
            ),
          },
    ];
      
    const { data } = useGetProductsQuery(undefined);
    const [selectedItem, setSelectedItem] = useState<IProduct | undefined>(undefined)
    const rows: IProduct[] = data?.map((d: IProduct) => ({...d, id: d._id})) || [];
    const [openQE, setOpenQE] = useState<boolean>(false);
    const [deleteProduct] = useDeleteProductMutation();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleAdd = (): void => {
      setSelectedItem(undefined);
      setOpenQE(true);
      setIsEdit(false);
    }
    const handleCloseQE = (): void => {
      setOpenQE(false);
    }

    const handleDelete = (row: IProduct): void =>{
      deleteProduct(row._id);
    }

    const handleEdit = (row: IProduct): void => {
      setSelectedItem(row);
      setOpenQE(true);
      setIsEdit(true);
    }
    return (
        <>
            <ProductForm item={selectedItem} open={openQE} onClose={handleCloseQE} onAdd={handleAdd} isEdit={isEdit}/>
            <TableView rows={rows} columns={columns}/>
        </>
    )
}