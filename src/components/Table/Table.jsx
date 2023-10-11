import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useState } from "react";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const Table = () => {
  const [tableData, setTableData] = useState([
    { id: "1", title: "hh", body: "hhihih" },
  ]);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 600 },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
};
export default Table;
