import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { getExamForms } from "../../../services/examFormService";
import { uploadFile } from "../../../utils/cloundinaryFns";
import { useState } from "react";

const ModalAddRound = ({
  openAddRound,
  handleCloseAddRound,
  competition,
  addMutate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: examForms } = useQuery({
    queryKey: ["exams"],
    queryFn: getExamForms,
  });
  const [fileExam, setFileExam] = useState();

  const onSubmitAddRound = (data) => {
    const round = data;

    round.competitionId = competition.id;
    addMutate.mutate(round);
  };

  const handleSave = async (data) => {
    handleCloseAddRound();
    try {
      const url = await uploadFile(fileExam);
      data.exam = url;
    } catch (error) {
      console.log(error);
    }

    reset();
    onSubmitAddRound(data);
  };
  return (
    <Modal
      open={openAddRound}
      onClose={() => {
        handleCloseAddRound();
        reset();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl ">
        <form
          onSubmit={handleSubmit(handleSave)}
          className=" flex flex-col p-4 gap-5"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="font-bold "
          >
            Add Round
          </Typography>
          <div className="flex flex-col !justify-center !items-center gap-4">
            <TextField
              id="outlined-basic"
              size="small"
              label="Name*"
              variant="outlined"
              //defaultValue={examFormEdit?.name}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ``}
              className="w-full"
              {...register("name", {
                required: "Name is required filed",
              })}
            />
            <TextField
              id="outlined-basic"
              size="small"
              label="Time*"
              type="number"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">minute</InputAdornment>
                ),
              }}
              error={!!errors.time}
              helperText={errors.time ? errors.time.message : ``}
              className="w-full"
              {...register("time", {
                required: "Time is required filed",
              })}
            />
          </div>
          <div>
            <label
              className="block  text-sm mb-1 text-[#666666] "
              // for="default_size"
            >
              Exam*
            </label>
            <input
              className="block w-full h-10  pl-1 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white  focus:outline-none"
              {...register("exam", {
                required: "Exam is required filed",
              })}
              type="file"
              onChange={(e) => setFileExam(e.target.files[0])}
            />
            <p className="text-red-400 text-xs mt-1">
              {errors.exam ? errors.exam.message : ``}
            </p>
          </div>

          <FormControl className="w-full" size="small" error={!!errors.role}>
            <InputLabel id="demo-select-small-label">Exam Form*</InputLabel>

            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              // value={age}
              label="Role"
              // onChange={handleChange}
              defaultValue={examForms?.data?.data[0]?.id}
              size="small"
              {...register("examFormId", {
                required: "Exam Form is required filed",
              })}
            >
              {examForms?.data?.data.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {!!errors.examFormId && (
              <FormHelperText>{errors.examFormId.message}</FormHelperText>
            )}
          </FormControl>

          {/* <TextField
            id="outlined-min"
            label="Num Point"
            type="number"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("numPoint", {
              required: "Number point is required filed",
            })}
          /> */}

          <TextField
            error={!!errors.timeStart}
            helperText={errors.timeStart ? errors.timeStart.message : ``}
            size="small"
            label="Time Start"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            className="w-full"
            {...register("timeStart", {
              required: "Time start is required filed",
            })}
          />
          <Button
            variant="contained"
            className="self-end !normal-case !rounded-lg !bg-black"
            type="submit"
          >
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalAddRound;
