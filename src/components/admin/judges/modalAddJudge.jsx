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
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createJudges } from "../../../services/judgeService";
import { getEmployees } from "../../../services/employeeService";

const ModalAddJudge = ({ open, setOpen, setJudges, roundId }) => {
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const createJudgesMutation = useMutation({
    mutationFn: (data) => createJudges(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["judges", roundId]);

      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onSubmit = (data) => {
    const judges = {
      roundId: roundId,
      employeeIds: data.employeeIds,
    };
    console.log(judges);
    createJudgesMutation.mutate(judges);
    setOpen(false);
    reset();
    // handleClose();
  };

  const { data: teachers } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          reset();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-white w-[400px] min-h-[250px]  rounded-2xl ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col p-4 gap-6"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="font-bold "
            >
              Add Judges
            </Typography>

            <FormControl>
              <InputLabel id="demo-mutiple-name-label">Judges</InputLabel>
              <Controller
                name="employeeIds"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select label="Select Items" multiple {...field}>
                    {teachers?.data?.data.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

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
    </div>
  );
};

export default ModalAddJudge;
