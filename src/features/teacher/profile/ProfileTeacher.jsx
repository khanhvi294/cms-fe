import { useSelector } from "react-redux";
import ProfileUpdate from "../../../components/Profile/Profile/Profile";
import { useMutation } from "react-query";
import { updateInfoEmployee } from "../../../services/employeeService";
import { toast } from "react-toastify";

const ProfileTeacher = () => {
  const user = useSelector((state) => state.user.data.info.accountEmployee);
  const updateProfileMutation = useMutation({
    mutationFn: updateInfoEmployee,
    onSuccess: (data) => {
      console.log(data.data.data);
      // dispatch(setUser(data.data.data));

      toast.success("Update profile successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <div>
      <ProfileUpdate user={user} updateInfo={updateProfileMutation} />
    </div>
  );
};

export default ProfileTeacher;
