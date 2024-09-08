import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ForgotPasswordForm } from "../auth/ForgotPasswordForm";
import Input from "@mui/material/Input";
import { LoginSvg } from "../../components/icons";
import { ROLES } from "../../configs/role";
import { appRoutes } from "../../routes/appRouter";
import { login } from "../../services/authService";
import { setAccessToken } from "../../redux/slices/userSlice";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123123");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const roleUser = useSelector((state) => state.user?.data?.info?.role);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleRedirect = () => {
    if (roleUser === ROLES.STUDENT) {
      navigate("/");
    } else if (roleUser === ROLES.EMPLOYEE) {
      navigate(appRoutes.ADASHBOARD);
    } else if (roleUser === ROLES.TEACHER) {
      navigate(appRoutes.TROUND);
    }
  };

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      if (!data.data.token) return;
      console.log(data.data.token);
      dispatch(setAccessToken(data.data.token));

      // handleRedirect();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  useEffect(() => {
    handleRedirect();
  }, [roleUser]);
  const handleLogin = (account) => {
    loginMutation.mutate(account);
  };
  return (
    <div className="my-[80px] flex rounded-[20px] overflow-hidden shadow-md">
      <div className="bg-[#ffca18] flex-1 min-h-[520px]">
        <LoginSvg />
      </div>
      <div className="min-w-[400px] min-h-[520px] border m-auto px-6 py-8 bg-white">
        <div className="flex flex-col  gap-5 items-stretch">
          <div className="flex flex-col items-center">
            <p className="font-medium text-2xl mb-3">
              Welcome to <p className="text-[#ffca18]">CODEGYM</p>
            </p>
            <p className="font-medium text-zinc-500 text-base">
              Log in Your Account
            </p>
          </div>

          <TextField
            label="Email"
            id="outlined-size-small"
            size="small"
            variant="standard"
            className="bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* <div className="grid w-full max-w-sm items-center gap-1.5"> */}
          <FormControl
            variant="standard"
            size="small"
            className="!bg-white pl-1"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="eye-off"
                        width="18"
                        height="18"
                      >
                        <g data-name="Layer 2">
                          <g data-name="eye-off">
                            <rect width="24" height="24" opacity="0"></rect>
                            <path d="M4.71 3.29a1 1 0 0 0-1.42 1.42l5.63 5.63a3.5 3.5 0 0 0 4.74 4.74l5.63 5.63a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM12 13.5a1.5 1.5 0 0 1-1.5-1.5v-.07l1.56 1.56z"></path>
                            <path d="M12.22 17c-4.3.1-7.12-3.59-8-5a13.7 13.7 0 0 1 2.24-2.72L5 7.87a15.89 15.89 0 0 0-2.87 3.63 1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.48 9.48 0 0 0 3.23-.67l-1.58-1.58a7.74 7.74 0 0 1-1.7.25zM21.87 11.5c-.64-1.11-4.17-6.68-10.14-6.5a9.48 9.48 0 0 0-3.23.67l1.58 1.58a7.74 7.74 0 0 1 1.7-.25c4.29-.11 7.11 3.59 8 5a13.7 13.7 0 0 1-2.29 2.72L19 16.13a15.89 15.89 0 0 0 2.91-3.63 1 1 0 0 0-.04-1z"></path>
                          </g>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="eye"
                        width="18"
                        height="18"
                      >
                        <g data-name="Layer 2">
                          <g data-name="eye">
                            <rect width="24" height="24" opacity="0"></rect>
                            <path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"></path>
                            <path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"></path>
                          </g>
                        </g>
                      </svg>
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {/* </div> */}
          <div className="flex justify-between items-center">
            {/* <div className="flex items-center">
              <Checkbox {...label} size="small" />
              <p className="ml-[2px] text-xs">Remember me</p>
            </div> */}
            <p
              className=" text-xs hover:underline cursor-pointer"
              onClick={handleOpen}
            >
              Forgot password?
            </p>
          </div>

          <Button
            variant="contained"
            className="w-[200px] self-center !bg-[#ffca18] hover:bg-[#5d85d4]"
            onClick={() => {
              handleLogin({ email: email, password: password });
            }}
          >
            Sign in
          </Button>

          <p className="text-sm italic">
            Because it hasn’t been used for a long time, the server
            automatically shuts down to save resources. Restarting will take
            some time
          </p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ForgotPasswordForm onSuccess={handleClose} />
      </Modal>
    </div>
  );
};

export default Login;
