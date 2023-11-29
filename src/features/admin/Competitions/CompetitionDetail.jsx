import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModalJudge from "../../../components/admin/judges/modalJudge";
import ModalAddRound from "../../../components/admin/rounds/modalAddRound";
import RoundTable from "../../../components/admin/rounds/tableCollapRound";
import {
  deleteClassCompetition,
  getAllClassCanJoinCompetition,
  getAllClassCanJoinCompetitionUpdate,
  getAllClassJoinCompetition,
  getCompetitionById,
} from "../../../services/competitionService";
import { createExamForm } from "../../../services/examFormService";
import { getRoundByCompetition } from "../../../services/roundService";
import Table from "../../../components/Table/Table";
import ModalConfirmDelete from "../../../components/Modal/modalConfirmDelete";
import { STATUS_COMPETITION } from "../../../configs/competitionStatus";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CompetitionDetail = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState();
  const [open, setOpen] = useState(false);
  const [openJudge, setOpenJudge] = useState(false);
  const [roundChoose, setRoundChoose] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const navigate = useNavigate();
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
      width: 250,
    },

    { field: "examFormId", headerName: "examForm Id", width: 250 },
    { field: "roundNumber", headerName: "round", width: 200 },
    { field: "timeStart", headerName: "time Start", width: 250 },

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
                setOpenJudge(true);
                setRoundChoose(params?.row);
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
      ],
    },
  ];
  const [rows, setRows] = useState([]);

  const onSubmit = (data) => {
    createExamFormMutation.mutate(data);
    handleClose();
  };

  useQuery({
    queryKey: ["competition", id],
    enabled: !!id,
    queryFn: () => getCompetitionById(id),
    onSuccess: (data) => {
      console.log(data);
      setCompetition(data.data);
    },
  });

  useQuery({
    queryKey: ["rounds", id],
    enabled: !!id,
    queryFn: () => getRoundByCompetition(id),
    onSuccess: (data) => {
      setRows(data.data.data);
    },
  });

  useQuery({
    queryKey: ["classes", id],
    enabled: !!id,
    queryFn: () => getAllClassJoinCompetition(id),
    onSuccess: (data) => {
      console.log("class", data);
    },
  });

  const createExamFormMutation = useMutation({
    mutationFn: (data) => createExamForm(data),
    onSuccess: (data) => {
      setRows((state) => [data.data, ...state]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // class

  const columnsClass = [
    {
      field: "id",
      headerName: "ID",
      width: 450,
    },
    { field: "name", headerName: "name", width: 450 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
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
                setClassDelete({
                  classId: params?.row?.id,
                  competitionId: competition?.id,
                });
                setOpenDeleteClass(true);
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
  const [rowsClass, setRowsClass] = useState([]);
  const [openAddClass, setOpenAddClass] = useState(false);
  const [openDeleteClass, setOpenDeleteClass] = useState(false);
  const [classDelete, setClassDelete] = useState(false);
  const queryClient = useQueryClient();
  const onSubmitAddClass = (data) => {
    createExamFormMutation.mutate(data);
    handleClose();
  };
  useQuery({
    queryKey: ["classCompetition", id],
    enabled: !!id,
    queryFn: () => getAllClassJoinCompetition(id),
    onSuccess: (data) => {
      // console.log(data);
      setRowsClass(data.data.data);
    },
  });

  const { data: classesJoin } = useQuery({
    queryKey: ["classesJoin", competition?.timeStart],
    enabled: !!competition?.timeStart,
    queryFn: () => getAllClassCanJoinCompetitionUpdate(competition?.id),
  });

  const deleteClassCompetitionMutation = useMutation({
    mutationFn: deleteClassCompetition,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["classesJoin", competition?.timeStart]);
      // setRows((state) => [data.data, ...state]);
      toast.success("Delete successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("round", roundChoose);

  return (
    <>
      <div>
        <div className="bg-white min-h-[200px]  rounded-2xl  p-4 gap-5 ">
          <p
            id="modal-modal-title"
            className="font-semibold self-center !text-xl"
          >
            Competition
          </p>
          <div className=" flex justify-between mt-4">
            <div className="w-[250px] flex flex-col gap-2">
              <div className="flex justify-between w-full ">
                <p className="font-bold">Id</p>
                <p>{competition?.id}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">Name</p>
                <p>{competition?.name}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">Number of prizes</p>
                <p>{competition?.numOfPrizes}</p>
              </div>
            </div>
            <div className="w-[250px] flex flex-col gap-2">
              <div className="flex justify-between w-full">
                <p className="font-bold">Time Start</p>
                <p>{competition?.timeStart}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold">Time End</p>
                <p>{competition?.timeEnd}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">Rounds</p>
                <p>{competition?.numberOfRound}</p>
              </div>
            </div>
            <div className="w-[250px] flex flex-col gap-2">
              <div className="flex justify-between w-full">
                <p className="font-bold">Minimum number of students</p>
                <p>{competition?.minimumQuantity}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">EmployeeId</p>
                <p>{competition?.employeeId}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold">Status</p>
                <div>
                  {competition?.status === STATUS_COMPETITION.CREATED && (
                    <Chip
                      label="Upcoming"
                      color="info"
                      variant="outlined"
                      className="w-32 h-7"
                    />
                  )}
                  {competition?.status === STATUS_COMPETITION.STARTED && (
                    <Chip
                      label="In progress"
                      color="success"
                      variant="outlined"
                      className="w-32 h-7"
                    />
                  )}

                  {competition?.status === STATUS_COMPETITION.ENDED && (
                    <Chip
                      label="Completed"
                      color="secondary"
                      variant="outlined"
                      className="w-32 h-7"
                    />
                  )}
                  {competition?.status === STATUS_COMPETITION.CANCEL && (
                    <Chip
                      label="Canceled"
                      color="error"
                      variant="outlined"
                      className="w-32 h-7"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <ModalSeeRound competition={competition} /> */}
        </div>

        <div>
          <Box sx={{ width: "100%" }} className="bg-white">
            <Box className="h-8 border-b rounded-md">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="bg-[#e7e5e5] !normal-case"
                sx={{
                  ".Mui-selected": {
                    color: `black !important`,
                  },
                }}
              >
                <Tab
                  className=" !normal-case"
                  label="Rounds & Judges"
                  {...a11yProps(0)}
                />
                <Tab
                  className=" !normal-case"
                  label="Classes"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className="flex gap-2 justify-between items-center mb-4">
                <span className="text-xl font-semibold">Rounds</span>
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
              <div className="overflow-auto h-[400px]">
                <RoundTable rows={rows} />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="flex gap-2 justify-between items-center mb-4">
                <span className="text-xl font-semibold">Classes</span>
                <Button
                  variant="contained flex-end !bg-[#000] !text-white !rounded-md"
                  onClick={() => {
                    setOpenAddClass(true);
                  }}
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
              <div>
                <Table columns={columnsClass} rows={rowsClass} />
              </div>
            </CustomTabPanel>
          </Box>
          {/* <div className="flex gap-2 justify-between items-center mb-4">
            <span className="text-xl font-semibold">Rounds</span>
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
          <div className="overflow-auto h-[400px]">
            <RoundTable rows={rows} />
          </div> */}
          {/* class */}
        </div>
      </div>

      {/* <Table columns={columns} rows={rows} /> */}
      <ModalAddRound
        openAddRound={open}
        handleCloseAddRound={handleClose}
        competition={competition}
        setRows={setRows}
      />
      {/* {openJudge && (
        <ModalJudge
          open={openJudge}
          setOpenJudge={setOpenJudge}
          round={roundChoose}
        />
      )} */}
      {openAddClass && (
        <Modal
          open={openAddClass}
          onClose={() => {
            setOpenAddClass(false);
          }}
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
                Add Classes for competition
              </Typography>

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
      <ModalConfirmDelete
        open={openDeleteClass}
        setOpen={setOpenDeleteClass}
        deleteMutation={deleteClassCompetitionMutation}
        deleteId={classDelete}
      />
    </>
  );
};
export default CompetitionDetail;
