import { Avatar, Button, Menu, MenuItem, Popover } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slices/userSlice";
import { appRoutes } from "../../../routes/appRouter";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector(
    (state) => state.user?.data?.info?.accountEmployee?.fullName
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate(appRoutes.LOGIN);
    dispatch(logout());
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
          {/* <Avatar alt="Hemy Sharp" src="/static/images/avatar/1.jpg" /> */}
          <div>
            <p className="!normal-case">{userName}</p>
            <p className="!uppercase !text-xs">
              {userName ? "Teacher" : "log in"}
            </p>
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
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(appRoutes.TROUND);
              }}
            >
              Round
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/teacher/profile");
                handleClose();
              }}
            >
              My account
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
