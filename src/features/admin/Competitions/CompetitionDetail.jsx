import { Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appRoutes } from "../../../routes/appRouter";
import { useQuery } from "react-query";
import { getCompetitionById } from "../../../services/competitionService";

const CompetitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState();

  if (!id) {
    navigate(appRoutes.ACOMPETITIONS);
  }
  useQuery({
    queryKey: ["competition", id],
    enabled: !!id,
    queryFn: () => getCompetitionById(id),
    onSuccess: (data) => {
      console.log(data);
      setCompetition(data.data);
    },
  });
  console.log(`Competition `, id);
  return (
    <div className="bg-white w-[400px] min-h-[300px]  rounded-2xl flex flex-col p-4 gap-5 ">
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
          <p>{competition?.id}</p>
        </div>

        <div className="flex justify-between w-full">
          <p className="font-bold">Name</p>
          <p>{competition?.name}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">EmpoyeeId</p>
          <p>{competition?.employeeId}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">Number of prizes</p>
          <p>{competition?.numOfPrizes}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">Number min</p>
          <p>{competition?.minimumQuantity}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">Number max</p>
          <p>{competition?.maximumQuantity}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">Rounds</p>
          <p>{competition?.numberOfRound}</p>
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
          <p>{competition?.timeStart}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold">Time End</p>
          <p>{competition?.timeEnd}</p>
        </div>
      </div>
      {/* <ModalSeeRound competition={competition} /> */}
    </div>
  );
};

export default CompetitionDetail;
