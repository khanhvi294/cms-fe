import { Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appRoutes } from "../../../routes/appRouter";
import { useQuery } from "react-query";
import { getCompetitionById } from "../../../services/competitionService";
import Table from "../../../components/Table/Table";
import { getRoundByCompetition } from "../../../services/roundService";

const CompetitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState();
  const [rows, setRows] = useState([]);

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
  useQuery({
    queryKey: ["rounds", id],
    enabled: !!id,
    queryFn: () => getRoundByCompetition(id),
    onSuccess: (data) => {
      console.log(data);
      setRows(data.data.data);
    },
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },

    { field: "examFormId", headerName: "examForm Id", width: 250 },
    { field: "roundNumber", headerName: "round", width: 100 },
    { field: "timeStart", headerName: "time Start", width: 250 },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="Eye"
              width={15}
              onClick={() => {
                setCompetitionSee(params.row);
                handleOpenSee();
              }}
            >
              <g
                data-name="Layer 2"
                fill="#151515"
                className="color000000 svgShape"
              >
                <g
                  data-name="eye"
                  fill="#151515"
                  className="color000000 svgShape"
                >
                  <rect
                    width="24"
                    height="24"
                    opacity="0"
                    fill="#151515"
                    className="color000000 svgShape"
                  ></rect>
                  <path
                    d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"
                    fill="#151515"
                    className="color000000 svgShape"
                  ></path>
                  <path
                    d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"
                    fill="#151515"
                    className="color000000 svgShape"
                  ></path>
                </g>
              </g>
            </svg>
          }
          label="See"
        />,
        <GridActionsCellItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="Lock"
              width={15}
              onClick={handleOpenSee}
            >
              <path
                d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
          }
          label="Block"
        />,
      ],
    },
  ];

  return (
    <div>
      <div className="bg-white min-h-[300px]  rounded-2xl  p-4 gap-5 ">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="font-bold self-center"
        >
          Competition
        </Typography>
        <div className=" flex justify-between">
          <div className="">
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
          </div>
          <div>
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
          </div>
          <div>
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
        </div>
        {/* <ModalSeeRound competition={competition} /> */}
      </div>
      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default CompetitionDetail;
