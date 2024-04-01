import { GridColDef } from "@mui/x-data-grid";
import TableView from "../../components/TableView";
import { IProductPrice } from "../../../types/product.interface";
import { useState } from "react";
import ProductPriceForm from "./ProductPriceForm";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteProductPriceMutation, useGetProductQuery } from "../../../services/product";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function ProductPriceList(){
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 130, flex: 1 },
        { field: 'price', headerName: 'Price', width: 130, flex: 1 },
        { 
          field: 'validFrom', 
          headerName: 'Valid From', 
          width: 100,
          flex: 1,
          renderCell: params => (<span>{moment(params?.row.validFrom).format("DD/MM/YYYY")}</span>)
        },
        { 
          field: 'validTo', 
          headerName: 'Valid To', 
          width: 100,
          flex: 1,
          renderCell: params => (<span>{moment(params?.row.validTo).format("DD/MM/YYYY")}</span>)
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
              </strong>
            ),
          },
    ];
      
    const {parent} = useParams();
    const { data } = useGetProductQuery(parent!);
    const [selectedItem, setSelectedItem] = useState<IProductPrice | undefined>(undefined)
    const rows: IProductPrice[] = data?.prices.map((d: IProductPrice) => ({...d, id: d._id})) || [];
    const [openQE, setOpenQE] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [deleteProductPrice] = useDeleteProductPriceMutation();

    const handleAdd = (): void => {
      setSelectedItem(undefined);
      setOpenQE(true);
      setIsEdit(false);
    }
    const handleCloseQE = (): void => {
      setOpenQE(false);
    }

    const handleDelete = (row: IProductPrice): void =>{
      deleteProductPrice({parent, child: row._id});
    }

    const handleEdit = (row: IProductPrice): void => {
      setSelectedItem(row);
      setOpenQE(true);
      setIsEdit(true);
    }
    return (
        <>
            <ProductPriceForm item={selectedItem} open={openQE} onClose={handleCloseQE} onAdd={handleAdd} isEdit={isEdit}/>
            <TableView rows={rows} columns={columns}/>
        </>
    )
}