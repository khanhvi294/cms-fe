import { Button, Chip, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { getCompetitionsForStudent } from "../../../services/studentService";
import { useSelector } from "react-redux";
import { useState } from "react";
import { registerCompetition } from "../../../services/registerService";
import { toast } from "react-toastify";

const CompetitionListFetch = () => {
  const [competitions, setCompetitions] = useState([]);
  const user = useSelector((state) => state.user?.data?.info);
  const navigate = useNavigate();

  useQuery({
    queryKey: ["competitions", user?.id],
    queryFn: () => getCompetitionsForStudent(user?.id),
    enabled: !!user?.id,
    onSuccess: (data) => {
      setCompetitions(data?.data);
    },
    onError: (err) => console.log(err),
  });
  const registerCompetitionMutation = useMutation({
    mutationFn: registerCompetition,
    onSuccess: (data) => {
      //setRows((state) => [data.data, ...state]);
      toast.success("Register successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="flex flex-wrap gap-5">
      {competitions.map((cuocThi, index) => (
        <div
          key={index}
          className="bg-white w-[416px] h-[330px] p-5 flex flex-col gap-8 drop-shadow-md rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold mb-3">{cuocThi.name}</p>
              {cuocThi.status === 0 && (
                <Chip
                  label="Upcoming"
                  className="!bg-[#ddf3f9] !text-[#38c0e6] !font-medium"
                />
              )}
              {cuocThi.status === 1 && (
                <Chip
                  label=" In progress"
                  className="!bg-[#ddf7ed] !text-[#28f2a5] !font-medium"
                />
              )}
              {cuocThi.status === 2 && (
                <Chip
                  label="Completed"
                  className="!bg-[#e8fbbb] !text-[#c3ed4f] !font-medium"
                />
              )}
              {cuocThi.status === 3 && (
                <Chip
                  label="Canceled"
                  className="!bg-[#f6b2a6] !text-[#f54323] !font-medium"
                />
              )}
            </div>
            {cuocThi.status === 0 && (
              <Button
                className="!bg-[#44badc] !text-white"
                onClick={() => registerCompetitionMutation.mutate(cuocThi.id)}
              >
                Registration
              </Button>
            )}
            {cuocThi.status === 2 && (
              <Button className="!bg-[#ec4848] !text-white">Results</Button>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 flex gap-1 items-center hover:underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="List"
                width={24}
              >
                <g
                  data-name="Layer 2"
                  fill="#a4a7a8"
                  className="color000000 svgShape"
                >
                  <g
                    data-name="list"
                    fill="#a4a7a8"
                    className="color000000 svgShape"
                  >
                    <circle
                      cx="4"
                      cy="7"
                      r="1"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></circle>
                    <circle
                      cx="4"
                      cy="12"
                      r="1"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></circle>
                    <circle
                      cx="4"
                      cy="17"
                      r="1"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></circle>
                    <rect
                      width="14"
                      height="2"
                      x="7"
                      y="11"
                      rx=".94"
                      ry=".94"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></rect>
                    <rect
                      width="14"
                      height="2"
                      x="7"
                      y="16"
                      rx=".94"
                      ry=".94"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></rect>
                    <rect
                      width="14"
                      height="2"
                      x="7"
                      y="6"
                      rx=".94"
                      ry=".94"
                      fill="#a4a7a8"
                      className="color000000 svgShape"
                    ></rect>
                  </g>
                </g>
              </svg>
              <span>{cuocThi.people} participants</span>
            </span>
            <Tooltip title="Go to detail" placement="top">
              <IconButton
                aria-label="fingerprint"
                color="secondary"
                className="!bg-[#e3faf1]"
                onClick={() => navigate("/competition/detail/1")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  id="Right"
                  width={20}
                >
                  <path
                    d="m29.71 16.71-9 9a1 1 0 0 1-1.41-1.41l7.29-7.3H3a1 1 0 0 1 0-2h23.59l-7.3-7.29A1 1 0 0 1 20.7 6.3l9 9a1 1 0 0 1 0 1.41Z"
                    fill="#4ef5b5"
                    className="color000000 svgShape"
                  ></path>
                </svg>
              </IconButton>
            </Tooltip>
          </div>
          <p className="text-xs uppercase font-medium ">DURATION</p>
          <div>
            <div className="flex w-[95%] justify-between mb-2">
              <p>{cuocThi.timeStart}</p>
              <p>{cuocThi.timeEnd}</p>
            </div>
            <div className="w-[95%] h-[6px] bg-slate-400 rounded-3xl"></div>
          </div>

          <p>{cuocThi.numberOfRound} rounds</p>
        </div>
      ))}
    </div>
  );
};

export default CompetitionListFetch;
