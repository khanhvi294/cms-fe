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
import { useMutation, useQuery, useQueryClient } from "react-query";
import Table from "../../../components/Table/Table";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalSeeCompetition from "../../../components/admin/competitions/modalSee";
import ModalAddRound from "../../../components/admin/rounds/modalAddRound";
import { appRoutes } from "../../../routes/appRouter";
import {
  createCompetition,
  getAllClassCanJoinCompetition,
  getCompetitions,
  updateCompetition,
} from "../../../services/competitionService";
import { STATUS_COMPETITION } from "../../../configs/competitionStatus";
import ModalChangeStatus from "../../../components/admin/competitions/modalChangeStatus";

const Competitions = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [openStatus, setOpenStatus] = useState(false);

  const [openSee, setOpenSee] = useState(false);
  const [openAddRound, setOpenAddRound] = useState(false);
  const [timeStart, setTimeStart] = useState();
  const handleOpenAddRound = () => setOpenAddRound(true);
  const handleCloseAddRound = () => {
    setOpenAddRound(false);
    reset();
  };
  const handleOpenSee = () => setOpenSee(true);
  const handleCloseSee = () => setOpenSee(false);

  const [rows, setRows] = useState([]);
  const [competitionSee, setCompetitionSee] = useState();
  const [competitionStatus, setCompetitionStatus] = useState();

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
    setCompetitionEdit(null);
  };
  const defaultTimeStart = new Date().toISOString().slice(0, 10);
  const timeStartI = watch("timeStart", defaultTimeStart);
  const [competitionEdit, setCompetitionEdit] = useState(null);

  const [classesChoose, setClassesChoose] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClassesChoose(value);
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    { field: "name", headerName: "name", width: 250 },
    { field: "employeeId", headerName: "employeeid", width: 200 },
    { field: "timeStart", headerName: "timeStart", width: 200 },
    {
      field: "status",
      headerName: "status",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === STATUS_COMPETITION.CREATED && (
              <Chip
                label="Upcoming"
                color="info"
                variant="outlined"
                className="w-32 h-7"
              />
            )}
            {params.row.status === STATUS_COMPETITION.STARTED && (
              <Chip
                label="In progress"
                color="success"
                variant="outlined"
                className="w-32 h-7"
              />
            )}

            {params.row.status === STATUS_COMPETITION.ENDED && (
              <Chip
                label="Completed"
                color="secondary"
                variant="outlined"
                className="w-32 h-7"
              />
            )}
            {params.row.status === STATUS_COMPETITION.CANCEL && (
              <Chip
                label="Canceled"
                color="error"
                variant="outlined"
                className="w-32 h-7"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params) => {
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
                dataName="Layer 1"
                viewBox="0 0 24 24"
                id="Edit"
                width={15}
                onClick={() => {
                  handleOpen();
                  setCompetitionEdit(params.row);
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
                onClick={() => {
                  setOpenStatus(true);
                  setCompetitionStatus(params.row);
                }}
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
          // <GridActionsCellItem
          //   icon={
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       id="Add"
          //       x="0"
          //       y="0"
          //       version="1.1"
          //       viewBox="0 0 29 29"
          //       xml:space="preserve"
          //       width={15}
          //       onClick={() => {
          //         setCompetitionSee(params.row);
          //         handleOpenAddRound();
          //       }}
          //     >
          //       <path
          //         d="M14.5 2C7.596 2 2 7.596 2 14.5S7.596 27 14.5 27 27 21.404 27 14.5 21.404 2 14.5 2zM21 15.5h-5.5V21a1 1 0 1 1-2 0v-5.5H8a1 1 0 1 1 0-2h5.5V8a1 1 0 1 1 2 0v5.5H21a1 1 0 1 1 0 2z"
          //         fill="#151515"
          //         className="color000000 svgShape"
          //       ></path>
          //     </svg>
          //   }
          //   label="Block"
          // />,
        ];
      },
    },
  ];

  console.log("object", competitionStatus);

  useEffect(() => {
    // Xử lý khi giá trị thay đổi
    setTimeStart(timeStartI);
  }, [timeStartI]);
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

  const createCompetitionMutation = useMutation({
    mutationFn: (data) => createCompetition(data),
    onSuccess: (data) => {
      setRows((state) => [data.data, ...state]);
      handleClose();
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateCompetitionMutation = useMutation({
    mutationFn: (data) => updateCompetition(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["competitions"]);
      handleClose();
      toast.success("Update successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    if (competitionEdit) {
      updateCompetitionMutation.mutate({ ...data, id: competitionEdit?.id });
    } else {
      createCompetitionMutation.mutate(data);
    }
  };

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
                {competitionEdit ? "Edit Competition" : "Add Competition"}
              </Typography>
              {competitionEdit && (
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Id*"
                  disabled
                  variant="outlined"
                  defaultValue={competitionEdit?.id}
                  className="w-full !text-black bg-slate-200"
                />
              )}
              <div className="flex flex-col !justify-center !items-center gap-4">
                <TextField
                  id="outlined-basic"
                  size="small"
                  name="name"
                  label="Name*"
                  variant="outlined"
                  defaultValue={competitionEdit?.name}
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
                  defaultValue={
                    competitionEdit
                      ? competitionEdit?.timeStart
                      : defaultTimeStart
                  }
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
                  defaultValue={
                    competitionEdit
                      ? competitionEdit?.timeEnd
                      : defaultTimeStart
                  }
                  type="date"
                  className="w-full"
                  {...register("timeEnd", {
                    required: "Time End is required filed",
                  })}
                />
              </div>

              <TextField
                id="outlined-min"
                label="Number min of students"
                type="number"
                size="small"
                error={!!errors.minimumQuantity}
                helperText={
                  errors.minimumQuantity ? errors.minimumQuantity.message : ``
                }
                defaultValue={competitionEdit?.minimumQuantity}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("minimumQuantity", {
                  required: "Number min is required filed",
                })}
              />

              <TextField
                id="outlined-prizes"
                label="Number of prizes"
                type="number"
                size="small"
                className="w-full"
                defaultValue={competitionEdit?.numOfPrizes}
                error={!!errors.numOfPrizes}
                helperText={
                  errors.numOfPrizes ? errors.numOfPrizes.message : ``
                }
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
                error={!!errors.numberOfRound}
                helperText={
                  errors.numberOfRound ? errors.numberOfRound.message : ``
                }
                defaultValue={competitionEdit?.numberOfRound}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("numberOfRound", {
                  required: "Rounds is required filed",
                })}
              />
              {!competitionEdit && (
                <FormControl>
                  <InputLabel id="demo-mutiple-name-label">Classes</InputLabel>
                  <Controller
                    name="competitionClass"
                    control={control}
                    rules={{ required: "Please select at least one class." }}
                    defaultValue={[]}
                    render={({ field }) => (
                      <>
                        <Select label="Select Items" multiple {...field}>
                          {classesJoin?.data?.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.competitionClass && (
                          <Typography variant="caption" color="error">
                            {errors.competitionClass.message}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              )}

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
      <ModalChangeStatus
        open={openStatus}
        setOpen={setOpenStatus}
        status={competitionStatus?.status}
        competitionId={competitionStatus?.id}
      />
    </>
  );
};

export default Competitions;
