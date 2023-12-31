import { Avatar, Button, Menu, MenuItem, Popover } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slices/userSlice";
import { appRoutes } from "../../../routes/appRouter";
import logo2 from "../../../assets/logo2.jpg";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector(
    (state) => state.user?.data?.info?.accountStudent?.fullName
  );
  const { isLogin } = useSelector((state) => state.user.data);

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

  if (!isLogin) {
    return (
      <div className=" h-[70px] sticky top-0 bg-[#000]">
        <div className="w-[1289px] m-auto flex justify-end items-center h-full">
          <Link to={appRoutes.LOGIN} className="">
            <p className="text-white text-lg">Login</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-[70px] sticky top-0 bg-[#000]">
      <div className="w-[1289px] m-auto flex justify-between h-full">
        <div className="w-14 mt-2 ml-2">
          <img src={logo2} alt="logo" className="" />
        </div>
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
              {userName ? "Student" : "log in"}
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
                navigate("/profile");
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
