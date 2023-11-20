import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { createRound } from "../../../services/roundService";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { getExamForms } from "../../../services/examFormService";

const ModalAddRound = ({
  openAddRound,
  handleCloseAddRound,
  competition,
  setRows,
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

  const createRoundMutation = useMutation({
    mutationFn: (data) => createRound(data),
    onSuccess: (data) => {
      setRows((state) => [data.data, ...state]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmitAddRound = (data) => {
    const round = data;
    round.competitionId = competition.id;
    round.roundNumber = 1;
    createRoundMutation.mutate(round);
    handleCloseAddRound();
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
          onSubmit={handleSubmit(onSubmitAddRound)}
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
              label="Time*"
              type="number"
              variant="outlined"
              error={!!errors.time}
              helperText={errors.time ? errors.time.message : ``}
              className="w-full"
              {...register("time", {
                required: "Time is required filed",
              })}
            />
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
