import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";

import { STATUS_COMPETITION } from "../../../configs/competitionStatus";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { updateStatusCompetition } from "../../../services/competitionService";

const ModalChangeStatus = ({ open, setOpen, status, competitionId }) => {
  const statuses = [
    { value: STATUS_COMPETITION.CREATED, label: "Upcoming" },
    { value: STATUS_COMPETITION.STARTED, label: "In progress" },
    { value: STATUS_COMPETITION.ENDED, label: "Completed" },
    { value: STATUS_COMPETITION.CANCEL, label: "Canceled" },
  ];
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const updateStatusCompetitionMutation = useMutation({
    mutationFn: (data) => updateStatusCompetition(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["competitions"]);
      // queryClient.invalidateQueries(["studentsAdd", classId]);

      toast.success("update successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
      queryClient.invalidateQueries(["competitions"]);

    },
  });

  const onSubmit = (data) => {
    // const judges = {
    //   classId: classId,
    //   studentIds: data.employeeIds,
    // };

    updateStatusCompetitionMutation.mutate({
      statusId: data.statusId,
      id: competitionId,
    });
    setOpen(false);
    // setOpen(false);
    // reset();
    // handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <Box className="bg-white w-[400px] min-h-[250px]  rounded-2xl flex flex-col p-4 gap-5 ">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="font-bold self-center"
        >
          Change Status
        </Typography>
        <div className="flex flex-col !justify-center !items-center gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col h-full p-4 gap-8 w-[250px]"
          >
            <FormControl>
              <InputLabel id="demo-mutiple-name-label">Students</InputLabel>
              <Controller
                name="statusId"
                rules={{ required: "Please select at least one students." }}
                control={control}
                defaultValue={status}
                render={({ field }) => (
                  <>
                    <Select label="Select Items" {...field}>
                      {statuses?.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.employeeIds && (
                      <Typography variant="caption" color="error">
                        {errors.employeeIds.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </FormControl>
            {/* <FormControl>
              <InputLabel id="demo-mutiple-name-label">Status</InputLabel>
              <Controller
                name="statusId"
                control={control}
                defaultValue={status}
                render={({ field }) => (
                  <>
                    <Select
                      label="Select Items"
                      className="w-[200px]"
                      {...field}
                    >
                      {statuses?.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl> */}
            <Button
              variant="contained"
              className="self-end !normal-case !rounded-lg !bg-black mt-30"
              type="submit"
            >
              Save
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalChangeStatus;
