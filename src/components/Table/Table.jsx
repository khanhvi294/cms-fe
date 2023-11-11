import { Button, IconButton } from "@mui/material";
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
    <GridToolbarContainer className=" mr-3 justify-end">
      <GridToolbarFilterButton className="!text-black" />
      <GridToolbarExport className="!text-black" />
    </GridToolbarContainer>
  );
}

const Table = ({ rows, columnss }) => {
  const [tableData, setTableData] = useState([
    {
      id: "1",
      title: "hh",
      body: "hhihih",
      action: (
        <Button variant="contained flex-end !bg-[#000] !text-white !rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="plus"
            width={22}
            height={22}
          >
            <g
              data-name="Layer 2"
              fill="#ffffff"
              className="color000000 svgShape"
            >
              <g
                data-name="plus"
                fill="#ffffff"
                className="color000000 svgShape"
              >
                <rect
                  width="24"
                  height="24"
                  opacity="0"
                  transform="rotate(180 12 12)"
                  fill="#ffffff"
                  className="color000000 svgShape"
                ></rect>
                <path
                  d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
                  fill="#ffffff"
                  className="color000000 svgShape"
                ></path>
              </g>
            </g>
          </svg>
          Add
        </Button>
      ),
    },
  ]);
  const colData = (colArrayData) => {
    return colArrayData.map((item) => item.name).join(", ");
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 600 },
    {
      field: "action",
      headerName: "Action",
      width: 600,
      options: { customBodyRender: (colArrayData) => colData(colArrayData) },
    },
  ];
  return (
    <div className="w-full">
      <div className=" bg-white mt-7 w-full ">
        <div style={{ minHeight: 614, width: "100%" }}>
          <DataGrid
            className="!rounded-3xl "
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
