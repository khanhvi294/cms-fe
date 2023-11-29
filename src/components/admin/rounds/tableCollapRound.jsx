import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteJudgeInRound,
  getJudgeByRound,
} from "../../../services/judgeService";
import ModalAddJudge from "../judges/modalAddJudge";
import ModalConfirmDelete from "../../Modal/modalConfirmDelete";
import { deleteRound } from "../../../services/roundService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { getExamForms } from "../../../services/examFormService";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openAddJudges, setOpenAddJudges] = React.useState(false);
  const [judges, setJudges] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [itemDelete, setItemDelete] = React.useState();
  const [funcDelete, setFuncDelete] = React.useState(false);
  const [openEditRound, setOpenEditRound] = React.useState(false);

  const queryClient = useQueryClient();

  const { id } = useParams();

  useQuery({
    queryKey: ["judges", row?.id],
    enabled: !!row?.id,
    queryFn: () => getJudgeByRound(row?.id),
    onSuccess: (data) => {
      setJudges(data?.data?.data);
    },
  });

  const deleteRoundMutation = useMutation({
    mutationFn: deleteRound,
    onSuccess: () => {
      queryClient.invalidateQueries(["rounds", id]);
      toast.success("Delete successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteJudgeMutation = useMutation({
    mutationFn: deleteJudgeInRound,
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers", row?.id]);
      queryClient.invalidateQueries(["judges", row?.id]);

      toast.success("Delete successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: examForms } = useQuery({
    queryKey: ["exams"],
    queryFn: getExamForms,
  });

  const onSubmit = (data) => {
    reset();
  };
  console.log(row?.examFormRound);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Up"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 29 29"
                width={18}
              >
                <path
                  fill="none"
                  stroke="#151515"
                  d="m8.5 17.5 6-6 6 6"
                  className="colorStroke000000 svgStroke"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                id="Down"
                width={18}
              >
                <path
                  d="M14.83 16.42 24 25.59l9.17-9.17L36 19.25l-12 12-12-12z"
                  fill="#151515"
                  className="color000000 svgShape"
                ></path>
                <path fill="none" d="M0-.75h48v48H0z"></path>
              </svg>
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row?.id}
        </TableCell>
        <TableCell align="right">{row?.name}</TableCell>
        <TableCell align="right">{row?.roundNumber}</TableCell>
        <TableCell align="right">{row?.examFormRound?.name}</TableCell>
        <TableCell align="right">{row?.timeStart}</TableCell>
        <TableCell align="right">{row?.time}</TableCell>
        <TableCell align="right">
          <div className="flex justify-end gap-4">
            <IconButton
              onClick={() => {
                setOpenEditRound(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="Edit"
                width={15}
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
            </IconButton>
            <IconButton
              onClick={() => {
                setItemDelete(row?.id);
                setOpenDelete(true);
                setFuncDelete(deleteRoundMutation);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Delete"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 29 29"
                xmlSpace="preserve"
                width={15}
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
            </IconButton>
          </div>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          className="!pl-24"
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} className="!w-[60%] ">
              <div className="flex justify-between">
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  className="!font-semibold"
                >
                  Judges
                </Typography>
                <IconButton onClick={() => setOpenAddJudges(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    id="Plus"
                    width={18}
                  >
                    <path
                      fill="#151515"
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM11 8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8Z"
                      className="color000000 svgShape"
                    ></path>
                  </svg>
                </IconButton>
              </div>

              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="!font-semibold">
                      Employee ID
                    </TableCell>
                    <TableCell className="!font-semibold">Name</TableCell>
                    <TableCell className="!font-semibold" align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {judges?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.employeeJudge.fullName}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            setOpenDelete(true);
                            setItemDelete({
                              roundId: item.roundId,
                              employeeId: item.employeeJudge.id,
                            });
                            setFuncDelete(deleteJudgeMutation);
                          }}
                        >
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
                              // setClassDelete(params?.row);
                              // setOpenDelete(true);
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
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ModalAddJudge
        open={openAddJudges}
        setOpen={setOpenAddJudges}
        setJudges={setJudges}
        roundId={row?.id}
      />
      <ModalConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        deleteMutation={funcDelete}
        deleteId={itemDelete}
      />
      <Modal
        open={openEditRound}
        onClose={() => {
          setOpenEditRound(false);
          reset();
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
              Edit Round
            </Typography>
            <div className="flex flex-col !justify-center !items-center gap-4">
              <TextField
                id="outlined-basic"
                size="small"
                label="Id*"
                variant="outlined"
                defaultValue={row?.id}
                disabled
                className="w-full !text-black bg-slate-200"
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="Name*"
                variant="outlined"
                defaultValue={row?.name}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ``}
                className="w-full"
                {...register("name", {
                  required: "Name is required filed",
                })}
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="Time*"
                type="number"
                variant="outlined"
                defaultValue={row?.time}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">minute</InputAdornment>
                  ),
                }}
                error={!!errors.time}
                helperText={errors.time ? errors.time.message : ``}
                className="w-full"
                {...register("time", {
                  required: "Time is required filed",
                })}
              />
            </div>
            <FormControl className="w-full" size="small" error={!!errors.role}>
              <InputLabel id="demo-select-small-label">Exam Form*</InputLabel>

              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={age}
                label="Role"
                // onChange={handleChange}
                defaultValue={row?.examFormRound?.id}
                size="small"
                {...register("examFormId", {
                  required: "Exam Form is required filed",
                })}
              >
                {examForms?.data?.data.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.examFormId && (
                <FormHelperText>{errors.examFormId.message}</FormHelperText>
              )}
            </FormControl>
            <TextField
              error={!!errors.timeStart}
              helperText={errors.timeStart ? errors.timeStart.message : ``}
              size="small"
              label="Time Start"
              type="date"
              defaultValue={new Date(row?.timeStart).toISOString().slice(0, 10)}
              className="w-full"
              {...register("timeStart", {
                required: "Time start is required filed",
              })}
            />
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
    </React.Fragment>
  );
}

export default function RoundTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="!font-semibold">ID</TableCell>
            <TableCell className="!font-semibold" align="right">
              NAME
            </TableCell>
            <TableCell className="!font-semibold" align="right">
              ROUND
            </TableCell>
            <TableCell className="!font-semibold" align="right">
              EXAM FORM
            </TableCell>
            <TableCell className="!font-semibold" align="right">
              TIME START
            </TableCell>
            <TableCell className="!font-semibold" align="right">
              EXAM TIME
            </TableCell>
            <TableCell className="!font-semibold" align="right">
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
