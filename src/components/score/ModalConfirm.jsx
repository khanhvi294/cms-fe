import { Box, Modal } from "@mui/material";

const ModalConfirmStudent = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl "></Box>
    </Modal>
  );
};

export default ModalConfirmStudent;
