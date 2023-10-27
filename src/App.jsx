import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import Table from "./components/Table/Table";

const cuocThi = {
  name: "Lập trình web",
  status: 2,
  time: "20-10-2021",
  address: "B201",
};

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <LoginPage />,
  //   },
  // ]);

  //admin
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    /* admin */

    <div className="flex flex-col overflow-hidden h-screen bg-slate-100">
      <div className="flex h-full">
        <div className="w-[280px] h-full bg-[#0f172a] text-white">
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
          <div className="h-16 bg-white px-5 border  shadow-sm">
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
              <Button>ha</Button>
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
          <Table />
        </div>
      </div>
    </div>
  );
}

export default App;
