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
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PhotoUpload from "../../../components/Profile/PhotoUpload";
import { setUser } from "../../../redux/slices/userSlice";
import {
  updateEmployee,
  updateInfoEmployee,
} from "../../../services/employeeService";
import { uploadImg } from "../../../utils/cloundinaryFns";
import { format } from "date-fns";
import ProfileUpdate from "../../../components/Profile/Profile/Profile";

// import { uploadImg } from "../../../../utils/firebaseFns";

const Profile = () => {
  const user = useSelector((state) => state.user.data.info.accountEmployee);
  const today = new Date();

  const dispatch = useDispatch();
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

    updateProfileMutation.mutate(data);
  };

  return (
    <div>
      <ProfileUpdate user={user} updateInfo={updateProfileMutation} />
    </div>
    // <div>
    //   <span className="text-2xl font-semibold">Profile</span>
    //   <div className="flex gap-9 mt-10">
    //     <Box className="container flex h-[383px] w-[300px]   flex-col justify-around items-center rounded-2xl border bg-white p-8 shadow-xl">
    //       <Typography
    //         id="modal-modal-title"
    //         variant="h6"
    //         component="h2"
    //         className="mb-5 font-bold"
    //       >
    //         Profile information
    //       </Typography>
    //       <div>
    //         <div>
    //           <label className="text-[13px] text-slate-500">Photo</label>
    //           <div className=" min-w-min justify-between py-3.5">
    //             <div>
    //               <div className="flex items-center justify-center">
    //                 <PhotoUpload onUpload={setUploadData}>
    //                   <Avatar
    //                     sx={{ width: 150, height: 150 }}
    //                     src={upLoadData?.previewImg}
    //                   />
    //                 </PhotoUpload>
    //               </div>
    //               {/* <p className="text-xl">{user?.fullName}</p> */}
    //             </div>
    //             <div className="px-2.5 ">
    //               <Button
    //                 variant="text"
    //                 component="label"
    //                 className="min-w-min px-0 text-xs font-normal text-lime-600 hover:bg-white"
    //               >
    //                 <p>Upload</p>
    //                 {/* <PhotoUpload onUpload={setUploadData}></PhotoUpload> */}
    //               </Button>

    //               <Button
    //                 variant="text"
    //                 component="label"
    //                 className="ml-3 min-w-min px-0 text-xs font-normal text-red-600 hover:bg-white"
    //                 onClick={() => setUploadData("")}
    //               >
    //                 Remove
    //               </Button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Box>
    //     <div className="flex flex-col justify-around rounded-2xl border bg-white p-8 shadow-xl w-[900px] gap-6">
    //       <div className="flex gap-5">
    //         <TextField
    //           id="outlined-basic"
    //           size="small"
    //           label="FullName*"
    //           variant="outlined"
    //           defaultValue={user?.fullName}
    //           error={!!errors.fullName}
    //           helperText={errors.fullName ? errors.fullName.message : ``}
    //           className="w-full"
    //           {...register("fullName", {
    //             required: "FullName is required filed",
    //           })}
    //         />{" "}
    //         <TextField
    //           id="outlined-basic"
    //           size="small"
    //           label="Phone"
    //           variant="outlined"
    //           className="w-full"
    //           type="number"
    //           defaultValue={user?.phone}
    //           error={!!errors.phone}
    //           helperText={errors.phone ? errors.phone.message : ``}
    //           {...register("phone", {
    //             minLength: {
    //               value: 10,
    //               message: "Phone must be exactly 10 characters",
    //             },
    //             maxLength: {
    //               value: 10,
    //               message: "Phone must be exactly 10 characters",
    //             },
    //           })}
    //         />
    //       </div>
    //       {/* <TextField
    //       id="outlined-basic"
    //       size="small"
    //       label="Email*"
    //       variant="outlined"
    //       className="w-full"
    //       defaultValue={user?.email}
    //       error={!!errors.email}
    //       helperText={errors.email ? errors.email.message : ``}
    //       {...register("email", { required: "email is required filed" })}
    //     /> */}
    //       <div className="flex gap-5">
    //         <TextField
    //           id="outlined-basic"
    //           size="small"
    //           label="address"
    //           variant="outlined"
    //           className="w-full"
    //           defaultValue={user?.address}
    //           error={!!errors.address}
    //           helperText={errors.address ? errors.address.message : ``}
    //           {...register("address")}
    //         />
    //         <TextField
    //           id="outlined-basic"
    //           size="small"
    //           label="CCCD*"
    //           type="number"
    //           defaultValue={user?.cccd}
    //           variant="outlined"
    //           className="w-full"
    //           error={!!errors.cccd}
    //           helperText={errors.cccd ? errors.cccd.message : ``}
    //           {...register("cccd", {
    //             required: "CCCD is required filed",
    //             minLength: {
    //               value: 12,
    //               message: "CCCD must be exactly 12 characters",
    //             },
    //             maxLength: {
    //               value: 12,
    //               message: "CCCD must be exactly 12 characters",
    //             },
    //           })}
    //         />
    //       </div>
    //       <div className="flex gap-5">
    //         <TextField
    //           error={!!errors.dateOfBirth}
    //           helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ``}
    //           size="small"
    //           label="DOB"
    //           type="date"
    //           defaultValue={user?.dateOfBirth}
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           inputProps={{
    //             max: format(today, "yyyy-MM-dd"), // Set your desired maximum date
    //           }}
    //           // defaultValue={
    //           //   classEdit ? classEdit.timeStart : formattedTomorrow
    //           // }
    //           className="w-full"
    //           {...register("dateOfBirth", {
    //             required: "Date of birth is require",
    //           })}
    //         />
    //       </div>
    //       <FormControl>
    //         <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
    //         <RadioGroup
    //           aria-labelledby="demo-radio-buttons-group-label"
    //           defaultValue={!!user?.gender}
    //           name="radio-buttons-group"
    //           row
    //         >
    //           <FormControlLabel
    //             {...register("gender")}
    //             value={false}
    //             control={<Radio />}
    //             label="Female"
    //           />
    //           <FormControlLabel
    //             {...register("gender")}
    //             value={true}
    //             control={<Radio />}
    //             label="Male"
    //           />
    //         </RadioGroup>
    //       </FormControl>
    //       <div className="flex justify-end gap-3">
    //         <Button
    //           variant="outlined"
    //           className="btn rounded-full normal-case "
    //           color="error"
    //           size="medium"
    //         >
    //           Cancel
    //         </Button>
    //         <Button
    //           type="submit"
    //           variant="contained"
    //           className="btn ml-3 rounded-full normal-case"
    //           size="medium"
    //           color="success"
    //           disableElevation
    //           onClick={handleSubmit(handleSave)}
    //         >
    //           Save
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Profile;
