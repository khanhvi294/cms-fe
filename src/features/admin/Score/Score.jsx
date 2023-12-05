import { Button } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import Table from "../../../components/Table/Table";
import SelectRegister from "../../../components/admin/register/SelectRegister";
import ModalConfirmStudent from "../../../components/score/ModalConfirm";
import ModalSeeScore from "../../../components/score/ModalSeeScore";
import { getCompetitions } from "../../../services/competitionService";
import { getRoundResultByRound } from "../../../services/roundResultService";
import { getRoundAlreadyStartByCompetition } from "../../../services/roundService";
import ModalInputMarkPoint from "../../../components/score/ModalInputMarkPoint";

const ScoreRound = () => {
  const [selectedOptionCompe, setSelectedOptionCompe] = useState(null);
  const [selectedOptionRound, setSelectedOptionRound] = useState(null);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openInput, setInput] = useState(false);

  const columns = [
    {
      field: "roundResultStudent.id",
      headerName: "Student ID",
      type: "number",
      width: 250,
      align: "left",
      headerAlign: "left",
      editable: false,
      valueGetter: (params) => params.row.roundResultStudent?.id,
    },
    {
      field: "roundResultStudent.fullName",
      headerName: "Name",
      width: 400,
      editable: false,
      valueGetter: (params) => params.row.roundResultStudent?.fullName,
    },

    {
      field: "score",
      headerName: "Score",
      align: "left",
      headerAlign: "left",
      type: "number",
      width: 200,
      editable: true,
    },
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
                setOpen(true);
                console.log(params.row);
                setRoundResult(params.row);
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
      ],
    },
  ];
  //lấy cuộc thi để chọn
  const { data: competitions } = useQuery({
    queryKey: ["competitions"],
    queryFn: getCompetitions,
    onSuccess: (data) => {
      setSelectedOptionCompe({
        value: data?.data?.data[0]?.id,
        label: data?.data?.data[0]?.name,
      });
    },
  });
  console.log(rows);
  console.log(selectedOptionCompe?.value);
  const handleSelectCompeChange = (selected) => {
    setSelectedOptionCompe(selected);
  };

  const handleSelectRoundChange = (selected) => {
    setSelectedOptionRound(selected);
  };

  //lấy vòng thi để chọn
  const { data: rounds } = useQuery({
    queryKey: ["roundSelect", selectedOptionCompe?.value],
    queryFn: () =>
      getRoundAlreadyStartByCompetition(selectedOptionCompe?.value),
    enabled: !!selectedOptionCompe?.value,
    onSuccess: (data) => {
      setSelectedOptionRound({
        value: data?.data?.data[0]?.id,
        label: data?.data?.data[0]?.name,
      });
    },
  });
  //lấy kết quả vòng thi
  useQuery({
    queryKey: ["roundResult", selectedOptionRound?.value],
    enabled: !!selectedOptionRound?.value,
    queryFn: () => getRoundResultByRound(selectedOptionRound?.value),
    onSuccess: (data) => {
      setRows(data.data.data);
    },
  });

  return (
    <>
      <div>
        <div className="flex gap-4">
          <div className="my-4">
            <label>Select competition:</label>
            <div className="w-[300px] self-end mt-1">
              <SelectRegister
                selectedOption={selectedOptionCompe}
                competitions={competitions?.data?.data}
                handleSelectChange={handleSelectCompeChange}
              />
            </div>
          </div>
          <div className="my-4">
            <label>Select round:</label>
            <div className="w-[300px] self-end mt-1">
              <Select
                defaultValue={selectedOptionRound}
                options={rounds?.data?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                value={selectedOptionRound}
                onChange={handleSelectRoundChange}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <Button
            variant="contained flex-end !bg-[#000] !text-white !rounded-md"
            onClick={() => {
              setOpenConfirm(true);
            }}
          >
            Approve students
          </Button>
        </div>
        <Table rows={rows} columns={columns} />
      </div>
      {/* <ModalSeeScore open={open} setOpen={setOpen} roundResult={roundResult} />
      <ModalInputMarkPoint
        open={openInput}
        setOpen={openInput}
        setOpenConfirm={setOpenConfirm}
      />
      <ModalConfirmStudent open={openConfirm} setOpen={setOpenConfirm} /> */}
    </>
  );
};

export default ScoreRound;
