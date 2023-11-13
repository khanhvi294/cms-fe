import { Avatar, Button, Menu, MenuItem, Popover } from "@mui/material";
import { useState } from "react";

const Header = () => {
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
    <div className=" h-[70px] sticky top-0 bg-[#000]">
      <div className="w-[1289px] m-auto flex justify-end h-full">
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          className="!bg-[#393938] flex gap-2"
        >
          <Avatar alt="Hemy Sharp" src="/static/images/avatar/1.jpg" />
          <div>
            <p className="!normal-case">Thúy Hạnh</p>
            <p className="!uppercase !text-xs">Student</p>
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
  );
};

export default Header;
