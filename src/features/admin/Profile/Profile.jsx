import React from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileUpdate from "../../../components/Profile/Profile/Profile";
import { setUser } from "../../../redux/slices/userSlice";
import { updateInfoEmployee } from "../../../services/employeeService";

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

  return (
    <div>
      <ProfileUpdate
        user={user?.accountEmployee}
        updateInfo={updateProfileMutation}
        role={user?.role}
      />
    </div>
  );
};

export default Profile;
