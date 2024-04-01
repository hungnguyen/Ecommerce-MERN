import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

interface TableViewProps{
    columns: GridColDef[],
    rows: any[]
}

export default function TableView({rows, columns}: TableViewProps) {
  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
}