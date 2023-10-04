import { Avatar, Button, Menu, MenuItem, Popover } from "@mui/material";
import { useState } from "react";

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
            <ul className="flex h-full">
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
        <div className="w-[1289px] m-auto  h-[1000px]"></div>
      </div>
    </div>
  );
}

export default App;
