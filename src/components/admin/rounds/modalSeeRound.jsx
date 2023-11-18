import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getRoundByCompetition } from "../../../services/roundService";
const ModalSeeRound = ({ competition }) => {
  const [open, setOpen] = useState(false);
  const [rounds, setRounds] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useQuery({
    queryKey: ["rounds", competition?.id],
    queryFn: (competitionId) => getRoundByCompetition(competitionId),
    onSuccess: (data) => {
      console.log(data.data.data);
      setRounds(data.data.data);
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl flex flex-col p-4 gap-5 ">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="font-bold self-center"
          >
            Round
          </Typography>
          {rounds.map((round, index) => (
            <div
              key={index}
              className="flex flex-col !justify-center !items-center gap-4"
            >
              <div className="flex justify-between w-full">
                <p className="font-bold">Id</p>
                <p>{round.id}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">Competition</p>
                <p>{round.competitionId}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold">Exam Form</p>
                <p>{round.examFormId}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold">Round</p>
                <p>{round.roundNumber}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold">Time Start</p>
                <p>{round.timeStart}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold">Number max</p>
                <p>{round.maximumQuantity}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold">Exam</p>
                <p>{round.exam}</p>
              </div>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalSeeRound;
