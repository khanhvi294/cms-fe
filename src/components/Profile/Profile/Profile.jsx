import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImg } from "../../../utils/cloundinaryFns";
import PhotoUpload from "../PhotoUpload";
import { ROLES } from "../../../configs/role";

const ProfileUpdate = ({ user, updateInfo, role }) => {
  const today = new Date();
  const [edit, setEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
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

    updateInfo.mutate(data);
    setEdit(false);
    reset();
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };
  console.log("hhh", user);
  return (
    <div>
      {console.log(user?.cccd)}
      <span className="text-2xl font-semibold">Profile</span>
      <div className="flex gap-2 mt-4 justify-end items-center">
        <Switch
          className="relative h-6 w-12"
          checked={edit}
          {...label}
          defaultValue={false}
          onChange={(e) => {
            setEdit(e.target.checked);
          }}
        />

        <span className="font-normal"> Edit</span>
      </div>
      <div className="flex gap-9 mt-10">
        <Box className="container flex h-[383px] w-[300px]   flex-col justify-around items-center rounded-2xl border bg-white p-8 shadow-xl">
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
              <div className=" min-w-min justify-between py-3.5">
                <div>
                  <div className="flex items-center justify-center">
                    <PhotoUpload onUpload={setUploadData}>
                      <Avatar
                        sx={{ width: 150, height: 150 }}
                        src={upLoadData?.previewImg}
                      />
                    </PhotoUpload>
                  </div>
                  {/* <p className="text-xl">{user?.fullName}</p> */}
                </div>
                <div className="px-2.5 ">
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
                </div>
              </div>
            </div>
          </div>
        </Box>
        <form
          className="flex flex-col justify-around rounded-2xl border bg-white p-8 shadow-xl w-[900px] gap-6"
          onSubmit={handleSubmit(handleSave)}
        >
          <div className="flex gap-5">
            {edit ? (
              <TextField
                id="outlined-basic"
                size="small"
                label="FullName*"
                variant="outlined"
                defaultValue={user?.fullName}
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ``}
                className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
                {...register("fullName", {
                  required: "FullName is required filed",
                })}
              />
            ) : (
              <TextField
                id="outlined-basic"
                size="small"
                label="FullName*"
                variant="outlined"
                value={user?.fullName}
                disabled={!edit}
                className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
              />
            )}
            {edit ? (
              <TextField
                id="outlined-basic"
                size="small"
                label="Phone"
                variant="outlined"
                className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
                type="number"
                defaultValue={user?.phone}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ``}
                {...register("phone", {
                  minLength: {
                    value: 10,
                    message: "Phone must be exactly 10 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone must be exactly 10 characters",
                  },
                })}
              />
            ) : (
              <TextField
                id="outlined-basic"
                size="small"
                label="Phone"
                variant="outlined"
                className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
                type="number"
                disabled={!edit}
                value={user?.phone}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ``}
              />
            )}
          </div>

          <div className="flex gap-5">
            {edit ? (
              <TextField
                id="outlined-basic"
                size="small"
                label="address"
                variant="outlined"
                className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
                defaultValue={user?.address}
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ``}
                {...register("address")}
              />
            ) : (
              <TextField
                id="outlined-basic"
                size="small"
                disabled={!edit}
                label="address"
                variant="outlined"
                className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
                value={user?.address}
              />
            )}
            {role !== ROLES.STUDENT && (
              <>
                {edit ? (
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="CCCD*"
                    type="number"
                    defaultValue={user?.cccd}
                    variant="outlined"
                    className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
                    error={!!errors.cccd}
                    helperText={errors.cccd ? errors.cccd.message : ``}
                    {...register("cccd", {
                      required: "CCCD is required filed",
                      minLength: {
                        value: 12,
                        message: "CCCD must be exactly 12 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "CCCD must be exactly 12 characters",
                      },
                    })}
                  />
                ) : (
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="CCCD*"
                    type="number"
                    disabled={!edit}
                    value={user?.cccd}
                    variant="outlined"
                    className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
                  />
                )}
              </>
            )}
          </div>
          <div className="flex gap-5">
            {edit ? (
              <TextField
                error={!!errors.dateOfBirth}
                helperText={
                  errors.dateOfBirth ? errors.dateOfBirth.message : ``
                }
                size="small"
                label="DOB"
                type="date"
                defaultValue={user?.dateOfBirth}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: format(today, "yyyy-MM-dd"), // Set your desired maximum date
                }}
                // defaultValue={
                //   classEdit ? classEdit.timeStart : formattedTomorrow
                // }
                className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
                {...register("dateOfBirth", {
                  required: "Date of birth is require",
                })}
              />
            ) : (
              <TextField
                size="small"
                label="DOB"
                type="date"
                disabled={!edit}
                value={user?.dateOfBirth}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: format(today, "yyyy-MM-dd"), // Set your desired maximum date
                }}
                // defaultValue={
                //   classEdit ? classEdit.timeStart : formattedTomorrow
                // }
                className={`${!edit ? "bg-[#e9ecef]" : ""} w-full`}
              />
            )}
          </div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={!!user?.gender}
              name="radio-buttons-group"
              row
            >
              {edit ? (
                <FormControlLabel
                  {...register("gender")}
                  value={false}
                  control={<Radio />}
                  label="Female"
                />
              ) : (
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Female"
                  disabled={!edit}
                />
              )}

              {edit ? (
                <FormControlLabel
                  {...register("gender")}
                  value={true}
                  control={<Radio />}
                  label="Male"
                />
              ) : (
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Male"
                  disabled={!edit}
                />
              )}
            </RadioGroup>
          </FormControl>
          <div className="flex justify-end gap-3">
            {edit && (
              <Button
                type="submit"
                variant="contained"
                className="btn ml-3 rounded-full normal-case !bg-black"
                size="medium"
                disableElevation
              >
                Save
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
