import { GridColDef } from "@mui/x-data-grid";
import TableView from "../../components/TableView";
import { IProductFile } from "../../../types/product.interface";
import { useState } from "react";
import ProductFileForm from "./ProductFileForm";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteProductFileMutation, useGetProductQuery } from "../../../services/product";
import { useParams } from "react-router-dom";

export default function ProductFileList(){
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 130, flex: 1 },
        {
          field: "filePath",
          headerName: "File",
          flex: 0.5,
          renderCell: (params: any) => (<img src={import.meta.env.VITE_API_BASE_URL + params.row.filePath} alt={params.row.filePath} height={20} />)
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
    const [selectedItem, setSelectedItem] = useState<IProductFile | undefined>(undefined)
    const rows: IProductFile[] = data?.files.map((d: IProductFile) => ({...d, id: d._id})) || [];
    const [openQE, setOpenQE] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [deleteProductFile] = useDeleteProductFileMutation();

    const handleAdd = (): void => {
      setSelectedItem(undefined);
      setOpenQE(true);
      setIsEdit(false);
    }
    const handleCloseQE = (): void => {
      setOpenQE(false);
    }

    const handleDelete = (row: IProductFile): void =>{
      deleteProductFile({parent, child: row._id});
    }

    const handleEdit = (row: IProductFile): void => {
      setSelectedItem(row);
      setOpenQE(true);
      setIsEdit(true);
    }
    return (
        <>
            <ProductFileForm item={selectedItem} open={openQE} onClose={handleCloseQE} onAdd={handleAdd} isEdit={isEdit}/>
            <TableView rows={rows} columns={columns}/>
        </>
    )
}