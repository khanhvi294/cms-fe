import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const cuocThi = {
  name: "Kiểm thử phần mềm",
  status: 2,
  timeStart: "01-11-2023",
  timeEnd: "11-11-2023",
  soVong: 2,
  people: 12,
};
const Competition = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const rows = [
    createData(1, 1, "Phạm Thiên An", 9.0),
    createData(2, 6, "Trần Ngọc Bảo", 8.3),
    createData(3, 3, "Trần Đình Hưng", 8.0),
    createData(4, 5, "Võ Tiến Khoa", 7.3),
    createData(5, 7, "Võ Thị Bích Loan", 6.9),
    createData(6, 2, "Nguyễn Lê Minh", 6.6),
    createData(7, 8, "Nguyễn Thị Thùy Linh", 6.59),
    createData(8, 9, "Vũ Trung Kiên", 5.9),
  ];

  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <div>
      <div>
        <p className="font-semibold text-xl mb-3">Cuộc thi</p>
      </div>
      <div className="bg-[#f9bc0d] flex p-5">
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
            <p className="font-medium text-lg">{cuocThi.name}</p>
            <p className="text-sm opacity-60">{cuocThi.people} participants</p>
          </div>
          <div className="flex gap-6 mt-4">
            <div>
              <p>{cuocThi.timeStart}</p>
              <p className="text-sm opacity-60">Start Time</p>
            </div>
            <div>
              {cuocThi.status === 0 && <p>Upcoming</p>}
              {cuocThi.status === 1 && <p>In progress</p>}
              {cuocThi.status === 2 && <p>Completed</p>}
              {cuocThi.status === 3 && <p>Canceled</p>}
              <p className="text-sm opacity-60">Status</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full px-5 flex flex-col gap-1 py-3 text-[#838c96]">
        <p>Number of prizes: 3</p>
        <p>Maximum number of participants: 20</p>
        <p> Minimum number of participants: 4</p>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell align="right"> Student ID</StyledTableCell>
              <StyledTableCell align="right"> Full name</StyledTableCell>
              <StyledTableCell align="right"> Score</StyledTableCell>

              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Competition;
