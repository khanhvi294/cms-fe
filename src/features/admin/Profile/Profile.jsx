import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileUpdate from "../../../components/Profile/Profile/Profile";
import { setUser } from "../../../redux/slices/userSlice";
import { updateInfoEmployee } from "../../../services/employeeService";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ChangePassword from "../../../components/Profile/ChangePassword/ChangePassword";

// import { uploadImg } from "../../../../utils/firebaseFns";

const Profile = () => {
  const user = useSelector((state) => state.user.data.info);

  const dispatch = useDispatch();

  const updateProfileMutation = useMutation({
    mutationFn: updateInfoEmployee,
    onSuccess: (data) => {
      console.log(data);
      dispatch(setUser(data.data));

      toast.success("Update profile successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%" }} className="bg-white">
        <Box className="h-8 border-b rounded-md">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="bg-[#e7e5e5] !normal-case"
            sx={{
              ".Mui-selected": {
                color: `black !important`,
              },
            }}
          >
            <Tab className=" !normal-case" label="Profile" {...a11yProps(0)} />
            <Tab className=" !normal-case" label="Password" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>
          <ProfileUpdate
            user={user?.accountEmployee}
            updateInfo={updateProfileMutation}
            role={user?.role}
          />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChangePassword />
      </CustomTabPanel>
    </>
  );
};

export default Profile;
