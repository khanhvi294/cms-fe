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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Table from "../../../components/Table/Table";

import { format } from "date-fns";
import { ROLES } from "../../../configs/role";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
} from "../../../services/employeeService";

const Employees = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },

    { field: "email", headerName: "email", width: 250 },
    {
      field: "role",
      headerName: "role",
      width: 200,
      renderCell: (params) => {
        const roleText =
          params.row.role === ROLES.TEACHER ? "Teacher" : "Employee";
        return <span>{roleText}</span>;
      },
    },
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
              dataName="Layer 1"
              viewBox="0 0 24 24"
              id="Edit"
              width={15}
              onClick={() => {
                handleOpen();
                setEmployeeEdit(params.row);
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
      ],
    },
  ];
  const [rows, setRows] = useState([]);
  const queryClient = useQueryClient();
  const [employeeEdit, setEmployeeEdit] = useState(null);

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
    setEmployeeEdit(null);
  };

  const onSubmit = (data) => {
    if (employeeEdit) {
      updateEmployeeMutation.mutate(data);
    } else {
      const newEmployee = handleCollectKeys(["email"], "accountEmployee", data);
      createEmployeeMutation.mutate(newEmployee);
    }

    handleClose();
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
      // handleClose();
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: (data) => updateEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      toast.success("Update successfully!");
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
        <Box className="bg-white w-[550px] min-h-[300px]  rounded-2xl">
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
              {employeeEdit ? "Edit Employee" : "Add Employee"}
            </Typography>
            <div className="flex flex-col !justify-center !items-center gap-4">
              {employeeEdit && (
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Id*"
                  disabled
                  variant="outlined"
                  defaultValue={employeeEdit?.id}
                  className="w-full !text-black bg-slate-200"
                />
              )}

              <TextField
                id="outlined-basic"
                size="small"
                label="FullName*"
                variant="outlined"
                defaultValue={employeeEdit?.fullName}
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ``}
                className="w-full"
                {...register("fullName", {
                  required: "FullName is required filed",
                })}
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="Email*"
                variant="outlined"
                className="w-full"
                defaultValue={employeeEdit?.email}
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
                defaultValue={employeeEdit?.phone}
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
                defaultValue={employeeEdit?.address}
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ``}
                {...register("address")}
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="CCCD*"
                type="number"
                defaultValue={employeeEdit?.cccd}
                variant="outlined"
                className="w-full"
                error={!!errors.cccd}
                helperText={errors.cccd ? errors.cccd.message : ``}
                {...register("cccd", {
                  required: "CCCD is required filed",
                  minLength: {
                    value: 12,
                    message: "CCCD must be exactly 12 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "CCCD must be exactly 12 characters",
                  },
                })}
              />
              <TextField
                error={!!errors.dateOfBirth}
                helperText={
                  errors.dateOfBirth ? errors.dateOfBirth.message : ``
                }
                size="small"
                label="DOB"
                type="date"
                defaultValue={
                  employeeEdit ? employeeEdit?.dateOfBirth : formattedToday
                }
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: format(today, "yyyy-MM-dd"), // Set your desired maximum date
                }}
                // defaultValue={
                //   classEdit ? classEdit.timeStart : formattedTomorrow
                // }
                className="w-full"
                {...register("dateOfBirth", {
                  required: "Date of birth is require",
                })}
              />
              <Controller
                name="role"
                control={control}
                defaultValue={employeeEdit ? employeeEdit?.role : ROLES.TEACHER}
                render={({ field }) => (
                  <div className="self-start">
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Role*
                    </FormLabel>
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="Teacher"
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Employee"
                      />
                    </RadioGroup>
                  </div>
                )}
              />

              <Controller
                name="gender" // Tên của trường trong form
                control={control}
                defaultValue={employeeEdit ? !!employeeEdit?.gender : true}
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
    </>
  );
};

export default Employees;
