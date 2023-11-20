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
import { useQuery } from "react-query";
import { getJudgeByRound } from "../../../services/judgeService";
import ModalAddJudge from "../judges/modalAddJudge";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openAddJudges, setOpenAddJudges] = React.useState(false);
  const [judges, setJudges] = React.useState([]);

  useQuery({
    queryKey: ["judges", row?.id],
    enabled: !!row?.id,
    queryFn: () => getJudgeByRound(row?.id),
    onSuccess: (data) => {
      console.log(data);
      setJudges(data?.data?.data);
    },
  });

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
        <TableCell align="right">{row?.examFormId}</TableCell>
        <TableCell align="right">{row?.roundId}</TableCell>
        <TableCell align="right">{row.timeStart}</TableCell>
        <TableCell align="right">
          <div className="flex justify-end gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="Judge"
              width={15}
              onClick={() => console.log("hihi")}
            >
              <path
                d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="Judge"
              width={15}
              onClick={() => console.log("222hihi")}
            >
              <path
                d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
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
                      <TableCell align="right">{item.amount}</TableCell>
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
              EXAMFORM ID
            </TableCell>
            <TableCell className="!font-semibold" align="right">
              ROUND
            </TableCell>
            <TableCell className="!font-semibold" align="right">
              TIME START
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
