import React, { useState } from "react";
import Table from "../../components/Table/Table";
import { useQuery } from "react-query";
import { getAllRoundByJudge } from "../../services/judgeService";
import { useSelector } from "react-redux";
import { GridActionsCellItem } from "@mui/x-data-grid";

const RoundJudge = () => {
  const [rows, setRows] = useState([]);
  const user = useSelector((state) => state.user?.data?.info);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
    },

    {
      field: "examFormRound",
      headerName: "Exam Form",
      width: 250,
      valueGetter: (params) => params?.row?.examFormRound?.name,
    },
    { field: "roundNumber", headerName: "round", width: 200 },
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
              id="Judge"
              width={15}
              onClick={() => {
                // setOpenJudge(true);
                // setRoundChoose(params?.row);
              }}
            >
              <path
                d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"
                fill="#151515"
                className="color000000 svgShape"
              ></path>
            </svg>
          }
          label="Judge"
        />,
        <GridActionsCellItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="Lock"
              width={15}
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
        <GridActionsCellItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Add"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 29 29"
              xml:space="preserve"
              width={15}
              onClick={() => {
                setCompetitionSee(params.row);
                handleOpenAddRound();
              }}
            >
              <path
                d="M14.5 2C7.596 2 2 7.596 2 14.5S7.596 27 14.5 27 27 21.404 27 14.5 21.404 2 14.5 2zM21 15.5h-5.5V21a1 1 0 1 1-2 0v-5.5H8a1 1 0 1 1 0-2h5.5V8a1 1 0 1 1 2 0v5.5H21a1 1 0 1 1 0 2z"
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

  useQuery({
    queryKey: ["judgeRounds", user?.id],
    enabled: !!user?.id,
    queryFn: () => getAllRoundByJudge(user?.id),
    onSuccess: (data) => {
      const roundJudgeArray = [];
      for (const obj of data.data.data) {
        roundJudgeArray.push(obj.roundJudge);
      }

      setRows(roundJudgeArray);
    },
  });

  return (
    <div className="w-[80%] mx-auto">
      <Table rows={rows} columns={columns} />
    </div>
  );
};

export default RoundJudge;
