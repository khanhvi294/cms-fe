import { Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { changePassword } from "../../../services/authService";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const onSubmit = async (data) => {
    const { newPassword, reNewPassword } = data;
    if (newPassword === reNewPassword) {
      console.log(data);
      changePasswordMutation.mutate({
        password: data.password,
        newPassword: data.newPassword,
      });
    } else {
      setError("Password is not match!");
    }
    reset();
    //  setValuePass('password', '');
    //  setValuePass('expassword', '');
    //  setValuePass('repassword', '');
  };
  const changePasswordMutation = useMutation({
    mutationFn: (data) => changePassword(data),
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["judges", roundId]);
      // queryClient.invalidateQueries(["teachers", roundId]);

      toast.success("Change password successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <form className="mx-auto mb-5 rounded-md bg-white px-5">
      <h6 className="text-2xl font-semibold">Change password</h6>

      <div className="mx-auto mt-12 flex  flex-col sm:flex-row">
        <div className=" flex w-[400px] flex-col gap-5">
          <div>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="w-full"
              size="small"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="New Password"
              size="small"
              variant="outlined"
              className="w-full"
              {...register("newPassword", { required: true, minLength: 6 })}
              type="password"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="RePassword"
              size="small"
              variant="outlined"
              className="w-full"
              {...register("reNewPassword", { required: true, minLength: 6 })}
              type="password"
            />
          </div>
          {error && <Alert severity="error">{error}</Alert>}
          <div className="mt-3 sm:col-span-2">
            <Button
              variant="contained flex-end !bg-[#000] !text-white !rounded-md"
              type="submit"
              className="btn btn-primary bg-black text-white !self-end"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
