import { useParams } from "react-router-dom";
import TableScore from "../../components/teacher/table/TableScore";
import { useQuery } from "react-query";
import { getRoundById } from "../../services/roundService";
import { useState } from "react";

const InputScore = () => {
  const { roundId } = useParams();
  const [round, setRound] = useState(null);
  useQuery({
    queryKey: ["round", roundId],
    enabled: !!roundId,
    queryFn: () => getRoundById(roundId),
    onSuccess: (data) => {
      setRound(data.data);
    },
  });
  return (
    <div className="w-[80%] mx-auto mt-16">
      <h2 className="text-2xl font-semibold text-zinc-950 mb-10">
        Input Score
      </h2>
      <div>
        <div className="flex gap-4 items-center mb-5">
          <p className="text-lg font-semibold">Round</p>
          <div className="flex gap-3">
            <p className="font-medium">ID</p>
            <p>{round?.id}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-medium">Name</p>
            <p>{round?.name}</p>
          </div>
        </div>
        <TableScore roundId={roundId} />
      </div>
    </div>
  );
};

export default InputScore;
