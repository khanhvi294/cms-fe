import { Avatar, Button, Chip, Menu, MenuItem, Popover } from "@mui/material";
import { useState } from "react";

const cuocThi = {
  name: "Lập trình web",
  status: 2,
  time: "20-10-2021",
  address: "B201",
};
function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <div className=" h-[70px] sticky top-0 bg-[#313a46]">
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
      </div>
      <div className="flex-1 overflow-scroll">
        <div className="bg-white h-14 drop-shadow-md ">
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
        </div>
        <div className="w-[1289px] m-auto  h-[1000px]  py-5">
          <div className="bg-white w-[594px] h-[380px] p-6 flex flex-col gap-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
