import { Box, Modal } from "@mui/material";
import { useState } from "react";

const ModalSeeScore = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl flex flex-col p-4 gap-5 "></Box>
    </Modal>
  );
};

export default ModalSeeScore;
