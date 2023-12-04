import { useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { getCompetitions } from "../../../services/competitionService";
import SelectRegister from "../../../components/admin/register/SelectRegister";
import { getRoundAlreadyStartByCompetition } from "../../../services/roundService";

const ScoreRound = () => {
  const [selectedOptionCompe, setSelectedOptionCompe] = useState(null);
  const [selectedOptionRound, setSelectedOptionRound] = useState(null);
  //lấy cuộc thi để chọn
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
  );
};

export default ScoreRound;
