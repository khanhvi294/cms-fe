import { Box, Button, Chip, Modal, Tab, Tabs } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useMemo, useState } from "react";
import {
  getAllClassJoinCompetition,
  getCompetitionById,
} from "../../../services/competitionService";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../../../components/Table/Table";
import { STATUS_COMPETITION } from "../../../configs/competitionStatus";
import { useModal } from "../../../hooks/use-modal";
import {
  getAllCompetitionByStudentId,
  getRegisterByCompetition,
  registerCompetition,
  unRegisterCompetition,
} from "../../../services/registerService";
import { getRoundByCompetition } from "../../../services/roundService";
import { FinalResult } from "../components/FinalResult";

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

const Competition = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);
  const { close, isOpen, open } = useModal();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  useQuery({
    queryKey: ["competition", id],
    enabled: !!id,
    queryFn: () => getCompetitionById(id),
    onSuccess: (data) => {
      setCompetition(data?.data);
    },
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: classes } = useQuery({
    queryKey: ["classes", id],
    enabled: !!id,
    queryFn: () => getAllClassJoinCompetition(id),
  });
  const { data: rounds } = useQuery({
    queryKey: ["rounds", id],
    enabled: !!id,
    queryFn: () => getRoundByCompetition(id),
  });

  const { data: participantData } = useQuery({
    queryKey: ["participant", id],
    enabled: !!id,
    queryFn: () => getRegisterByCompetition(id),
  });
  console.log(participantData);
  const participants = useMemo(() => {
    if (!participantData?.data?.data) return [];

    return participantData?.data?.data?.map((item) => {
      return item?.studentRegister;
    });
  }, [participantData?.data]);
  const user = useSelector((state) => state.user?.data?.info);

  const { data: competitionUser } = useQuery({
    queryKey: ["competition", user?.id],
    enabled: !!user?.id,
    queryFn: getAllCompetitionByStudentId,
  });

  const competitionIds = useMemo(() => {
    return competitionUser?.data?.data.map(
      (item) => item.competitionRegister?.id
    );
  }, [competitionUser?.data?.data]);

  const competitionStartDate = new Date(competition?.timeStart).setHours(
    0,
    0,
    0,
    0
  );
  const isRegister = competitionIds?.includes(competition?.id);
  const currentDate = new Date().setHours(0, 0, 0, 0);

  const timeDifference = competitionStartDate - currentDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const queryClient = useQueryClient();
  const registerCompetitionMutation = useMutation({
    mutationFn: registerCompetition,
    onSuccess: (data) => {
      //setRows((state) => [data.data, ...state]);
      queryClient.invalidateQueries(["competition", user?.id]);
      toast.success("Register successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const unRegisterCompetitionMutation = useMutation({
    mutationFn: unRegisterCompetition,
    onSuccess: (data) => {
      //setRows((state) => [data.data, ...state]);
      queryClient.invalidateQueries(["competition", user?.id]);

      toast.success("Unregister successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const canSeeResult =
    (competition?.status === 2 || competition?.status === 1) && isRegister;
  const navigate = useNavigate();
  const handleShowResult = (id) => {
    navigate(`/competitions/${id}/result`);
  };
  return (
    <>
      <div>
        <div>
          <p className="font-semibold text-xl mb-3">Competition</p>
        </div>
        <div className="bg-[#f9bc0d] flex p-5 justify-between">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              id="Championtrophy"
              width={100}
              className="px-3"
            >
              <path
                d="M18 4V2H6v2a4 4 0 0 0 0 8h.38a6.18 6.18 0 0 0 1.41 2.21A4.07 4.07 0 0 1 9 17H6v3H5v2h14v-2h-1v-3h-3a4.07 4.07 0 0 1 1.2-2.79A6.18 6.18 0 0 0 17.62 12H18a4 4 0 0 0 0-8ZM6 10a2 2 0 0 1 0-4Zm4-4h4v2h-4Zm6 13v1H8v-1h8Zm2-9V6a2 2 0 0 1 0 4Z"
                fill="#ffffff"
                className="color000000 svgShape"
              ></path>
            </svg>
            <div className="text-white ">
              <div>
                <p className="font-medium text-lg">{competition?.name}</p>
                <p className="text-sm opacity-60">
                  {competition?.people} participants
                </p>
              </div>
              <div className="flex gap-6 mt-4">
                <div>
                  <p>{competition?.timeStart}</p>
                  <p className="text-sm opacity-60">Start Time</p>
                </div>
                <div>
                  <p>{competition?.timeEnd}</p>
                  <p className="text-sm opacity-60">End Time</p>
                </div>
                <div>
                  {competition?.status === STATUS_COMPETITION.CREATED && (
                    <p>Upcoming</p>
                  )}
                  {competition?.status === STATUS_COMPETITION.STARTED && (
                    <p>In progress</p>
                  )}
                  {competition?.status === STATUS_COMPETITION.ENDED && (
                    <p>Completed</p>
                  )}
                  {competition?.status === STATUS_COMPETITION.CANCEL && (
                    <p>Canceled</p>
                  )}
                  <p className="text-sm opacity-60">Status</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              {canSeeResult && (
                <Button
                  onClick={() => handleShowResult(competition?.id)}
                  className="!bg-yellow-700 !text-white"
                >
                  My result
                </Button>
              )}
              {competition?.status === 2 && (
                <Button onClick={open} className="!bg-red-700 !text-white">
                  Final result
                </Button>
              )}
            </div>
          </div>

          {competition?.status === STATUS_COMPETITION.CREATED && (
            <div>
              {isRegister ? (
                <Button
                  className="!bg-[#f09b5e] !text-white"
                  onClick={() =>
                    unRegisterCompetitionMutation.mutate(competition?.id)
                  }
                >
                  UnRegister
                </Button>
              ) : (
                <Button
                  className="!bg-[#44badc] !text-white"
                  onClick={() =>
                    registerCompetitionMutation.mutate(competition?.id)
                  }
                >
                  Register
                </Button>
              )}
            </div>
          )}
        </div>
        <Box sx={{ width: "100%" }} className="bg-white mt-6">
          <Box className="px-6 pt-6">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="bg-[#f6f7fb] !normal-case"
              sx={{
                ".Mui-selected": {
                  color: `white !important`,
                },
              }}
            >
              <Tab
                sx={{
                  bgcolor: value === 0 ? "#2ab7ca" : "",
                }}
                label="Description"
                {...a11yProps(0)}
                className=" !normal-case"
              />
              <Tab
                label="Rounds"
                sx={{
                  bgcolor: value === 1 ? "#2ab7ca" : "",
                }}
                {...a11yProps(1)}
                className=" !normal-case"
              />
              <Tab
                label="Participants"
                sx={{
                  bgcolor: value === 2 ? "#2ab7ca" : "",
                }}
                {...a11yProps(2)}
                className=" !normal-case"
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="h-10 bg-[#eef2f7] flex items-center pl-4">
              INTRODUCT
            </div>
            <div className="bg-white w-full px-5 flex flex-col gap-1 py-3 ">
              <p>Number of prizes: {competition?.numOfPrizes}</p>
              <p>
                Maximum number of participants: {competition?.minimumQuantity}
              </p>
              <p> Round: {competition?.numberOfRound}</p>
            </div>
            <div className="h-10 bg-[#eef2f7] flex items-center pl-4">
              CLASSES ARE ALLOW
            </div>
            <div className="mt-4 px-5">
              <table style={{ border: "1px solid black" }}>
                <tbody>
                  {classes?.data?.data.map((item, index) => (
                    <tr key={index}>
                      <td className="p-3">{item?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="flex gap-20">
              {rounds?.data?.data
                ?.slice()
                ?.reverse()
                ?.map((item, index) => (
                  <RoundDetail key={index} round={item} />
                ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="flex flex-wrap gap-3">
              {participants?.map((item, index) => (
                <Participant key={index} participant={item} />
              ))}
            </div>
          </CustomTabPanel>
        </Box>
      </div>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <FinalResult competition={competition} rounds={rounds?.data?.data} />
      </Modal>
    </>
  );
};

export default Competition;

const RoundDetail = ({ round }) => {
  const isApproved = round?.approved;
  const { close, isOpen, open } = useModal();
  const columns = [
    {
      field: "roundResultStudent.id",
      headerName: "ID",
      width: 200,
      valueGetter: (params) => params.row.roundResultStudent.id,
    },

    {
      field: "roundResultStudent.fullName",
      headerName: " FullName",
      width: 300,
      valueGetter: (params) => params.row.roundResultStudent.fullName,
    },
    {
      headerName: "Status",
      width: 160,
      // chip
      renderCell: (params) => {
        const scorePoint = round?.scorePoint;
        const score = params.row.score;
        if (score >= scorePoint) {
          return <Chip label="Pass" color="success" />;
        } else {
          return <Chip label="Fail" color="error" />;
        }
      },
    },
  ];
  return (
    <div
      key={round.id}
      className="border rounded-md w-[250px] h-[300px] p-6 shadow-md bg-amber-100 "
    >
      <p className="text-red-500 text-lg mb-5 mx-auto">{round?.name}</p>
      <div className="flex justify-between my-4 ">
        <p className="font-semibold">exam form: </p>
        <p>{round?.examFormRound.name}</p>
      </div>

      <div className="flex justify-between my-4">
        <p className="font-semibold">Time</p>
        <p>{round?.time} minutes</p>
      </div>
      <div className="flex justify-between my-4">
        <p className="font-semibold">Date</p>
        <p>{round?.timeStart}</p>
      </div>
      <Button
        title={
          isApproved ? "" : "This round has not been approved by the admin"
        }
        disabled={!isApproved}
        variant="contained"
        color="primary"
        className="w-full"
        onClick={open}
      >
        Result
      </Button>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-white w-[720px] h-[620px]  flex flex-col p-4 gap-7 rounded-xl">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="!font-semibold "
          >
            Result
          </Typography>
          <Table columns={columns} rows={round.roundResultRound} />
        </Box>
      </Modal>
    </div>
  );
};

const Participant = ({ participant }) => {
  return (
    <div className="flex flex-col w-[300px] p-6 bg-amber-100 justify-between items-center shadow-md rounded-md py-3">
      <div className="flex items-center gap-3">
        <p>{participant?.fullName}</p>
      </div>
      <div className="flex items-center gap-3">
        <p>{participant?.accountStudent?.email}</p>
        <p>{participant?.phone}</p>
      </div>
    </div>
  );
};
