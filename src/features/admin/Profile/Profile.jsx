import React from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { updateEmployee } from "../../../services/employeeService";
import { setUser } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import PhotoUpload from "../../../components/Profile/PhotoUpload";
import { uploadImg } from "../../../utils/cloundinaryFns";

// import { uploadImg } from "../../../../utils/firebaseFns";

const BIO_MAX_LENGTH = 160;
const Profile = () => {
  const user = useSelector((state) => state.user.data.info);
  const dispatch = useDispatch();
  const updateProfileMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: (data) => {
      dispatch(setUser(data.data.data));

      toast.success("Update profile successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [upLoadData, setUploadData] = useState({
    previewImg: user?.avatar,
    file: null,
  });

  const handleSave = async (data) => {
    if (upLoadData.file) {
      try {
        const url = await uploadImg(upLoadData.file);
        data.avatar = url;
      } catch (error) {
        console.log(error);
      }
    } else data.avatar = user.avatar;

    //onSubmit(data);
  };

  return (
    <Box className="container absolute inset-1/2 flex h-[500px] w-[554px] min-w-fit  translate-x-[-50%] translate-y-[-50%] flex-col justify-around rounded border-none bg-white p-8 shadow-xl">
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        className="mb-5 font-bold"
      >
        Profile information
      </Typography>
      <div>
        <div>
          <label className="text-[13px] text-slate-500">Photo</label>
          <div className="flex min-w-min justify-between py-3.5">
            <div>
              <div className="flex items-center justify-center">
                <PhotoUpload onUpload={setUploadData}>
                  <Avatar
                    sx={{ width: 70, height: 70 }}
                    src={upLoadData?.previewImg}
                  />
                </PhotoUpload>
              </div>
            </div>
            <div className="px-2.5">
              <Button
                variant="text"
                component="label"
                className="min-w-min px-0 text-xs font-normal text-lime-600 hover:bg-white"
              >
                <p>Upload</p>
                {/* <PhotoUpload onUpload={setUploadData}></PhotoUpload> */}
              </Button>

              <Button
                variant="text"
                component="label"
                className="ml-3 min-w-min px-0 text-xs font-normal text-red-600 hover:bg-white"
                onClick={() => setUploadData("")}
              >
                Remove
              </Button>
              <Typography className="= text-xs text-gray-400">
                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
                side.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <TextField
        error={!!errors?.username}
        label="Name*"
        variant="standard"
        defaultValue={user.username}
        helperText={errors?.username?.message}
        {...register("username", {
          required: "user name is required filed",
          maxLength: 60,
        })}
      />

      <TextField
        id="standard-helperText"
        label="Bio"
        {...register("bio", {
          maxLength: BIO_MAX_LENGTH,
        })}
        defaultValue={user?.bio}
        variant="standard"
      />

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={user.gender}
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            {...register("gender")}
            value={true}
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            {...register("gender")}
            value={false}
            control={<Radio />}
            label="Male"
          />
        </RadioGroup>
      </FormControl>
      <div className="flex justify-end">
        <Button
          variant="outlined"
          className="btn rounded-full normal-case text-lime-600"
          color="success"
          size="medium"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="btn ml-3 rounded-full normal-case"
          size="medium"
          color="success"
          disableElevation
          onClick={handleSubmit(handleSave)}
        >
          Save
        </Button>
      </div>
    </Box>
  );
};

export default Profile;
