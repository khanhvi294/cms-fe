import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Table from "../../../components/Table/Table";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../../../services/studentService";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ModalConfirmDelete from "../../../components/Modal/modalConfirmDelete";
import ModalMoreInfo from "../../../components/admin/moreInfo/ModalMoreInfo";

const Students = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
    setStudentEdit(null);
  };
  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");
  const [studentEdit, setStudentEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [studentDelete, setStudentDelete] = useState(false);
  const [rows, setRows] = useState([]);
  const [openSeeInfo, setOpenSeeInfo] = useState(false);
  const [itemSee, setItemSee] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },

    { field: "fullName", headerName: "fullName", width: 400 },
    {
      field: "accountStudent", // Thêm cột mới cho tên của courseClass
      headerName: "email ",
      width: 400,
      valueGetter: (params) => params.row.accountStudent.email,
    },
    // {
    //   field: "active",
    //   headerName: "Active",
    //   width: 200,
    //   renderCell: (params) => {
    //     return params.row.active ? (
    //       <Chip
    //         label="Active"
    //         color="success"
    //         variant="outlined"
    //         className="w-20 !h-7"
    //       />
    //     ) : (
    //       <Chip
    //         label="Active"
    //         color="success"
    //         variant="outlined"
    //         className="w-20 !h-7"
    //       />
    //     );
    //   },
    // },
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
                setOpenSeeInfo(true);
                setItemSee(params.row);
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
          label="See"
        />,
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
                setStudentEdit(params.row);
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
        // <GridActionsCellItem
        //   icon={
        //     <svg
        //       xmlns="http://www.w3.org/2000/svg"
        //       viewBox="0 0 24 24"
        //       id="Lock"
        //       width={15}
        //     >
        //       <path
        //         d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"
        //         fill="#151515"
        //         className="color000000 svgShape"
        //       ></path>
        //     </svg>
        //   }
        //   label="Block"
        // />,
      ],
    },
  ];

  useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    onSuccess: (data) => {
      setRows(data.data.data);
    },
  });

  const handleCollectKeys = (keyArr, newKey, dataOri) => {
    // Tạo một đối tượng mới từ originalObject chỉ với các keys cần gom lại
    let combinedValues = {};
    keyArr.forEach((key) => (combinedValues[key] = dataOri[key]));

    // Tạo modifiedObject với spread operator và key mới chứa các giá trị đã được gom lại
    let modifiedObject = {
      ...dataOri,
      [newKey]: combinedValues,
    };
    keyArr.forEach((key) => delete modifiedObject[key]);
    return modifiedObject;
  };
  const createStudentMutation = useMutation({
    mutationFn: (data) => createStudent(data),
    onSuccess: () => {
      toast.success("Create successfully!");
      handleClose();
      queryClient.invalidateQueries(["students"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    const newStudent = handleCollectKeys(["email"], "accountStudent", data);
    if (studentEdit) {
      updateStudentMutation.mutate({ id: studentEdit?.id, ...newStudent });
    } else {
      createStudentMutation.mutate(newStudent);
    }
  };

  const queryClient = useQueryClient();

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);

      // setRows((state) => [data.data, ...state]);
      toast.success("Delete successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      handleClose();
      toast.success("Update successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-2xl font-semibold">Students</span>
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
              {studentEdit ? "Edit Student" : "Add Student"}
            </Typography>
            <div className="flex flex-col !justify-center !items-center gap-4">
              {studentEdit && (
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Id*"
                  disabled
                  variant="outlined"
                  defaultValue={studentEdit?.id}
                  className="w-full !text-black bg-slate-200"
                />
              )}
              <TextField
                id="outlined-basic"
                size="small"
                label="FullName*"
                variant="outlined"
                defaultValue={studentEdit?.fullName}
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ``}
                className="w-full"
                {...register("fullName", {
                  required: "Fullname is required filed",
                })}
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="Email*"
                variant="outlined"
                className="w-full"
                defaultValue={studentEdit?.accountStudent?.email}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ``}
                {...register("email", { required: "email is required filed" })}
              />

              <TextField
                id="outlined-basic"
                size="small"
                label="Phone"
                variant="outlined"
                className="w-full"
                type="number"
                defaultValue={studentEdit?.phone}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ``}
                {...register("phone", {
                  minLength: {
                    value: 10,
                    message: "Phone must be exactly 10 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone must be exactly 10 characters",
                  },
                })}
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="address"
                variant="outlined"
                className="w-full"
                error={!!errors.address}
                defaultValue={studentEdit?.address}
                helperText={errors.address ? errors.address.message : ``}
                {...register("address")}
              />

              <TextField
                error={!!errors.dateOfBirth}
                helperText={
                  errors.dateOfBirth ? errors.dateOfBirth.message : ``
                }
                defaultValue={
                  studentEdit ? studentEdit?.dateOfBirth : formattedToday
                }
                size="small"
                label="DOB"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: format(today, "yyyy-MM-dd"), // Set your desired maximum date
                }}
                className="w-full"
                {...register("dateOfBirth", {
                  required: "Date of birth is require",
                })}
              />

              <Controller
                name="gender"
                control={control}
                defaultValue={studentEdit ? !!studentEdit.gender : true}
                render={({ field }) => (
                  <div className="self-start">
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>

                    <RadioGroup {...field} row className="self-start">
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </div>
                )}
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
        deleteMutation={deleteStudentMutation}
        deleteId={studentDelete?.id}
      />
      <ModalMoreInfo
        open={openSeeInfo}
        setOpen={setOpenSeeInfo}
        user={itemSee}
      />
    </>
  );
};

export default Students;
