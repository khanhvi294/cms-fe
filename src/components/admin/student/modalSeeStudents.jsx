import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteStudentInClass,
  getAllStudentByClass,
} from "../../../services/classService";
import Table from "../../Table/Table";
import ModalAddStudents from "./modalAddStudents";
import ModalConfirmDelete from "../../Modal/modalConfirmDelete";
import { toast } from "react-toastify";
const ModalSeeStudent = ({ open, setOpen, classRoom }) => {
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [studentDelete, setStudentDelete] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 430,
    },

    { field: "fullName", headerName: " FullName", width: 550 },
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
              onClick={() => {
                setStudentDelete(params?.row);
                setOpenDelete(true);
              }}
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
  const [rows, setRows] = useState([]);

  useQuery({
    queryKey: ["students", classRoom?.id],
    enabled: !!classRoom?.id,
    queryFn: () => getAllStudentByClass(classRoom?.id),
    onSuccess: (data) => {
      const students = data?.data?.data.map((item) => ({
        fullName: item.ClassStudentStudent.fullName,
        id: item.ClassStudentStudent.id,
      }));
      setRows(students);
    },
  });

  const deleteStudentInClassMutation = useMutation({
    mutationFn: deleteStudentInClass,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["students", classRoom?.id]);
      // setRows((state) => [data.data, ...state]);
      toast.success("Delete successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center"
        >
          <Box className="bg-white w-[1160px] h-[719px]  flex flex-col p-4 gap-5 rounded-xl">
            <div className="flex justify-between">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="font-bold self-center"
              ></Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setOpen(false)}
                aria-label="close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="Close"
                  width={18}
                >
                  <path
                    d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                    fill="#151515"
                    className="color000000 svgShape"
                  ></path>
                </svg>
              </IconButton>
            </div>
            <div>
              <div className="bg-white min-h-[200px]  rounded-2xl  p-4 gap-5 ">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="text-2xl font-semibold"
                >
                  List of students in the class
                </Typography>
                <div className=" flex justify-between mt-4 w-[60%]">
                  <div className="w-[250px] flex flex-col gap-2">
                    <div className="flex justify-between w-full">
                      <p className="font-bold">Id</p>
                      <p>{classRoom?.id}</p>
                    </div>

                    <div className="flex justify-between w-full">
                      <p className="font-bold">Name</p>
                      <p>{classRoom?.name}</p>
                    </div>
                  </div>
                  <div className="w-[250px] flex flex-col gap-2">
                    <div className="flex justify-between w-full">
                      <p className="font-bold">Time Start</p>
                      <p>{classRoom?.timeStart}</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="font-bold">Time End</p>
                      <p>{classRoom?.timeEnd}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-2 justify-between items-center">
                  <span className="text-2xl font-semibold"></span>
                  <Button
                    variant="contained flex-end !bg-[#000] !text-white !rounded-md"
                    onClick={() => setOpenAddStudent(true)}
                  >
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
                </div>
                <Table columns={columns} rows={rows} />
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <ModalAddStudents
        open={openAddStudent}
        setOpen={setOpenAddStudent}
        classId={classRoom?.id}
        setStudents={setRows}
      />
      {/* tobe */}
      <ModalConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        deleteMutation={deleteStudentInClassMutation}
        deleteId={{ studentId: studentDelete?.id, classId: classRoom?.id }}
      />
    </>
  );
};

export default ModalSeeStudent;
