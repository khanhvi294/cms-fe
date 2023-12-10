import { useSelector } from "react-redux";
import ProfileUpdate from "../../../components/Profile/Profile/Profile";
import { useMutation, useQueryClient } from "react-query";
import { updateInfoEmployee } from "../../../services/employeeService";
import { toast } from "react-toastify";

const ProfileTeacher = () => {
  const user = useSelector((state) => state.user.data.info);
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateInfoEmployee,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      //  console.log(data.data.data);
      // dispatch(setUser(data.data.data));

      toast.success("Update profile successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  console.log(user?.accountEmployee, user?.role);
  console.log(user);
  return (
    <div className="w-[80%] mx-auto mt-16">
      <ProfileUpdate
        user={user?.accountEmployee}
        updateInfo={updateProfileMutation}
        role={user.role}
      />
    </div>
  );
};

export default ProfileTeacher;
