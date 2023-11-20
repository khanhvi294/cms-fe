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
import Table from "../../../components/Table/Table";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createClass, getClasses } from "../../../services/classService";
import { toast } from "react-toastify";
import { getCourses } from "../../../services/courseService";
import { GridActionsCellItem } from "@mui/x-data-grid";
import ModalAddStudents from "../../../components/admin/student/modalAddStudents";

const Classes = () => {
  const [open, setOpen] = useState(false);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [studentsOfClass, setStudentsOfClass] = useState([]);
  const [classChoose, setClassChoose] = useState(false);
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
              id="Judge"
              width={15}
              onClick={() => {
                // setOpenJudge(true);
                // setRoundChoose(params?.row);
              }}
            >
              <path
                d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
          }
          label="Judge"
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
                setClassChoose(params.row.id);
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
      <ModalAddStudents
        open={openAddStudent}
        setOpen={setOpenAddStudent}
        classId={classChoose}
        setStudents={setStudentsOfClass}
      />
    </>
  );
};

export default Classes;
