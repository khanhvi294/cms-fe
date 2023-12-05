import { Box, Button, Modal } from "@mui/material";

const ModalInputMarkPoint = ({ open, setOpen, setOpenConfirm }) => {
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
      <Box className="bg-white w-[400px] min-h-[300px]  rounded-2xl ">
        hdhdh
        <Button onClick={setOpenConfirm(true)}>hhhh</Button>
      </Box>
    </Modal>
  );
};

export default ModalInputMarkPoint;
