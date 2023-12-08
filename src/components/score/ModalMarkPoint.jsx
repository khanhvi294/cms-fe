import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getScoreByRoundResult } from "../../services/scoreService";
import { checkStudentPassRound } from "../../services/roundResultService";
import ModalConfirmStudent from "./ModalConfirm";

const ModalMarkPoint = ({ open, setOpen, roundId }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [score, setScore] = useState();
  const [studentConfirm, setStudentConfirm] = useState([]);
  const checkStudentPassMutation = useMutation({
    mutationFn: checkStudentPassRound,
    onSuccess: (data) => {
      console.log(data);
      setStudentConfirm(data.data);
      //  queryClient.invalidateQueries(["rounds", id]);
      //  toast.success("Delete successfully!");
    },
    onError: (err) => {
      //  toast.error(err.message);
    },
  });
  console.log(studentConfirm);
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl flex flex-col p-4 gap-5 ">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="!font-semibold "
          >
            Score detail
          </Typography>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            type="number"
            onChange={(e) => setScore(e.target.value)}
          />
          <Button
            onClick={() => {
              setOpenConfirm(true);
              // setOpen(false);
              checkStudentPassMutation.mutate({ roundId, markPoint: score });
            }}
          >
            Go to appoit
          </Button>
        </Box>
      </Modal>
      <ModalConfirmStudent
        open={openConfirm}
        setOpen={setOpenConfirm}
        studentConfirm={studentConfirm}
        roundId={roundId}
      />
    </>
  );
};

export default ModalMarkPoint;
