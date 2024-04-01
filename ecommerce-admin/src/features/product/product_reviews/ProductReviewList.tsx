import { GridColDef } from "@mui/x-data-grid";
import TableView from "../../components/TableView";
import { IProductReview } from "../../../types/product.interface";
import { useState } from "react";
import ProductReviewForm from "./ProductReviewForm";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteProductReviewMutation, useGetProductQuery } from "../../../services/product";
import { useParams } from "react-router-dom";
import StarRatings from 'react-star-ratings';

export default function ProductReviewList(){
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 130, flex: 1 },
        { field: 'score', headerName: 'Score', width: 130, flex: 1,
          renderCell: params => (
            <StarRatings
              rating={params.row.score}
              starRatedColor="yellow"
              numberOfStars={5}
              name='rating'
              starDimension="20px"
            />
          )
        },
        { field: 'message', headerName: 'Message', width: 130, flex: 1 },
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
    const [selectedItem, setSelectedItem] = useState<IProductReview | undefined>(undefined)
    const rows: IProductReview[] = data?.reviews.map((d: IProductReview) => ({...d, id: d._id})) || [];
    const [openQE, setOpenQE] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [deleteProductReview] = useDeleteProductReviewMutation();

    const handleAdd = (): void => {
      setSelectedItem(undefined);
      setOpenQE(true);
      setIsEdit(false);
    }
    const handleCloseQE = (): void => {
      setOpenQE(false);
    }

    const handleDelete = (row: IProductReview): void =>{
      deleteProductReview({parent, child: row._id});
    }

    const handleEdit = (row: IProductReview): void => {
      setSelectedItem(row);
      setOpenQE(true);
      setIsEdit(true);
    }
    return (
        <>
            <ProductReviewForm item={selectedItem} open={openQE} onClose={handleCloseQE} onAdd={handleAdd} isEdit={isEdit}/>
            <TableView rows={rows} columns={columns}/>
        </>
    )
}