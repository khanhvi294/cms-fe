import { IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { useState } from "react";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Table = ({ rows, columnss }) => {
  const [tableData, setTableData] = useState([
    { id: "1", title: "hh", body: "hhihih" },
  ]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 600 },
  ];
  return (
    <div className="flex justify-center w-full">
      <div className=" bg-white mt-7">
        <div style={{ minHeight: 614, width: "100%" }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={12}
            slots={{ toolbar: CustomToolbar }}
            sx={{
              ".MuiDataGrid-columnHeaderTitle": {
                fontWeight: "600 !important",
                overflow: "visible !important",
                textTransform: "uppercase",
                color: "#616060",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Table;
