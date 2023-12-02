import { useState } from "react";
import { useQuery } from "react-query";
import { getCompetitions } from "../../../services/competitionService";
import SelectRegister from "../../../components/admin/register/SelectRegister";

const ScoreRound = () => {
  const [selectedOptionCompe, setSelectedOptionCompe] = useState(null);

  const { data: competitions } = useQuery({
    queryKey: ["competitions"],
    queryFn: getCompetitions,
    onSuccess: (data) => {
      setSelectedOptionCompe({
        value: data?.data?.data[0]?.id,
        label: data?.data?.data[0]?.name,
      });
      // setRows(data.data.data);
    },
  });
  const handleSelectCompeChange = (selected) => {
    setSelectedOptionCompe(selected);
  };

  return (
    <div>
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
    </div>
  );
};

export default ScoreRound;
