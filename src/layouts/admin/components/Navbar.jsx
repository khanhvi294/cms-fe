import { Button } from "@mui/material";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { pathname } = useLocation();

  const navbarItems = [
    {
      title: "Home",
      icon: <i className="fa-light fa-house"></i>,
      iconActive: <i className="fa-solid fa-house"></i>,
      path: "/admin/classes",
    },

    {
      title: "Bookmark",
      icon: <i className="fa-light fa-bookmark"></i>,
      iconActive: <i className="fa-solid fa-bookmark"></i>,
      path: "/classes",
    },
    // {
    //   title: "Stories",
    //   icon: <i className="fa-light fa-rectangle-history"></i>,
    //   iconActive: <i className="fa-solid fa-rectangle-history"></i>,
    //   path: appRoutes.STORIES,
    // },
    // {
    //   title: "write",
    //   icon: <i className="fa-light fa-file-pen"></i>,
    //   iconActive: <i className="fa-solid fa-file-pen"></i>,
    //   path: appRoutes.WRITE,
    // },
  ];
  return (
    <div className="w-[280px] h-full bg-[#000] text-white ">
      <div>
        <img src={logo} alt="logo" className="" />
      </div>
      <div className="flex w-full flex-col  text-center mt-1">
        {navbarItems.map((item) => {
          const isActive = matchPath(item.path, pathname);

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className="active text-white"
            >
              <Button
                className={`!text-white rounded-md hover:!bg-slate-500 w-[96%] ${
                  isActive ? "!bg-slate-500" : ""
                }`}
                size="medium"
              >
                {item.title}
              </Button>
            </NavLink>
          );
        })}
      </div>
      {/* <List>
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
          <ListItem key={index} disablePadding className="m-auto !w-[94%]">
            <ListItemButton className=" hover:!bg-[#404552] !rounded-md ">
              <ListItemText primary={text} className=" font-semibold" />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};

export default Navbar;
