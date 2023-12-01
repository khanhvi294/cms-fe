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
    <div className="w-[80%] mx-auto mt-20 bg-white">
      <h2>Your Round </h2>
      <Table rows={rows} columns={columns} />
    </div>
  );
};

export default RoundJudge;
