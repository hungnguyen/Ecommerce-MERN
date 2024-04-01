import { GridColDef } from "@mui/x-data-grid";
import TableView from "../components/TableView";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../services/order";
import { IOrder } from "../../types/order.interface";
import { useState } from "react";
import OrderForm from "./OrderForm";
import { Chip, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import moment from "moment";

export default function OrderList(){
    const columns: GridColDef[] = [
        { field: 'orderCode', headerName: 'Order Code', width: 130, flex: 1 },
        { field: 'customer', headerName: 'Customer', width: 130, flex: 1 },
        { field: 'status', headerName: 'Status', width: 130, flex: 1 },
        {
          field: "payStatus",
          headerName: "Payment",
          flex: 0.5,
          renderCell: (params: any) => (<Chip label={params.row.payStatus} color={params.row.payStatus === "paid" ? "success" : "default"} size="small" />)
        },
        { field: 'totalAmountNet', headerName: 'Total Amount', width: 130, flex: 1 },
        { 
          field: 'orderDate', 
          headerName: 'Order Date', 
          width: 90,
          flex: 0.5,
          renderCell: params => (<span>{moment(params?.row.orderDate).format("DD/MM/YYYY")}</span>)
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
      
    const { data } = useGetOrdersQuery();
    const [selectedItem, setSelectedItem] = useState<IOrder | undefined>(undefined);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const rows: IOrder[] = data?.map((d: IOrder) => ({...d, id: d._id})) || [];
    const [openQE, setOpenQE] = useState<boolean>(false);
    const [deleteOrder] = useDeleteOrderMutation();

    const handleAdd = (): void => {
      setSelectedItem(undefined);
      setOpenQE(true);
      setIsEdit(false);
    }
    const handleCloseQE = (): void => {
      setOpenQE(false);
    }

    const handleDelete = (row: IOrder): void =>{
      deleteOrder(row._id);
    }

    const handleEdit = (row: IOrder): void => {
      setSelectedItem(row);
      setOpenQE(true);
      setIsEdit(true);
    }
    return (
        <>
            <OrderForm item={selectedItem} open={openQE} onClose={handleCloseQE} onAdd={handleAdd} isEdit={isEdit}/>
            <TableView rows={rows} columns={columns}/>
        </>
    )
}