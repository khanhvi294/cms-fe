import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getScoreByRoundResult } from "../../services/scoreService";

const ModalSeeScore = ({ open, setOpen, roundResult }) => {
  const [score, setScore] = useState(null);
  useQuery({
    queryKey: ["scoresR", roundResult?.id],
    enabled: !!roundResult?.id,
    queryFn: () => getScoreByRoundResult(roundResult?.id),
    onSuccess: (data) => {
      console.log("voo", data.data);
      setScore(data.data.data);
    },
  });

  const rows = score?.map((entry) => {
    const employeeId = entry.scoreJudge.employeeId;
    const employeeName = entry.scoreJudge.employeeJudge.fullName;
    const score = entry.score;

    return (
      <tr key={employeeId} className="border-b hover:bg-gray-100">
        <td className="py-2 text-center">{employeeId}</td>
        <td className="py-2 text-center">{employeeName}</td>
        <td className="py-2 text-center">{score}</td>
      </tr>
    );
  });
  return (
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
          className="font-bold "
        >
          Score detail
        </Typography>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 text-center">Judge ID</th>
              <th className="py-2 text-center">Judge Name</th>
              <th className="py-2 text-center">Score</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </Box>
    </Modal>
  );
};

export default ModalSeeScore;
