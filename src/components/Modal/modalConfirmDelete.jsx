import { Box, Button, Modal, Typography } from "@mui/material";

const ModalConfirmDelete = ({ open, setOpen, deleteMutation, deleteId }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-white w-[400px] min-h-[200px] rounded-2xl p-4 flex flex-col gap-6">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="font-bold text-red-500"
          >
            Delete
          </Typography>
          <p>Are you sure to delete this</p>
          <div className="flex gap-2 self-end">
            <Button
              variant="outlined"
              className="self-end !normal-case !rounded-lg !bg-red"
              onClick={() => {
                deleteMutation.mutate(deleteId);
                setOpen(false);
              }}
              color="error"
              endIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Delete"
                  x="0"
                  y="0"
                  version="1.1"
                  viewBox="0 0 29 29"
                  xmlSpace="preserve"
                  width={15}
                >
                  <path
                    d="M19.795 27H9.205a2.99 2.99 0 0 1-2.985-2.702L4.505 7.099A.998.998 0 0 1 5.5 6h18a1 1 0 0 1 .995 1.099L22.78 24.297A2.991 2.991 0 0 1 19.795 27zM6.604 8 8.21 24.099a.998.998 0 0 0 .995.901h10.59a.998.998 0 0 0 .995-.901L22.396 8H6.604z"
                    fill="#d32f31"
                    className="color000000 svgShape"
                  ></path>
                  <path
                    d="M26 8H3a1 1 0 1 1 0-2h23a1 1 0 1 1 0 2zM14.5 23a1 1 0 0 1-1-1V11a1 1 0 1 1 2 0v11a1 1 0 0 1-1 1zM10.999 23a1 1 0 0 1-.995-.91l-1-11a1 1 0 0 1 .905-1.086 1.003 1.003 0 0 1 1.087.906l1 11a1 1 0 0 1-.997 1.09zM18.001 23a1 1 0 0 1-.997-1.09l1-11c.051-.55.531-.946 1.087-.906a1 1 0 0 1 .905 1.086l-1 11a1 1 0 0 1-.995.91z"
                    fill="#d32f31"
                    className="color000000 svgShape"
                  ></path>
                  <path
                    d="M19 8h-9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-8-2h7V4h-7v2z"
                    fill="#d32f31"
                    className="color000000 svgShape"
                  ></path>
                </svg>
              }
            >
              Delete
            </Button>
            <Button
              variant="contained"
              className="self-end !normal-case !rounded-lg !bg-black"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalConfirmDelete;
