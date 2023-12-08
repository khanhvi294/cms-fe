import { Box, Button, Modal } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import { useMutation } from "react-query";
import { confirmStudentPassRound } from "../../services/roundResultService";

const ModalConfirmStudent = ({ open, setOpen, studentConfirm, roundId }) => {
  const [rows, setRows] = useState(studentConfirm);
  const columns = [
    {
      field: "roundResultStudent.id",
      headerName: "ID",
      width: 430,
      valueGetter: (params) => params.row.roundResultStudent.id,
    },

    {
      field: "roundResultStudent.fullName",
      headerName: " FullName",
      width: 550,
      valueGetter: (params) => params.row.roundResultStudent.fullName,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params, index) => [
        <GridActionsCellItem
          key={index}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Delete"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 29 29"
              xmlSpace="preserve"
              width={15}
              onClick={() => handleDeleteClick(params.row.id)}
            >
              <path
                d="M19.795 27H9.205a2.99 2.99 0 0 1-2.985-2.702L4.505 7.099A.998.998 0 0 1 5.5 6h18a1 1 0 0 1 .995 1.099L22.78 24.297A2.991 2.991 0 0 1 19.795 27zM6.604 8 8.21 24.099a.998.998 0 0 0 .995.901h10.59a.998.998 0 0 0 .995-.901L22.396 8H6.604z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
              <path
                d="M26 8H3a1 1 0 1 1 0-2h23a1 1 0 1 1 0 2zM14.5 23a1 1 0 0 1-1-1V11a1 1 0 1 1 2 0v11a1 1 0 0 1-1 1zM10.999 23a1 1 0 0 1-.995-.91l-1-11a1 1 0 0 1 .905-1.086 1.003 1.003 0 0 1 1.087.906l1 11a1 1 0 0 1-.997 1.09zM18.001 23a1 1 0 0 1-.997-1.09l1-11c.051-.55.531-.946 1.087-.906a1 1 0 0 1 .905 1.086l-1 11a1 1 0 0 1-.995.91z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
              <path
                d="M19 8h-9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-8-2h7V4h-7v2z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
          }
          label="Delete"
        />,
      ],
    },
  ];
  const handleDeleteClick = (id) => {
    const indexToDelete = rows.findIndex((item) => item.id === id);

    if (indexToDelete !== -1) {
      const updatedData = [...rows];

      updatedData.splice(indexToDelete, 1);

      setRows(updatedData);
    }
  };
  useEffect(() => {
    setRows(studentConfirm);
  }, [studentConfirm]);
  const checkStudentPassMutation = useMutation({
    mutationFn: confirmStudentPassRound,
    onSuccess: (data) => {},
    onError: (err) => {},
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <Box className="bg-white w-[1160px] h-[719px]  flex flex-col p-4 gap-5 rounded-xl">
        <Table columns={columns} rows={rows} />
        <Button
          onClick={() => {
            const studentIds = rows.map((item) => item.roundResultStudent.id);
            checkStudentPassMutation.mutate({
              roundId,
              studentIds: studentIds,
            });
          }}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalConfirmStudent;
