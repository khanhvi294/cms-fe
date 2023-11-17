import { Box, Chip, Modal, Typography } from "@mui/material";

const ModalSeeRound = ({ round, open, handleClose }) => {
  return (
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
        <div className="flex flex-col !justify-center !items-center gap-4">
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
      </Box>
    </Modal>
  );
};

export default ModalSeeRound;
