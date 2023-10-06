import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  Popover,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Input from "@mui/material/Input";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { deepOrange } from "@mui/material/colors";

const cuocThi = {
  name: "Lập trình web",
  status: 2,
  time: "20-10-2021",
  address: "B201",
};
function App() {
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  //const open = Boolean(anchorEl);
  //const id = open ? "simple-popover" : undefined;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose2 = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* admin */}
      <div className="flex h-full">
        <div className="w-[280px] h-full bg-[#0f172a] text-white ">
          <div className="h-[100px] bg-white"> </div>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding className="m-auto !w-[94%]">
                <ListItemButton className=" hover:!bg-[#404552] !rounded-md ">
                  <ListItemText primary={text} className=" font-semibold" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="flex-1">
          <div className="h-16 bg-white px-5">
            <div className="flex gap-1 justify-end items-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 32 32"
                id="notification"
                width={30}
              >
                <path d="M26.59 21.17a2 2 0 0 1-.59-1.41V14a10 10 0 0 0-7.64-9.71 2.47 2.47 0 0 0 .14-.79 2.5 2.5 0 0 0-5 0 2.47 2.47 0 0 0 .14.79A10 10 0 0 0 6 14v5.76a2 2 0 0 1-.59 1.41A4.79 4.79 0 0 0 4 24.59V25a2 2 0 0 0 2 2h7.18a3 3 0 0 0-.18 1 3 3 0 0 0 6 0 3 3 0 0 0-.18-1H26a2 2 0 0 0 2-2v-.41a4.79 4.79 0 0 0-1.41-3.42ZM15.5 3.5a.5.5 0 1 1 .5.5.5.5 0 0 1-.5-.5Z"></path>
              </svg>

              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 36, height: 36 }}>M</Avatar>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {/* user */}
      {/* <div className=" h-[70px] sticky top-0 bg-[#313a46]">
        <div className="w-[1289px] m-auto flex justify-end h-full">
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            className="!bg-[#3c4655] flex gap-2"
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <div>
              <p>Tài khoản</p>
              <p>Đăng nhập</p>
            </div>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Popover>
        </div>
      </div> */}
      <div className="flex-1 overflow-scroll">
        {/* <div className="bg-white h-14 drop-shadow-md ">
          <div className="w-[1289px] m-auto">
            <ul className="flex h-full hover:cursor-pointer">
              <li
                className="px-3 py-4  hover:bg-slate-300"
                style={{ paddingTop: "auto", paddingBottom: "auto" }}
              >
                Cuộc thi
              </li>
              <li className="px-3 py-4  hover:bg-slate-300">Bài kiểm tra</li>
              <li className="px-3 py-4  hover:bg-slate-300">Bảng xếp hạng</li>
            </ul>
          </div>
        </div> */}
        <div className="w-[1289px] m-auto  h-[1000px]  py-5">
          {/* đăng nhập */}
          {/* <div className="my-[80px] flex rounded-[20px] overflow-hidden">
            <div className="bg-[#ffca18] flex-1 min-h-[520px]"></div>
            <div className="min-w-[400px] min-h-[520px] border m-auto px-6 py-8 bg-white">
              <div className="flex flex-col  gap-5 items-stretch">
                <div className="flex flex-col items-center">
                  <p className="font-medium text-2xl mb-3">Welcome to VV</p>
                  <p className="font-medium text-zinc-500 text-base">
                    Log in Your Account
                  </p>
                </div>

                <TextField
                  label="Email"
                  id="outlined-size-small"
                  size="small"
                  variant="standard"
                  className="bg-white"
                />

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormControl
                    variant="standard"
                    size="small"
                    className="!bg-white pl-1"
                  >
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="eye-off"
                                width="18"
                                height="18"
                              >
                                <g data-name="Layer 2">
                                  <g data-name="eye-off">
                                    <rect
                                      width="24"
                                      height="24"
                                      opacity="0"
                                    ></rect>
                                    <path d="M4.71 3.29a1 1 0 0 0-1.42 1.42l5.63 5.63a3.5 3.5 0 0 0 4.74 4.74l5.63 5.63a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM12 13.5a1.5 1.5 0 0 1-1.5-1.5v-.07l1.56 1.56z"></path>
                                    <path d="M12.22 17c-4.3.1-7.12-3.59-8-5a13.7 13.7 0 0 1 2.24-2.72L5 7.87a15.89 15.89 0 0 0-2.87 3.63 1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.48 9.48 0 0 0 3.23-.67l-1.58-1.58a7.74 7.74 0 0 1-1.7.25zM21.87 11.5c-.64-1.11-4.17-6.68-10.14-6.5a9.48 9.48 0 0 0-3.23.67l1.58 1.58a7.74 7.74 0 0 1 1.7-.25c4.29-.11 7.11 3.59 8 5a13.7 13.7 0 0 1-2.29 2.72L19 16.13a15.89 15.89 0 0 0 2.91-3.63 1 1 0 0 0-.04-1z"></path>
                                  </g>
                                </g>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="eye"
                                width="18"
                                height="18"
                              >
                                <g data-name="Layer 2">
                                  <g data-name="eye">
                                    <rect
                                      width="24"
                                      height="24"
                                      opacity="0"
                                    ></rect>
                                    <path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"></path>
                                    <path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"></path>
                                  </g>
                                </g>
                              </svg>
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Checkbox {...label} size="small" />
                    <p className="ml-[2px] text-xs">Remember me</p>
                  </div>
                  <p
                    className=" text-xs hover:underline cursor-pointer"
                    onClick={handleOpen}
                  >
                    Forgot password?
                  </p>
                </div>

                <Button
                  variant="contained"
                  className="w-[200px] self-center !bg-[#ffca18] hover:bg-[#5d85d4]"
                >
                  Sign in
                </Button>
              </div>
            </div>
            <Modal
              open={open}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={style}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                className="rounded-md flex flex-col justify-center items-stretch gap-5"
              >
                <div className="border-2 border-amber-400 rounded-full self-center w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    id="mail"
                    width={35}
                  >
                    <path
                      fill="#231f20"
                      d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
                    ></path>
                    <path
                      fill="#231f20"
                      d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
                    ></path>
                  </svg>
                </div>
                <p className="text-sm">
                  Enter the email address associated with your account, we will
                  send a verification code to your email
                </p>
                <input
                  className="border focus-visible:outline-none h-12 px-4 rounded-md"
                  placeholder="exam@gmail.com"
                />
                <Button
                  variant="contained"
                  className="!bg-[#ffca18] !font-medium"
                >
                  Send code
                </Button>
              </Box>
            </Modal>
          </div> */}
          {/* xếp hạng */}
          {/* <div>
            <p className="font-semibold text-xl">Cuộc thi</p>
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
                <p className="text-sm opacity-50">36 người tham gia</p>
              </div>
              <div className="flex gap-6 mt-4">
                <div>
                  <p>{cuocThi.time}</p>
                  <p className="text-sm opacity-50">Ngày bắt đầu</p>
                </div>
                <div>
                  {cuocThi.status === 0 && <p>Sắp diễn ra</p>}
                  {cuocThi.status === 1 && <p>Đang diễn ra</p>}
                  {cuocThi.status === 2 && <p>Kết thúc</p>}
                  <p className="text-sm opacity-50">Trạng thái</p>
                </div>
              </div>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Thứ hạng</StyledTableCell>
                  <StyledTableCell align="right">Mã sinh viên</StyledTableCell>
                  <StyledTableCell align="right">Họ tên</StyledTableCell>
                  <StyledTableCell align="right">Điểm</StyledTableCell>

                  <StyledTableCell align="right">
                    Protein&nbsp;(g)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          {/* base ex */}
          {/* <div className="bg-white w-[594px] h-[380px] p-6 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold mb-3">{cuocThi.name}</p>
                {cuocThi.status === 0 && (
                  <Chip
                    label="Sắp diễn ra"
                    className="!bg-[#ddf3f9] !text-[#38c0e6] !font-medium"
                  />
                )}
                {cuocThi.status === 1 && (
                  <Chip
                    label="Đang diễn ra"
                    className="!bg-[#ddf7ed] !text-[#28f2a5] !font-medium"
                  />
                )}
                {cuocThi.status === 2 && (
                  <Chip
                    label="Kết thúc"
                    className="!bg-[#f6b2a6] !text-[#f54323] !font-medium"
                  />
                )}
              </div>
              {cuocThi.status === 0 && (
                <Button className="!bg-[#44badc] !text-white">Đăng ký</Button>
              )}
              {cuocThi.status === 2 && (
                <Button className="!bg-[#ec4848] !text-white">Kết quả</Button>
              )}
            </div>

            <p className="text-gray-500 flex gap-1 items-center hover:underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="List"
                width={24}
              >
                <g
                  data-name="Layer 2"
                  fill="#a4a7a8"
                  className="color000000 svgShape"
                >
                  <g
                    data-name="list"
                    fill="#a4a7a8"
                    className="color000000 svgShape"
                  >
                    <circle
                      cx="4"
                      cy="7"
                      r="1"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></circle>
                    <circle
                      cx="4"
                      cy="12"
                      r="1"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></circle>
                    <circle
                      cx="4"
                      cy="17"
                      r="1"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></circle>
                    <rect
                      width="14"
                      height="2"
                      x="7"
                      y="11"
                      rx=".94"
                      ry=".94"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></rect>
                    <rect
                      width="14"
                      height="2"
                      x="7"
                      y="16"
                      rx=".94"
                      ry=".94"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></rect>
                    <rect
                      width="14"
                      height="2"
                      x="7"
                      y="6"
                      rx=".94"
                      ry=".94"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></rect>
                  </g>
                </g>
              </svg>
              <span>36 Người tham gia</span>
            </p>
            <p className="text-xs uppercase font-medium ">Thời gian</p>
            <p>{cuocThi.time}</p>
            <p>{cuocThi.address}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
