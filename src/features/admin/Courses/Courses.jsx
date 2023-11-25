import {
  Box,
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../../../components/Table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../../services/courseService";
import { toast } from "react-toastify";
import ModalConfirmDelete from "../../../components/Modal/modalConfirmDelete";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpen = () => setOpen(true);
  const [courseDelete, setCourseDelete] = useState(false);
  const [courseEdit, setCourseEdit] = useState(null);

  const handleClose = () => {
    reset();
    setOpen(false);
    setCourseEdit(null);
  };
  const [rows, setRows] = useState([]);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 260,
    },
    { field: "name", headerName: "name", width: 350 },
    { field: "trainingTime", headerName: "TimeTrainee", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 250,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              dataName="Layer 1"
              viewBox="0 0 24 24"
              id="Edit"
              width={15}
              onClick={() => {
                handleOpen();
                setCourseEdit(params.row);
              }}
            >
              <path
                d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
              <path
                d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
          }
          label="Edit"
        />,
        <GridActionsCellItem
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
                setCourseDelete(params?.row);
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

  useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    onSuccess: (data) => {
      setRows(data.data.data);
    },
  });

  const createCourseMutation = useMutation({
    mutationFn: (data) => createCourse(data),
    onSuccess: (data) => {
      setRows((state) => [data.data, ...state]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      // setRows((state) => [data.data, ...state]);
      toast.success("Update successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["courses"]);
      // setRows((state) => [data.data, ...state]);
      toast.success("Delete successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    if (courseEdit) {
      updateCourseMutation.mutate({ course: data, id: courseEdit?.id });
    } else {
      createCourseMutation.mutate(data);
    }

    handleClose();
  };
  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-2xl font-semibold">Courses</span>
        <Button
          variant="contained flex-end !bg-[#000] !text-white !rounded-md"
          onClick={handleOpen}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col p-4 gap-5"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="font-bold "
            >
              {courseEdit ? "Edit Course" : "Add Course"}
            </Typography>
            <div className="flex flex-col !justify-center !items-center gap-4">
              {courseEdit && (
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Id*"
                  disabled
                  variant="outlined"
                  defaultValue={courseEdit?.id}
                  className="w-full !text-black bg-slate-200"
                />
              )}

              <TextField
                id="outlined-basic"
                size="small"
                label="Name*"
                variant="outlined"
                defaultValue={courseEdit?.name}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ``}
                className="w-full"
                {...register("name", {
                  required: "Name is required filed",
                })}
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="Time Trainee*"
                defaultValue={courseEdit?.trainingTime}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">month</InputAdornment>
                  ),
                }}
                variant="outlined"
                className="w-full"
                type="number"
                error={!!errors.trainingTime}
                helperText={
                  errors.trainingTime ? errors.trainingTime.message : ``
                }
                {...register("trainingTime", {
                  required: "Training Time is required filed",
                })}
              />
            </div>

            <Button
              variant="contained"
              className="self-end !normal-case !rounded-lg !bg-black"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
      <ModalConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        deleteMutation={deleteCourseMutation}
        deleteId={courseDelete?.id}
      />
    </>
  );
};

export default Courses;
