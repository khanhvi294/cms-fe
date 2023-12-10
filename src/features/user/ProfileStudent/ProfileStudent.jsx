import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setUser } from "../../../redux/slices/userSlice";
import ProfileUpdate from "../../../components/Profile/Profile/Profile";
import { updateProfileStudent } from "../../../services/studentService";
import { useForm } from "react-hook-form";

const ProfileStudent = () => {
  const user = useSelector((state) => state.user.data.info.accountStudent);

  const { reset } = useForm();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation({
    mutationFn: updateProfileStudent,
    onSuccess: (data) => {
      dispatch(setUser(data.data));
      queryClient.invalidateQueries(["user"]);
      toast.success("Update profile successfully");
    },
    onError: (err) => {
      reset();
      toast.error(err.message);
    },
  });
  console.log(user);
  return (
    <div>
      <ProfileUpdate user={user} updateInfo={updateProfileMutation} />
    </div>
  );
};

export default ProfileStudent;
