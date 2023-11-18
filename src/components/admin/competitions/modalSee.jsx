import { Box, Chip, Modal, Typography } from "@mui/material";
import ModalSeeRound from "../rounds/modalSeeRound";

const ModalSeeCompetition = ({ competition, open, handleClose }) => {
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
          Competition
        </Typography>
        <div className="flex flex-col !justify-center !items-center gap-4">
          <div className="flex justify-between w-full">
            <p className="font-bold">Id</p>
            <p>{competition.id}</p>
          </div>

          <div className="flex justify-between w-full">
            <p className="font-bold">Name</p>
            <p>{competition.name}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="font-bold">EmpoyeeId</p>
            <p>{competition.employeeId}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="font-bold">Number of prizes</p>
            <p>{competition.numOfPrizes}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="font-bold">Number min</p>
            <p>{competition.minimumQuantity}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="font-bold">Number max</p>
            <p>{competition.maximumQuantity}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="font-bold">Rounds</p>
            <p>{competition.numberOfRound}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="font-bold">Status</p>
            <Chip
              label="Active"
              color="success"
              variant="outlined"
              className="w-20 !h-7"
            />
          </div>

          <div className="flex justify-between w-full">
            <p className="font-bold">Time Start</p>
            <p>{competition.timeStart}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="font-bold">Time End</p>
            <p>{competition.timeEnd}</p>
          </div>
        </div>
        <ModalSeeRound competition={competition} />
      </Box>
    </Modal>
  );
};

export default ModalSeeCompetition;
