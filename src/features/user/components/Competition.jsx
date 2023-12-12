import { ArrowRightIcon, MenuIcon } from "../../../components/icons";
import { Button, Chip, IconButton, Modal, Tooltip } from "@mui/material";

import { FinalResult } from "./FinalResult";
import { getRoundByCompetition } from "../../../services/roundService";
import { useModal } from "../../../hooks/use-modal";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

export const Competition = ({
  competition,
  competitionIds,
  onRegister,
  onUnregister,
}) => {
  const isRegister = competitionIds?.includes(competition.id);
  const status = competition.status;
  const canSeeResult = (status === 2 || status === 1) && isRegister;
  const { label, className } = getChipPropsObject(status);
  const navigate = useNavigate();
  const handleShowResult = (id) => {
    navigate(`/competitions/${id}/result`);
  };
  const { close, isOpen, open } = useModal();

  const { data } = useQuery({
    queryKey: ["rounds", competition.id],
    enabled: !!competition.id,
    queryFn: () => getRoundByCompetition(competition.id),
  });

  const rounds = data?.data?.data;

  return (
    <div className="bg-white w-[416px] h-[350px] p-5 flex flex-col gap-8 drop-shadow-md rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold mb-3">{competition.name}</p>
          <Chip label={label} className={className} />
        </div>
        {status === 0 && (
          <>
            {isRegister ? (
              <Button
                className="!bg-[#f09b5e] !text-white"
                onClick={() => onUnregister(competition.id)}
              >
                UnRegister
              </Button>
            ) : (
              <Button
                className="!bg-[#44badc] !text-white"
                onClick={() => onRegister(competition.id)}
              >
                Register
              </Button>
            )}
          </>
        )}
        <div className="flex gap-2">
          {canSeeResult && (
            <Button
              onClick={() => handleShowResult(competition.id)}
              className="!bg-yellow-700 !text-white"
            >
              My result
            </Button>
          )}
          {status === 2 && (
            <Button onClick={open} className="!bg-red-700 !text-white">
              Final result
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {/* <span className="text-gray-500 flex gap-1 items-center hover:underline">
					<MenuIcon />
					<span>{competition.people} participants</span>
				</span> */}
        <Tooltip title="Go to detail" placement="top">
          <IconButton
            aria-label="fingerprint"
            color="secondary"
            className="!bg-[#e3faf1]"
            onClick={() => navigate(`/competition/${competition.id}`)}
          >
            <ArrowRightIcon />
          </IconButton>
        </Tooltip>
      </div>
      <p className="text-xs uppercase font-medium ">DURATION</p>
      <div>
        <div className="flex w-[95%] justify-between mb-2">
          <p>{competition.timeStart}</p>
          <p>{competition.timeEnd}</p>
        </div>
        <div className="w-[95%] h-[6px] bg-slate-400 rounded-3xl"></div>
      </div>

      <p>{competition.numberOfRound} rounds</p>
      {competition?.status === 2 && (
        <Modal
          open={isOpen}
          onClose={close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center "
        >
          <FinalResult competition={competition} rounds={rounds} />
        </Modal>
      )}
    </div>
  );
};

const getChipPropsObject = (status) => {
  let label = "";
  let className = "";
  switch (status) {
    case 0:
      label = "Upcoming";
      className = "!bg-[#ddf3f9] !text-[#38c0e6] !font-medium";
      break;
    case 1:
      label = "In progress";
      className = "!bg-[#ddf7ed] !text-[#28f2a5] !font-medium";
      break;
    case 2:
      label = "Completed";
      className = "!bg-[#e8fbbb] !text-[#c3ed4f] !font-medium";
      break;
    case 3:
      label = "Canceled";
      className = "!bg-[#f6b2a6] !text-[#f54323] !font-medium";
      break;
    default:
      break;
  }
  return { label, className };
};
