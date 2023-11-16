import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Table from "../../../components/Table/Table";
import {
  createEmployee,
  getEmployees,
} from "../../../services/employeeService";
import { ToastContainer, toast } from "react-toastify";

const Employees = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },

    { field: "email", headerName: "email", width: 250 },
    { field: "role", headerName: "role", width: 200 },
    { field: "fullName", headerName: "fullname", width: 200 },
    { field: "cccd", headerName: "CCCD", width: 150 },
    {
      field: "active",
      headerName: "Active",
      width: 100,
      renderCell: (params) => {
        return params.row.active ? (
          <Chip
            label="Active"
            color="success"
            variant="outlined"
            className="w-20 !h-7"
          />
        ) : (
          <Chip
            label="Active"
            color="success"
            variant="outlined"
            className="w-20 !h-7"
          />
        );
      },
    },
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
  const [rows, setRows] = useState([]);

  const handleSpreed = (oriObject, key) => {
    let subObject = oriObject[key];
    let modifiedObject = {
      ...oriObject,
      ...subObject,
    };

    delete modifiedObject[key];

    return modifiedObject;
  };

  useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
    onSuccess: (data) => {
      const processArray = data.data.data.map((item) =>
        handleSpreed(item, "accountEmployee")
      );

      setRows(processArray);
    },
  });
  // const rows = [
  //   {
  //     id: "1",
  //     role: "admin",
  //     email: "admin@gmail.com",
  //     active: 1,
  //     fullname: "Nguyễn Thúy An",
  //     accountid: "1",
  //     cccd: 1765873678,
  //   },
  //   {
  //     id: "2",
  //     role: "employee",
  //     email: "teacher@gmail.com",
  //     active: 1,
  //     fullname: "Trần Thiên Bảo",
  //     accountid: 2,
  //     cccd: 2674563789,
  //   },
  // ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = (data) => {
    const newEmployee = handleCollectKeys(["email"], "accountEmployee", data);
    createEmployeeMutation.mutate(newEmployee);
    setOpen(false);
  };
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
  const createEmployeeMutation = useMutation({
    mutationFn: (data) => createEmployee(data),
    onSuccess: (data) => {
      setRows((state) => [
        handleSpreed(data.data, "accountEmployee"),
        ...state,
      ]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-2xl font-semibold">Employees</span>

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
        <Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl">
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
              Add Employee
            </Typography>
            <div className="flex flex-col !justify-center !items-center gap-4">
              <TextField
                id="outlined-basic"
                size="small"
                label="FullName*"
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ``}
                className="w-full"
                {...register("fullName", {
                  required: "fullname is required filed",
                })}
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="Email*"
                variant="outlined"
                className="w-full"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ``}
                {...register("email", { required: "email is required filed" })}
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="CCCD/CMND*"
                variant="outlined"
                className="w-full"
                error={!!errors.CCCD}
                helperText={errors.CCCD ? errors.CCCD.message : ``}
                {...register("CCCD", {
                  required: "CCCD/CMND is required filed",
                  minLength: {
                    value: 10,
                    message: "CCCD/CMND must be exactly 10 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "CCCD/CMND must be exactly 10 characters",
                  },
                })}
              />

              {/* <FormControl
                className="w-full"
                size="small"
                error={!!errors.role}
              >
                <InputLabel id="demo-select-small-label">Role*</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="Role"
                  onChange={handleChange}
                  size="small"
                  {...register("role", { required: "role is required filed" })}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {!!errors.role && (
                  <FormHelperText>{errors.role.message}</FormHelperText>
                )}
              </FormControl> */}
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

export default Employees;
