import Select from "react-select";

const SelectRegister = ({
  selectedOption,
  competitions,
  handleSelectChange,
}) => {
  return (
    <Select
      defaultValue={selectedOption}
      options={competitions?.map((item) => ({
        value: item.id,
        label: item.name,
      }))}
      value={selectedOption}
      onChange={handleSelectChange}
    />
  );
};

export default SelectRegister;
