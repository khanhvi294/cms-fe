import { GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import { getAllRoundByJudge } from "../../services/judgeService";
import { getFileName } from "../../utils/getFileName";

const RoundJudge = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.data?.info);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "competitionRound", // Thêm cột mới cho tên của courseClass
      headerName: "Competition ",
      width: 250,
      valueGetter: (params) => params.row.competitionRound.name,
    },

    {
      field: "examFormRound",
      headerName: "Exam Form",
      width: 200,
      valueGetter: (params) => params?.row?.examFormRound?.name,
    },
    {
      field: "exam",
      headerName: "Exam",
      width: 150,
      renderCell: (params) => (
        <div
          className="truncate underline text-blue-800 cursor-pointer"
          style={{ maxWidth: "100px" }}
        >
          <Link to={params.row?.exam}>{getFileName(params.row?.exam)}</Link>
        </div>
      ),
      //valueGetter: (params) => params?.row?.exam,
    },

    { field: "timeStart", headerName: "time Start", width: 150 },

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
              id="edit"
              width={18}
              onClick={() => {
                navigate(`/teacher/scores/${params.row?.id}`);
              }}
            >
              <path d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path>
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
      <h2 className="!text-2xl font-semibold text-zinc-950">Rounds</h2>
      {/* <TableScore /> */}
      <Table rows={rows} columns={columns} />
    </div>
  );
};

export default RoundJudge;
