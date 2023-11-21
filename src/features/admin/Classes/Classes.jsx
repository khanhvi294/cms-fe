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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Table from "../../../components/Table/Table";
import ModalSeeStudent from "../../../components/admin/student/modalSeeStudents";
import {
  createClass,
  deleteClass,
  getClasses,
  updateClass,
} from "../../../services/classService";
import { getCourses } from "../../../services/courseService";
import { addDays, format } from "date-fns";
import ModalConfirmDelete from "../../../components/Modal/modalConfirmDelete";

const Classes = () => {
  const [open, setOpen] = useState(false);

  const [openSeeStudents, setOpenSeeStudents] = useState(false);
  const [classEdit, setClassEdit] = useState(null);
  const [classChoose, setClassChoose] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [classDelete, setClassDelete] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
    setClassEdit(null);
  };
  const [rows, setRows] = useState([]);
  const today = new Date();
  const queryClient = useQueryClient();
  const tomorrow = addDays(today, 1);
  const formattedTomorrow = format(tomorrow, "yyyy-MM-dd");
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
              dataName="Layer 1"
              viewBox="0 0 24 24"
              id="Edit"
              width={15}
              onClick={() => {
                handleOpen();
                setClassEdit(params.row);
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
          label="Block"
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
                setClassDelete(params?.row);
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
        <GridActionsCellItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              id="Student"
              width={15}
              onClick={() => {
                setOpenSeeStudents(true);
                setClassChoose(params.row);
              }}
            >
              <path
                d="m59.3 12.6-27-10c-.2-.1-.5-.1-.7 0l-27 10c-.3.1-.6.5-.6.9s.3.8.7.9l9.3 3.5v5.6c0 .2 0 .3.1.5.1.1.6 1.1 1.9 2.3 0 .1-.1.2-.1.3v.1c-2.8.5-5 2.9-5 5.9s2.2 5.4 5 5.9V38.8c0 .1.8 5.1 4.5 9.1-5.3 2.6-9.6 7-12.1 12.4-.1.3-.1.7.1 1 .2.3.5.5.8.5h45.4c.3 0 .7-.2.8-.5s.2-.6.1-1c-2.5-5.4-6.8-9.7-12.1-12.4 3.6-4 4.5-9 4.5-9.1V38.5c2.8-.5 5-2.9 5-5.9s-2.2-5.4-5-5.9v-.1c0-.1 0-.2-.1-.3 1.3-1.2 1.9-2.1 1.9-2.3.1-.2.1-.3.1-.5v-5.6l4-1.5v8.3c-1.2.4-2 1.5-2 2.8 0 1.7 1.3 3 3 3s3-1.3 3-3c0-1.3-.8-2.4-2-2.8v-9l3.3-1.2c.4-.1.7-.5.7-.9s-.1-.9-.5-1zM55 28.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm-37-.7c1.2.8 2.6 1.6 4.4 2.2-.7.9-2.2 2.1-4.4 2.4v-4.6zm-5 4.7c0-1.9 1.3-3.4 3-3.9v7.7c-1.7-.4-3-1.9-3-3.8zm9 16.7c1.6 1.3 3.6 2.4 6.1 2.9l4.1 7.4H10.8c2.6-4.6 6.5-8.2 11.2-10.3zm8.7 3.3h2.6L32 54.7l-1.3-2.2zm22.4 7H34.6L33 56.7l2.8-4.6c2.5-.5 4.5-1.6 6.1-2.9 4.8 2.1 8.7 5.7 11.2 10.3zM46 38.4c-.2 1.1-2.3 12.1-14 12.1-11.6 0-13.8-11-14-12.1v-4c3.7-.4 5.7-2.7 6.5-3.8.9.2 1.8.4 2.8.6.5.8 3.5 4.8 8.5 5.7.7.1 1.4.2 2.1.2h.1v.5c0 .6.4 1 1 1s1-.4 1-1v-.7c2-.3 4-1.2 6-2.4v3.9zm0-6.4c-3.4 2.5-6.8 3.5-9.8 2.9-2.8-.5-4.9-2.2-6.1-3.5.6 0 1.3.1 1.9.1 6.8 0 11.2-1.8 14-3.7V32zm5 .5c0 1.9-1.3 3.4-3 3.9v-7.7c1.7.4 3 1.9 3 3.8zm-3-9.3c-.8 1.1-4.9 6.3-16 6.3s-15.2-5.2-16-6.3v-4.6l15.7 5.8c.1 0 .2.1.3.1s.2 0 .3-.1L48 18.6v4.6zm-16-.8L7.9 13.5 32 4.6l24.1 8.9L32 22.4z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
              <path
                d="M25 34.5c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1zm12.3 9.1c-.5-.2-1.1.1-1.3.6 0 0-.8 2.3-4.1 2.3-3.2 0-4-2.2-4.1-2.3-.2-.5-.7-.8-1.3-.6-.5.2-.8.7-.6 1.3.1.2 1.3 3.7 5.9 3.7s5.9-3.5 5.9-3.7c.4-.6.1-1.2-.4-1.3z"
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

  const createClassMutation = useMutation({
    mutationFn: (data) => createClass(data),
    onSuccess: (data) => {
      setRows((state) => [data.data, ...state]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateClassMutation = useMutation({
    mutationFn: (data) => updateClass(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["classes"]);
      toast.success("Update successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteClassMutation = useMutation({
    mutationFn: deleteClass,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["classes"]);
      // setRows((state) => [data.data, ...state]);
      toast.success("Delete successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    if (classEdit) {
      updateClassMutation.mutate({ ...data, id: classEdit?.id });
    } else {
      createClassMutation.mutate(data);
    }
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
              {classEdit ? "Edit Class" : "Add Class"}
            </Typography>
            <div className="flex flex-col !justify-center !items-center gap-4">
              {classEdit && (
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Id*"
                  disabled
                  variant="outlined"
                  defaultValue={classEdit?.id}
                  className="w-full !text-black bg-slate-200"
                />
              )}

              <TextField
                id="outlined-basic"
                size="small"
                label="Name*"
                variant="outlined"
                defaultValue={classEdit?.name}
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
                inputProps={{
                  min: formattedTomorrow,
                }}
                defaultValue={
                  classEdit ? classEdit.timeStart : formattedTomorrow
                }
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
      <ModalConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        deleteMutation={deleteClassMutation}
        deleteId={classDelete?.id}
      />
    </>
  );
};

export default Classes;
