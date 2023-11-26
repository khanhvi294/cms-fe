import {
  Box,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getAllClassJoinCompetition,
  getCompetitionById,
} from "../../../services/competitionService";
import { useState } from "react";

// const competition = {
//   name: "Kiểm thử phần mềm",
//   status: 2,
//   timeStart: "01-11-2023",
//   timeEnd: "11-11-2023",
//   soVong: 2,
//   people: 12,
// };

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const { data: classes } = useQuery({
    queryKey: ["classes", id],
    enabled: !!id,
    queryFn: () => getAllClassJoinCompetition(id),
    // onSuccess: (data) => {
    //   console.log("class", data);
    // },
  });
  return (
    <div>
      <div>
        <p className="font-semibold text-xl mb-3">Competition</p>
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
              {competition?.status === 0 && <p>Upcoming</p>}
              {competition?.status === 1 && <p>In progress</p>}
              {competition?.status === 2 && <p>Completed</p>}
              {competition?.status === 3 && <p>Canceled</p>}
              <p className="text-sm opacity-60">Status</p>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%" }} className="bg-white">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            inkBarStyle={{ background: "blue" }}
          >
            <Tab
              sx={{
                color:
                  value === 0 ? "#ff0000 !important" : "rgba(0, 0, 0, 0.54)",
              }}
              label="Description"
              {...a11yProps(0)}
            />
            <Tab label="Rounds" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="h-10 bg-[#eef2f7] flex items-center">Introduc</div>
          <div className="bg-white w-full px-5 flex flex-col gap-1 py-3 ">
            <p>Number of prizess157: {competition?.numOfPrizes}</p>
            <p>
              Maximum number of participants: {competition?.minimumQuantity}
            </p>
            <p> Round: {competition?.numberOfRound}</p>
          </div>
          <div className="h-10 bg-[#eef2f7] flex items-center">
            classes are allowed{" "}
          </div>
          <div className="mt-4">
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
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
      {/*
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
      </TableContainer> */}
    </div>
  );
};

export default Competition;
