import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
