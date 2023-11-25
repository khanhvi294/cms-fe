import { Button, Chip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModalJudge from "../../../components/admin/judges/modalJudge";
import ModalAddRound from "../../../components/admin/rounds/modalAddRound";
import RoundTable from "../../../components/admin/rounds/tableCollapRound";
import {
  getAllClassJoinCompetition,
  getCompetitionById,
} from "../../../services/competitionService";
import { createExamForm } from "../../../services/examFormService";
import { getRoundByCompetition } from "../../../services/roundService";

const CompetitionDetail = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState();
  const [open, setOpen] = useState(false);
  const [openJudge, setOpenJudge] = useState(false);
  const [roundChoose, setRoundChoose] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
    },

    { field: "examFormId", headerName: "examForm Id", width: 250 },
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
                setOpenJudge(true);
                setRoundChoose(params?.row);
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
  const [rows, setRows] = useState([]);

  const onSubmit = (data) => {
    createExamFormMutation.mutate(data);
    handleClose();
  };

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
      setRows(data.data.data);
    },
  });

  useQuery({
    queryKey: ["classes", id],
    enabled: !!id,
    queryFn: () => getAllClassJoinCompetition(id),
    onSuccess: (data) => {
      console.log("class", data);
    },
  });

  const createExamFormMutation = useMutation({
    mutationFn: (data) => createExamForm(data),
    onSuccess: (data) => {
      setRows((state) => [data.data, ...state]);
      toast.success("Create successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <div>
        <div className="bg-white min-h-[200px]  rounded-2xl  p-4 gap-5 ">
          <p
            id="modal-modal-title"
            className="font-semibold self-center !text-xl"
          >
            Competition
          </p>
          <div className=" flex justify-between mt-4">
            <div className="w-[250px] flex flex-col gap-2">
              <div className="flex justify-between w-full ">
                <p className="font-bold">Id</p>
                <p>{competition?.id}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">Name</p>
                <p>{competition?.name}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">Number of prizes</p>
                <p>{competition?.numOfPrizes}</p>
              </div>
            </div>
            <div className="w-[250px] flex flex-col gap-2">
              <div className="flex justify-between w-full">
                <p className="font-bold">Time Start</p>
                <p>{competition?.timeStart}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-bold">Time End</p>
                <p>{competition?.timeEnd}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">Rounds</p>
                <p>{competition?.numberOfRound}</p>
              </div>
            </div>
            <div className="w-[250px] flex flex-col gap-2">
              <div className="flex justify-between w-full">
                <p className="font-bold">Minimum number of students</p>
                <p>{competition?.minimumQuantity}</p>
              </div>

              <div className="flex justify-between w-full">
                <p className="font-bold">EmpoyeeId</p>
                <p>{competition?.employeeId}</p>
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
            </div>
          </div>
          {/* <ModalSeeRound competition={competition} /> */}
        </div>

        <div>
          <div className="flex gap-2 justify-between items-center mb-4">
            <span className="text-xl font-semibold">Rounds</span>
            <Button
              variant="contained flex-end !bg-[#000] !text-white !rounded-md"
              onClick={handleOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="plus"
                width={22}
                height={22}
              >
                <g
                  data-name="Layer 2"
                  fill="#ffffff"
                  className="color000000 svgShape"
                >
                  <g
                    data-name="plus"
                    fill="#ffffff"
                    className="color000000 svgShape"
                  >
                    <rect
                      width="24"
                      height="24"
                      opacity="0"
                      transform="rotate(180 12 12)"
                      fill="#ffffff"
                      className="color000000 svgShape"
                    ></rect>
                    <path
                      d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
                      fill="#ffffff"
                      className="color000000 svgShape"
                    ></path>
                  </g>
                </g>
              </svg>
              Add
            </Button>
          </div>
          <div className="overflow-auto h-[400px]">
            <RoundTable rows={rows} />
          </div>
        </div>
      </div>

      {/* <Table columns={columns} rows={rows} /> */}
      <ModalAddRound
        openAddRound={open}
        handleCloseAddRound={handleClose}
        competition={competition}
        setRows={setRows}
      />
      {openJudge && (
        <ModalJudge
          open={openJudge}
          setOpenJudge={setOpenJudge}
          round={roundChoose}
        />
      )}
    </>
  );
};
export default CompetitionDetail;
