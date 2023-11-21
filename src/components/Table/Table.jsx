import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { useEffect, useState } from "react";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

function CustomToolbar() {
  return (
    <GridToolbarContainer className=" mr-3 justify-end">
      <GridToolbarFilterButton className="!text-black" />
      <GridToolbarExport className="!text-black" />
    </GridToolbarContainer>
  );
}

const Table = ({ rows, columns }) => {
  const [tableData, setTableData] = useState(rows);
  // const colData = (colArrayData) => {
  //   return colArrayData.map((item) => item.name).join(", ");
  // };
  useEffect(() => {
    setTableData(rows);
  }, [rows]);

  return (
    <div className="w-full" key={rows}>
      <div className=" bg-white mt-7 w-full ">
        <div style={{ minHeight: 314, width: "100%" }}>
          <DataGrid
            className="!rounded-3xl "
            rows={tableData}
            columns={columns}
            pageSize={12}
            pageSizeOptions={[7, 10, 25, 50, 100]}
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
