import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Certificate from "../../../components/Certificate/certificate";
import { useSelector } from "react-redux";
import { ROLES } from "../../../configs/role";

export const FinalResult = ({ competition, rounds }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const user = useSelector((state) => state.user.data.info);
  const topStudentsWithRank = useMemo(() => {
    if (!rounds) return [];
    const lastRound = rounds[rounds?.length - 1];
    const passedStudents = lastRound?.roundResultRound?.filter(
      (item) => item.score >= lastRound?.scorePoint
    );
    const sortedStudents = passedStudents?.sort((a, b) => b.score - a.score);
    if (!sortedStudents) return [];
    const result = [];
    let rank = 0;
    let prevScore = -1;
    for (let i = 0; i < sortedStudents.length; i++) {
      const student = sortedStudents[i];
      if (student.score !== prevScore) {
        rank += 1;
      }
      result.push({ ...student, rank });
      prevScore = student.score;
    }

    return result.filter((item) => item.rank <= competition.numOfPrizes);
  }, [competition?.numOfPrizes, rounds]);

  return (
    <>
      <Box className="w-[50vw] bg-white min-h-[50vh] rounded-xl p-3">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-950 mb-4">
            Final Result
          </h2>
        </div>

        {topStudentsWithRank?.map((student, index) => (
          <div
            key={index}
            className="flex items-center h-12 p-3 border-b last:border-0 gap-2"
          >
            <span>#{student?.rank}</span>
            <div>
              <span>{student?.roundResultStudent.fullName}</span>
              <span className="text-gray-500">
                (id:{student?.roundResultStudent.id})
              </span>
            </div>
            <div className="flex justify-center border  rounded-full w-10 h-10  items-center ml-auto">
              <span>{student?.score}</span>
            </div>
            {user?.role === ROLES.EMPLOYEE ||
              (user?.role === ROLES.STUDENT &&
                user?.accountStudent?.id === student?.roundResultStudent.id && (
                  <IconButton
                    onClick={() => {
                      setSelected(student);
                      setOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      viewBox="0 0 128 128"
                      id="Certificate"
                      width={18}
                    >
                      <path
                        d="M97 37.00024H31a2 2 0 0 0 0 4H97a2 2 0 0 0 0-4zM99 49.00035a2.00011 2.00011 0 0 0-2-2H31a2 2 0 0 0 0 4H97A2.00011 2.00011 0 0 0 99 49.00035zM61 59.00044a2.00011 2.00011 0 0 0-2-2H31a2 2 0 0 0 0 4H59A2.00011 2.00011 0 0 0 61 59.00044zM29 78.00061a8 8 0 1 0 8-8.00007A8.00912 8.00912 0 0 0 29 78.00061zm12 0a4 4 0 1 1-4-4A4 4 0 0 1 41 78.00061z"
                        fill="#9ea8b4"
                        className="color000000 svgShape"
                      ></path>
                      <path
                        d="M122,10H6a6.00659,6.00659,0,0,0-6,6.00005V98.0008a6.00659,6.00659,0,0,0,6,6.00005H66.598l2.85541-4H6a2.00261,2.00261,0,0,1-2-2V16.00005a2.00261,2.00261,0,0,1,2-2H122a2.00261,2.00261,0,0,1,2,2V98.0008a2.00261,2.00261,0,0,1-2,2H108.54724l2.85565,4H122a6.00659,6.00659,0,0,0,6-6.00005V16.00005A6.00659,6.00659,0,0,0,122,10Z"
                        fill="#9ea8b4"
                        className="color000000 svgShape"
                      ></path>
                      <path
                        d="M82.908 107.33859L79.415 112.16987l-.39648-1.95607a2.66506 2.66506 0 0 0-.95508-1.72463 2.74677 2.74677 0 0 0-2.09277-.59669l-2.502.252 3.809-5.336a9.46512 9.46512 0 0 1-3.73444-1.65218L68.5127 108.203a2.62967 2.62967 0 0 0-.126 2.92776 2.72367 2.72367 0 0 0 2.68555 1.2754l4.22266-.42579.74414 3.67093a2.649 2.649 0 0 0 1.8916 2.22951A2.77118 2.77118 0 0 0 78.7334 118a2.74228 2.74228 0 0 0 2.21-1.1172l7.19647-9.9545a9.137 9.137 0 0 1-3.301.66926A7.492 7.492 0 0 1 82.908 107.33859zM104.45685 101.15616a9.46988 9.46988 0 0 1-3.73474 1.65211l3.80914 5.33617-2.502-.252a2.74508 2.74508 0 0 0-2.09277.59669 2.66506 2.66506 0 0 0-.95508 1.72463l-.39648 1.9551-3.49969-4.84031a8.3318 8.3318 0 0 1-5.22894-.40552l7.21008 9.97342A2.7281 2.7281 0 0 0 99.26563 118a2.7826 2.7826 0 0 0 .80371-.11914 2.649 2.649 0 0 0 1.8916-2.22951l.74414-3.67093 4.22266.42579a2.72041 2.72041 0 0 0 2.68555-1.2754 2.622 2.622 0 0 0-.1123-2.90921zM94.25488 103.42272a5.47411 5.47411 0 0 0 2.88672-2.96 5.68578 5.68578 0 0 1 .67383-1.0752 5.656 5.656 0 0 1 1.25879-.32422 4.40593 4.40593 0 0 0 4.27246-5.85552 5.68449 5.68449 0 0 1-.08008-1.31349 5.63277 5.63277 0 0 1 .79688-.95118A5.50049 5.50049 0 0 0 106 87.2507a5.50049 5.50049 0 0 0-1.93652-3.69242 5.76208 5.76208 0 0 1-.79395-.94337 5.54413 5.54413 0 0 1 .07715-1.3213 5.35008 5.35008 0 0 0-.59375-4.03715 5.37937 5.37937 0 0 0-3.67871-1.81838 5.76388 5.76388 0 0 1-1.25293-.32032 5.63617 5.63617 0 0 1-.68066-1.08009 5.46584 5.46584 0 0 0-2.88672-2.959 5.31633 5.31633 0 0 0-3.98535.68067A5.41777 5.41777 0 0 1 89 72.25056a5.41777 5.41777 0 0 1-1.26855-.49122 5.32409 5.32409 0 0 0-3.98633-.68067 5.47411 5.47411 0 0 0-2.88672 2.96 5.68578 5.68578 0 0 1-.67383 1.07521 5.656 5.656 0 0 1-1.25879.32422 5.37806 5.37806 0 0 0-3.67871 1.8174 5.35307 5.35307 0 0 0-.59375 4.03812 5.68449 5.68449 0 0 1 .08008 1.31349 5.63277 5.63277 0 0 1-.79687.95118A5.50049 5.50049 0 0 0 72 87.2507a5.50049 5.50049 0 0 0 1.93652 3.69242 5.76208 5.76208 0 0 1 .79395.94337 5.54414 5.54414 0 0 1-.07715 1.3213 4.40669 4.40669 0 0 0 4.27246 5.85552 5.76388 5.76388 0 0 1 1.25293.32032 5.63617 5.63617 0 0 1 .68066 1.08009 5.46584 5.46584 0 0 0 2.88672 2.959 3.54046 3.54046 0 0 0 1.10156.17285 6.861 6.861 0 0 0 2.88379-.85352A5.41777 5.41777 0 0 1 89 102.25083a5.41777 5.41777 0 0 1 1.26855.49122A5.32409 5.32409 0 0 0 94.25488 103.42272zm-8.23047-4.29789a8.67953 8.67953 0 0 1-1.04.44043 8.40349 8.40349 0 0 1-.61133-1.01368 5.34375 5.34375 0 0 0-4.708-3.419 8.50778 8.50778 0 0 1-1.1416-.26758 8.43541 8.43541 0 0 1 .09766-1.15235 6.89791 6.89791 0 0 0-.08594-3.06155 6.68237 6.68237 0 0 0-1.69727-2.461 7.58053 7.58053 0 0 1-.80371-.93946 7.58053 7.58053 0 0 1 .80371-.93946 6.68237 6.68237 0 0 0 1.69727-2.461 6.90255 6.90255 0 0 0 .08594-3.06253 8.56752 8.56752 0 0 1-.09766-1.15235 8.66472 8.66472 0 0 1 1.1416-.2666 5.33667 5.33667 0 0 0 4.708-3.419 8.35425 8.35425 0 0 1 .61133-1.01368 8.67953 8.67953 0 0 1 1.04.44043 5.50212 5.50212 0 0 0 5.95117 0 8.67953 8.67953 0 0 1 1.04-.44043 8.40349 8.40349 0 0 1 .61133 1.01368 5.34375 5.34375 0 0 0 4.708 3.419 8.50778 8.50778 0 0 1 1.1416.26758 8.43541 8.43541 0 0 1-.09766 1.15235 6.89791 6.89791 0 0 0 .08594 3.06155 6.68236 6.68236 0 0 0 1.69727 2.461 7.58053 7.58053 0 0 1 .80371.93946 7.58053 7.58053 0 0 1-.80371.93946 6.68236 6.68236 0 0 0-1.69727 2.461 6.90255 6.90255 0 0 0-.08594 3.06253 8.56752 8.56752 0 0 1 .09766 1.15235 8.66472 8.66472 0 0 1-1.1416.2666 5.33667 5.33667 0 0 0-4.708 3.419 8.35425 8.35425 0 0 1-.61133 1.01368 8.67953 8.67953 0 0 1-1.04-.44043 5.50212 5.50212 0 0 0-5.95117 0z"
                        fill="#9ea8b4"
                        className="color000000 svgShape"
                      ></path>
                      <path
                        d="M96,87.2507a7,7,0,1,0-7,7.00006A7.00852,7.00852,0,0,0,96,87.2507Zm-7,3a3,3,0,1,1,3-3A3.00329,3.00329,0,0,1,89,90.25073Z"
                        fill="#9ea8b4"
                        className="color000000 svgShape"
                      ></path>
                      <path
                        d="M116,96.00078a4.004,4.004,0,0,0,4-4V22.00011a4.004,4.004,0,0,0-4-4H12a4.004,4.004,0,0,0-4,4V92.00074a4.004,4.004,0,0,0,4,4H70.60736a11.50419,11.50419,0,0,1,.0108-2.749,13.3832,13.3832,0,0,1-1.01721-1.251H12V37.57837l15.41406-15.4142a1.96161,1.96161,0,0,0,.134-.16406H100.4519a1.96162,1.96162,0,0,0,.134.16406L116.00067,37.579l.00226,54.4217h-7.60425a13.42292,13.42292,0,0,1-1.01685,1.251,11.50411,11.50411,0,0,1,.0108,2.749ZM12,31.92207v-9.922h9.92188Zm94.07813-9.922H116l.00043,9.92239Z"
                        fill="#9ea8b4"
                        className="color000000 svgShape"
                      ></path>
                    </svg>
                  </IconButton>
                ))}
          </div>
        ))}
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-white min-w-fit min-h-fit  rounded-2xl flex flex-col p-2 gap-5 ">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="!font-bold self-center"
          >
            Certificate
          </Typography>
          <Certificate
            name={selected?.roundResultStudent?.fullName}
            nameCompetition={competition?.name}
            top={selected?.rank}
          />
        </Box>
      </Modal>
    </>
  );
};
