import { useSelector } from "react-redux";
import {
  getAllCompetitionByStudentId,
  unRegisterCompetition,
} from "../../../services/registerService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { Button, Chip, IconButton, Tooltip } from "@mui/material";
import { toast } from "react-toastify";

const MyCompetition = () => {
  const user = useSelector((state) => state.user?.data?.info);
  console.log(user);
  const queryClient = useQueryClient();

  const [competitions, setCompetitions] = useState([]);
  const { data: competitionUser } = useQuery({
    queryKey: ["competition", user?.id],
    enabled: !!user?.id,
    queryFn: getAllCompetitionByStudentId,
    onSuccess: (data) => {
      setCompetitions(data.data.data);
    },
  });

  const unRegisterCompetitionMutation = useMutation({
    mutationFn: unRegisterCompetition,
    onSuccess: (data) => {
      //setRows((state) => [data.data, ...state]);
      queryClient.invalidateQueries(["competition", user?.id]);

      toast.success("Unregister successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="flex flex-wrap gap-5">
      {competitions.map((competition, index) => (
        <div
          key={index}
          className="bg-white w-[416px] h-[350px] p-5 flex flex-col gap-8 drop-shadow-md rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold mb-3">
                {competition.competitionRegister.name}
              </p>
              {competition.competitionRegister.status === 0 && (
                <Chip
                  label="Upcoming"
                  className="!bg-[#ddf3f9] !text-[#38c0e6] !font-medium"
                />
              )}
              {competition.competitionRegister.status === 1 && (
                <Chip
                  label=" In progress"
                  className="!bg-[#ddf7ed] !text-[#28f2a5] !font-medium"
                />
              )}
              {competition.competitionRegister.status === 2 && (
                <Chip
                  label="Completed"
                  className="!bg-[#e8fbbb] !text-[#c3ed4f] !font-medium"
                />
              )}
              {competition.competitionRegister.status === 3 && (
                <Chip
                  label="Canceled"
                  className="!bg-[#f6b2a6] !text-[#f54323] !font-medium"
                />
              )}
            </div>
            {competition.competitionRegister.status === 0 && (
              <Button
                className="!bg-[#f09b5e] !text-white"
                onClick={() =>
                  unRegisterCompetitionMutation.mutate(competition.id)
                }
              >
                UnRegister
              </Button>
            )}

            {competition.status === 2 && (
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
              <span>{competition.people} participants</span>
            </span>
            <Tooltip title="Go to detail" placement="top">
              <IconButton
                aria-label="fingerprint"
                color="secondary"
                className="!bg-[#e3faf1]"
                //  onClick={() => navigate(`/competition/${competition.id}`)}
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
              <p>{competition.competitionRegister.timeStart}</p>
              <p>{competition.competitionRegister.timeEnd}</p>
            </div>
            <div className="w-[95%] h-[6px] bg-slate-400 rounded-3xl"></div>
          </div>

          <p>{competition.competitionRegister.numberOfRound} rounds</p>
        </div>
      ))}
    </div>
  );
};

export default MyCompetition;
