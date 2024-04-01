import { GridColDef } from "@mui/x-data-grid";
import TableView from "../components/TableView";
import { useGetCustomersQuery, useDeleteCustomerMutation } from "../../services/customer";
import ICustomer from "../../types/customer.interface";
import { useState } from "react";
import CustomerForm from "./CustomerForm";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import moment from "moment";

export default function CustomerList(){
    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First Name', width: 130, flex: 1 },
        { field: 'lastName', headerName: 'Last Name', width: 130, flex: 1 },
        { field: 'email', headerName: 'Email', width: 130, flex: 1 },
        { field: 'phone', headerName: 'Phone', width: 130, flex: 1 },
        { 
          field: 'createDate', 
          headerName: 'Create Date', 
          width: 90,
          flex: 0.5,
          renderCell: params => (<span>{moment(params?.row.createDate).format("DD/MM/YYYY")}</span>)
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
      
    const { data } = useGetCustomersQuery();
    const [selectedItem, setSelectedItem] = useState<ICustomer | undefined>(undefined);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const rows: ICustomer[] = data?.map((d: ICustomer) => ({...d, id: d._id})) || [];
    const [openQE, setOpenQE] = useState<boolean>(false);
    const [deleteCustomer] = useDeleteCustomerMutation();

    const handleAdd = (): void => {
      setSelectedItem(undefined);
      setOpenQE(true);
      setIsEdit(false);
    }
    const handleCloseQE = (): void => {
      setOpenQE(false);
    }

    const handleDelete = (row: ICustomer): void =>{
      deleteCustomer(row._id);
    }

    const handleEdit = (row: ICustomer): void => {
      setSelectedItem(row);
      setOpenQE(true);
      setIsEdit(true);
    }
    return (
        <>
            <CustomerForm item={selectedItem} open={openQE} onClose={handleCloseQE} onAdd={handleAdd} isEdit={isEdit}/>
            <TableView rows={rows} columns={columns}/>
        </>
    )
}