import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../../../components/Table/Table";
import { useMutation, useQuery } from "react-query";
import { createCourse, getCourses } from "../../../services/courseService";
import { toast } from "react-toastify";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const [rows, setRows] = useState([]);
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
              viewBox="0 0 24 24"
              id="Lock"
              width={15}
            >
              <path
                d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
          }
          label="Block"
        />,
        <GridActionsCellItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 32 32"
              id="notification"
              width={30}
            >
              <path d="M26.59 21.17a2 2 0 0 1-.59-1.41V14a10 10 0 0 0-7.64-9.71 2.47 2.47 0 0 0 .14-.79 2.5 2.5 0 0 0-5 0 2.47 2.47 0 0 0 .14.79A10 10 0 0 0 6 14v5.76a2 2 0 0 1-.59 1.41A4.79 4.79 0 0 0 4 24.59V25a2 2 0 0 0 2 2h7.18a3 3 0 0 0-.18 1 3 3 0 0 0 6 0 3 3 0 0 0-.18-1H26a2 2 0 0 0 2-2v-.41a4.79 4.79 0 0 0-1.41-3.42ZM15.5 3.5a.5.5 0 1 1 .5.5.5.5 0 0 1-.5-.5Z"></path>
            </svg>
          }
          label="Print"
          showInMenu
        />,
      ],
    },
  ];

  useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    onSuccess: (data) => {
      console.log(data.data.data);
      setRows(data.data.data);
    },
  });

  const createCourseMutation = useMutation({
    mutationFn: (data) => createCourse(data),
    onSuccess: (data) => {
      console.log(data);
      setRows((state) => [data.data, ...state]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    createCourseMutation.mutate(data);
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
              Add Course
            </Typography>
            <div className="flex flex-col !justify-center !items-center gap-4">
              <TextField
                id="outlined-basic"
                size="small"
                label="Name*"
                variant="outlined"
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
    </>
  );
};

export default Courses;
