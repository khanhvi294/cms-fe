import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAllRoundByJudge } from "../../services/judgeService";

import { uploadImg } from "../../utils/cloundinaryFns";

const Demo = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const user = useSelector((state) => state.user?.data?.info);
  const [file, setFile] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const [rows, setRows] = useState([]);

  useQuery({
    queryKey: ["roundsJudge", user?.id],
    enabled: !!user?.id,
    queryFn: () => getAllRoundByJudge(user?.id),
    onSuccess: (data) => {
      console.log(data?.data);
      // setRows(data.data.data);
    },
  });
  const submit = async () => {
    console.log(file);
    await uploadImg(file);
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={submit}>lcickk</button>

      <Button onClick={handleOpen}>open</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-white w-[400px] min-h-[250px]  rounded-2xl ">
          {/* <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col p-4 gap-6"
          > */}

          {/* <Button
              variant="contained"
              className="self-end !normal-case !rounded-lg !bg-black"
              type="submit"
            >
              Save
            </Button> */}
          {/* </form> */}
        </Box>
      </Modal>
    </div>
  );
};

export default Demo;
