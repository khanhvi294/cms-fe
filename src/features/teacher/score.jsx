import { useParams } from "react-router-dom";
import TableScore from "../../components/teacher/table/TableScore";

const InputScore = () => {
  const { roundId } = useParams();

  return (
    <div className="w-[80%] mx-auto mt-20">
      <TableScore roundId={roundId} />
    </div>
  );
};

export default InputScore;
