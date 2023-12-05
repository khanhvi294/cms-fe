import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbar,
} from "@mui/x-data-grid";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  getRoundResultByRoundForTeacher,
  updateRoundResult,
} from "../../../services/roundResultService";

export default function TableScore({ roundId }) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const queryClient = useQueryClient();
  const [newData, setNewData] = React.useState(null);

  useQuery({
    queryKey: ["roundResultTeacher", roundId],
    enabled: !!roundId,
    queryFn: () => getRoundResultByRoundForTeacher(roundId),
    onSuccess: (data) => {
      console.log(data.data);
      setRows(data.data.data);
    },
  });

  const inputScoreMutatiton = useMutation({
    mutationFn: updateRoundResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["roundResultTeacher", roundId]);
      toast.success("score entered successfully!");
    },
    onError: (err) => {
      queryClient.invalidateQueries(["roundResultTeacher", roundId]);
      toast.error(err.message);
    },
  });

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    // Đặt lại rowModesModel cho tất cả các dòng

    // Đặt lại rowModesModel cho tất cả các dòng
    const resetRowModesModel = Object.fromEntries(
      Object.keys(rowModesModel).map((rowId) => [
        rowId,
        { mode: GridRowModes.View, ignoreModifications: true },
      ])
    );

    // Đặt chế độ chỉnh sửa cho dòng được chọn
    setRowModesModel({
      ...resetRowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });

    // const resetRowModesModel = Object.fromEntries(
    //   Object.keys(rowModesModel).map((rowId) => [
    //     rowId,
    //     { mode: GridRowModes.View },
    //   ])
    // );

    // setRowModesModel({
    //   ...resetRowModesModel,
    //   [id]: { mode: GridRowModes.Edit },
    // });
    //  setRowModesModel({ [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    // const data = {
    //   id: newRow.id,
    //   score: newRow.roundResultScore,
    //   roundId: newRow.roundId,
    //   studentId: newRow.roundResultStudent.id,
    // };

    // inputScoreMutatiton.mutate(data);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    const isEditing = Object.values(newRowModesModel).some(
      (rowMode) => rowMode.mode === GridRowModes.Edit
    );

    if (!isEditing) {
      setRowModesModel(newRowModesModel);
    }
    // setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "roundResultStudent.id",
      headerName: "Student ID",
      type: "number",
      width: 250,
      align: "left",
      headerAlign: "left",
      editable: false,
      valueGetter: (params) => params.row.roundResultStudent?.id,
    },
    {
      field: "roundResultStudent.fullName",
      headerName: "Name",
      width: 400,
      editable: false,
      valueGetter: (params) => params.row.roundResultStudent?.fullName,
    },

    {
      field: "roundResultScore",

      valueGetter: (params) => {
        // Kiểm tra xem có mảng roundResultScore và có phần tử đầu tiên không
        const scoreArray = params.row.roundResultScore;
        if (Array.isArray(scoreArray) && scoreArray.length > 0) {
          return scoreArray[0].score;
        }
        return ""; // Trả về chuỗi rỗng nếu không tìm thấy dữ liệu
      },
      headerName: "Score",
      align: "left",
      headerAlign: "left",
      type: "number",
      width: 200,
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value === null;
        console.log(params);
        // console.log("edit", params);
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params, index) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={index}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  id="save"
                  width={20}
                >
                  <path
                    d="m20.71 9.29-6-6a1 1 0 0 0-.32-.21A1.09 1.09 0 0 0 14 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8a1 1 0 0 0-.29-.71ZM9 5h4v2H9Zm6 14H9v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1Zm4-1a1 1 0 0 1-1 1h-1v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.41l4 4Z"
                    fill="#000000"
                    className="color000000 svgShape"
                  ></path>
                </svg>
              }
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(params.id)}
            />,
            <GridActionsCellItem
              key={index}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="Cancel"
                  width={20}
                >
                  <path
                    d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                    fill="#000000"
                    className="color000000 svgShape"
                  ></path>
                </svg>
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(params.id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={index}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="Edit"
                width={16}
              >
                <path
                  d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"
                  fill="#00000"
                  className="color000000 svgShape"
                ></path>
                <path
                  d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"
                  fill="#000000"
                  className="color000000 svgShape"
                ></path>
              </svg>
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  //test

  return (
    <Box
      sx={{
        height: 450,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //   },
        // }}

        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { showQuickFilter: true, setRows, setRowModesModel },
        }}
        pageSize={10}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
      />
    </Box>
  );
}
