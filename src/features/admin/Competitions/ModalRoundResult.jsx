import {
  Box,
  Collapse,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import React from "react";
import { getRoundResultByRound } from "../../../services/roundResultService";
import { useQuery } from "react-query";

export const ModalRoundResult = ({ isOpen, onClose, roundId }) => {
  const { data: roundResult, isLoading } = useQuery({
    queryKey: ["roundResult", roundId],
    queryFn: () => getRoundResultByRound(roundId),
  });

  const rows = roundResult?.data?.data;
  console.log(rows);
  const columns = [
    {},
    {
      field: "roundResultStudent.id",
      headerName: "Student ID",
      type: "number",
      width: 250,
      align: "left",
      headerAlign: "left",
      editable: false,
      valueGetter: (params) => {
        console.log("091823", params.row);
        return params.row.roundResultStudent?.id;
      },
    },
    {
      field: "roundResultStudent.fullName",
      headerName: "Name",
      width: 400,
      editable: false,
      valueGetter: (params) => params.row.roundResultStudent?.fullName,
    },

    {
      field: "roundResultScore",

      valueGetter: (params) => {
        // Kiểm tra xem có mảng roundResultScore và có phần tử đầu tiên không
        const scoreArray = params.row.roundResultScore;
        if (Array.isArray(scoreArray) && scoreArray.length > 0) {
          return scoreArray[0].score;
        }
        return ""; // Trả về chuỗi rỗng nếu không tìm thấy dữ liệu
      },
      headerName: "Score",
      align: "left",
      headerAlign: "left",
      type: "number",
      width: 200,
      editable: true,
    },
  ];
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <div className="bg-white rounded-xl p-8 w-1/2">
        <h2 className="text-2xl font-semibold text-zinc-950 mb-10">
          Round Result
        </h2>
        <div className="w-full h-[500px] overflow-y-auto">
          {/* <div><p>Score point</p> <p></p></div> */}
          {isLoading && !roundResult ? (
            <div>loading</div>
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
              {rows?.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </Table>
          )}
        </div>
      </div>
    </Modal>
  );
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const roundResultScore = row?.roundResultScore;
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
        <TableCell align="left">{row?.roundResultStudent?.fullName}</TableCell>

        <TableCell align="left">{row?.score}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          className="!pl-28"
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell width={250} className="!font-semibold">
                      Employee ID
                    </TableCell>
                    <TableCell width={400} className="!font-semibold">
                      Name
                    </TableCell>
                    <TableCell
                      width={200}
                      className="!font-semibold"
                      align="center"
                    >
                      Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roundResultScore?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item?.scoreJudge?.employeeId}
                      </TableCell>
                      <TableCell>
                        {item?.scoreJudge?.employeeJudge.fullName}
                      </TableCell>
                      <TableCell align="center">{item?.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
