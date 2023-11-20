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
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { addStudents } from "../../../services/classService";
import { getStudents } from "../../../services/studentService";

const ModalAddStudents = ({ open, setOpen, setStudents, classId }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addStudentsMutation = useMutation({
    mutationFn: (data) => addStudents(data),
    onSuccess: (data) => {
      setStudents((state) => [data.data, ...state]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onSubmit = (data) => {
    const judges = {
      classId: classId,
      studentIds: data.employeeIds,
    };
    console.log(judges);
    addStudentsMutation.mutate(judges);
    setOpen(false);
    reset();
    // handleClose();
  };

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
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
            className=" flex flex-col h-full p-4 gap-6"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="font-bold "
            >
              Add Students
            </Typography>

            <FormControl>
              <InputLabel id="demo-mutiple-name-label">Students</InputLabel>
              <Controller
                name="employeeIds"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select label="Select Items" multiple {...field}>
                    {students?.data?.data.map((item) => (
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

export default ModalAddStudents;
