import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="w-[280px] h-full bg-[#000] text-white">
      <div>
        <img src={logo} alt="logo" className="" />
      </div>
      <List>
        {[
          "Home",
          "Competition",
          "Account",
          "Class",
          "Course",
          "Student",
          "Employee",
          "Register",
          "Rounds",
        ].map((text, index) => (
          <ListItem key={text} disablePadding className="m-auto !w-[94%]">
            <ListItemButton className=" hover:!bg-[#404552] !rounded-md ">
              <ListItemText primary={text} className=" font-semibold" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Navbar;
