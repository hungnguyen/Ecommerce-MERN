import { GridColDef } from "@mui/x-data-grid";
import TableView from "../components/TableView";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../services/category";
import { ICategory } from "../../types/category.interface";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { Chip, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function CategoryList(){
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 130, flex: 1 },
        { field: 'parent', headerName: 'Parent', width: 130, flex: 1 },
        {
            field: 'orderNumber',
            headerName: 'Order Number',
            type: 'number',
            width: 90,
            flex: 1
        },
        {
          field: "status",
          headerName: "Status",
          flex: 1,
          renderCell: (params: any) => (<Chip label={params.row.status} color={params.row.status === "active" ? "success" : "default"} size="small" />)
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
      
    const { data } = useGetCategoriesQuery();
    const [selectedItem, setSelectedItem] = useState<ICategory | undefined>(undefined);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const rows: ICategory[] = data?.map((d: ICategory) => ({...d, id: d._id})) || [];
    const [openQE, setOpenQE] = useState<boolean>(false);
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleAdd = (): void => {
      setSelectedItem(undefined);
      setOpenQE(true);
      setIsEdit(false);
    }
    const handleCloseQE = (): void => {
      setOpenQE(false);
    }

    const handleDelete = (row: ICategory): void =>{
      deleteCategory(row._id);
    }

    const handleEdit = (row: ICategory): void => {
      setSelectedItem(row);
      setOpenQE(true);
      setIsEdit(true);
    }
    return (
        <>
            <CategoryForm item={selectedItem} open={openQE} onClose={handleCloseQE} onAdd={handleAdd} isEdit={isEdit}/>
            <TableView rows={rows} columns={columns}/>
        </>
    )
}