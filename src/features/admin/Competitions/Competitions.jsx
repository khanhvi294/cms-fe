import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Table from "../../../components/Table/Table";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import ModalSeeCompetition from "../../../components/admin/competitions/modalSee";
import ModalAddRound from "../../../components/admin/rounds/modalAddRound";
import {
  createCompetition,
  getAllClassCanJoinCompetition,
  getCompetitions,
} from "../../../services/competitionService";
import { redirect, useNavigate } from "react-router-dom";
import { appRoutes } from "../../../routes/appRouter";

const Competitions = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [openSee, setOpenSee] = useState(false);
  const [openAddRound, setOpenAddRound] = useState(false);
  const handleOpenAddRound = () => setOpenAddRound(true);
  const handleCloseAddRound = () => {
    setOpenAddRound(false);
    reset();
  };
  const handleOpenSee = () => setOpenSee(true);
  const handleCloseSee = () => setOpenSee(false);

  const [rows, setRows] = useState([]);
  const [competitionSee, setCompetitionSee] = useState();
  // const defaultValues = {
  //   dob: new Date().toISOString().slice(0, 10),
  // };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const timeStart = watch("timeStart");

  const [classesChoose, setClassesChoose] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log("va", value);
    setClassesChoose(value);
  };
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    { field: "name", headerName: "name", width: 250 },
    { field: "employeeId", headerName: "employeeid", width: 200 },
    { field: "timeStart", headerName: "timeStart", width: 250 },
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
      getActions: (params) => {
        console.log("params: ", params);
        return [
          <GridActionsCellItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="Eye"
                width={15}
                onClick={() => {
                  navigate(
                    `${appRoutes.ACOMPETITIONS}/${params.row?.id || params.id}`
                  );
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
                  setCompetitionSee(params.row);
                  handleOpenAddRound();
                }}
              >
                <path
                  d="M14.5 2C7.596 2 2 7.596 2 14.5S7.596 27 14.5 27 27 21.404 27 14.5 21.404 2 14.5 2zM21 15.5h-5.5V21a1 1 0 1 1-2 0v-5.5H8a1 1 0 1 1 0-2h5.5V8a1 1 0 1 1 2 0v5.5H21a1 1 0 1 1 0 2z"
                  fill="#151515"
                  className="color000000 svgShape"
                ></path>
              </svg>
            }
            label="Block"
          />,
        ];
      },
    },
  ];

  const fieldValue = watch("competitionClass");

  useEffect(() => {
    // Xử lý khi giá trị thay đổi
    console.log("Giá trị đã thay đổi:", fieldValue);
  }, [fieldValue]);
  useQuery({
    queryKey: ["competitions"],
    queryFn: getCompetitions,
    onSuccess: (data) => {
      setRows(data.data.data);
    },
  });

  const { data: classesJoin } = useQuery({
    queryKey: ["classesJoin", timeStart],
    enabled: !!timeStart,
    queryFn: () => getAllClassCanJoinCompetition(timeStart),
  });
  console.log("vooo", classesJoin);

  const createCompetitionMutation = useMutation({
    mutationFn: (data) => createCompetition(data),
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
    console.log("daatta", data);
    createCompetitionMutation.mutate(data);
    handleClose();
  };

  // const { control } = useForm({
  //   defaultValues: {
  //     dob: new Date().toISOString().slice(0, 10),
  //   },
  // });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-2xl font-semibold">Competitions</span>
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
      {open && (
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
                Add Competition
              </Typography>
              <div className="flex flex-col !justify-center !items-center gap-4">
                <TextField
                  id="outlined-basic"
                  size="small"
                  name="name"
                  label="Name*"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ``}
                  className="w-full"
                  {...register("name", {
                    required: "Name is required filed",
                  })}
                />
              </div>
              <div className="flex gap-5">
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
                <TextField
                  error={!!errors.timeEnd}
                  helperText={errors.timeEnd ? errors.timeEnd.message : ``}
                  size="small"
                  label="Time End"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  type="date"
                  className="w-full"
                  {...register("timeEnd", {
                    required: "Time End is required filed",
                  })}
                />
              </div>
              <div className="flex gap-5">
                <TextField
                  id="outlined-min"
                  label="Number min"
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("minimumQuantity", {
                    required: "Number min is required filed",
                  })}
                />
                <TextField
                  id="outlined-max"
                  label="Number max"
                  type="number"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("maximumQuantity", {
                    required: "Number max is required filed",
                  })}
                />
              </div>
              <TextField
                id="outlined-prizes"
                label="Number of prizes"
                type="number"
                size="small"
                className="w-full"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("numOfPrizes", {
                  required: "Number of prizes is required filed",
                })}
              />
              <TextField
                id="outlined-round"
                label="Rounds"
                type="number"
                size="small"
                className="w-full"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("numberOfRound", {
                  required: "Rounds is required filed",
                })}
              />

              <FormControl>
                <InputLabel id="demo-mutiple-name-label">Classes</InputLabel>
                <Controller
                  name="competitionClass"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select label="Select Items" multiple {...field}>
                      {classesJoin?.data?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              {/* <FormControl>
                <InputLabel id="demo-multiple-checkbox-label">
                  Classes
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  size="small"
                  multiple
                  value={classesChoose}
                  onChange={handleChange}
                  input={<OutlinedInput label="Classes" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  {...register("competitionClass", {
                    required: "Rounds is required filed",
                  })}
                >
                  {classesJoin?.data?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {console.log(classesChoose)}
                      <Checkbox checked={classesChoose.indexOf(item.id) >= 0} />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
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
      )}
      {openSee && (
        <ModalSeeCompetition
          open={openSee}
          handleClose={handleCloseSee}
          competition={competitionSee}
        />
      )}
      {/* add round*/}
      <ModalAddRound
        openAddRound={openAddRound}
        handleCloseAddRound={handleCloseAddRound}
        competition={competitionSee}
      />
    </>
  );
};

export default Competitions;
