import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import Table from "../../../components/Table/Table";
import ModalSeeStudent from "../../../components/admin/student/modalSeeStudents";
import { createClass, getClasses } from "../../../services/classService";
import { getCourses } from "../../../services/courseService";

const Classes = () => {
  const [open, setOpen] = useState(false);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openSeeStudents, setOpenSeeStudents] = useState(false);
  const [classChoose, setClassChoose] = useState();
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
      width: 150,
    },

    { field: "courseId", headerName: "courseid", width: 150 },
    { field: "name", headerName: "name", width: 250 },
    { field: "timeStart", headerName: "timestart", width: 200 },
    { field: "timeEnd", headerName: "timeend", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="Eye"
              width={15}
              onClick={() => {
                setClassChoose(params.row);
                setOpenSeeStudents(true);
              }}
            >
              <g
                data-name="Layer 2"
                fill="#151515"
                className="color000000 svgShape"
              >
                <g
                  data-name="eye"
                  fill="#151515"
                  className="color000000 svgShape"
                >
                  <rect
                    width="24"
                    height="24"
                    opacity="0"
                    fill="#151515"
                    className="color000000 svgShape"
                  ></rect>
                  <path
                    d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"
                    fill="#151515"
                    className="color000000 svgShape"
                  ></path>
                  <path
                    d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
                    fill="#151515"
                    className="color000000 svgShape"
                  ></path>
                </g>
              </g>
            </svg>
          }
          label="Block"
        />,
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
              id="Add"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 29 29"
              xml:space="preserve"
              width={15}
              onClick={() => {
                setOpenAddStudent(true);
                setClassChoose(params.row);
              }}
            >
              <path
                d="M14.5 2C7.596 2 2 7.596 2 14.5S7.596 27 14.5 27 27 21.404 27 14.5 21.404 2 14.5 2zM21 15.5h-5.5V21a1 1 0 1 1-2 0v-5.5H8a1 1 0 1 1 0-2h5.5V8a1 1 0 1 1 2 0v5.5H21a1 1 0 1 1 0 2z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
          }
          label="Add Student"
        />,
      ],
    },
  ];

  useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
    onSuccess: (data) => {
      console.log(data.data.data);
      setRows(data.data.data);
    },
  });

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const createStudentMutation = useMutation({
    mutationFn: (data) => createClass(data),
    onSuccess: (data) => {
      setRows((state) => [data.data, ...state]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    createStudentMutation.mutate(data);
    handleClose();
  };

  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-2xl font-semibold">Classes</span>
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
            className=" flex flex-col p-4 gap-6"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="font-bold "
            >
              Add Class
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
                error={!!errors.timeStart}
                helperText={errors.timeStart ? errors.timeStart.message : ``}
                size="small"
                label="Time Start"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                className="w-full"
                {...register("timeStart", {
                  required: "Time start is required filed",
                })}
              />

              <FormControl
                className="w-full"
                size="small"
                error={!!errors.role}
              >
                <InputLabel id="demo-select-small-label">Course*</InputLabel>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  // value={age}
                  label="Role"
                  // onChange={handleChange}
                  defaultValue={courses?.data?.data[0]?.id}
                  size="small"
                  {...register("courseId", {
                    required: "Course is required filed",
                  })}
                >
                  {courses?.data?.data.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.courseId && (
                  <FormHelperText>{errors.courseId.message}</FormHelperText>
                )}
              </FormControl>
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
      {/* <ModalAddStudents
        open={openAddStudent}
        setOpen={setOpenAddStudent}
        classId={classChoose?.id}
        
      /> */}
      <ModalSeeStudent
        open={openSeeStudents}
        setOpen={setOpenSeeStudents}
        classRoom={classChoose}
      />
    </>
  );
};

export default Classes;
