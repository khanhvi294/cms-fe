import Select from "react-select";
import { useState } from "react";
import { useQuery } from "react-query";
import Table from "../../../components/Table/Table";
import { getCompetitions } from "../../../services/competitionService";
import { getRegisterByCompetition } from "../../../services/registerService";

const Register = () => {
  const [rows, setRows] = useState([]);
  const [competition, setCompetition] = useState();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
    },
    {
      field: "studentRegister.id",
      headerName: "Student ID",
      width: 400,
      valueGetter: (params) => params.row.studentRegister?.id || "", // Thêm kiểm tra để tránh lỗi nếu studentRegister không tồn tại
    },
    {
      field: "studentRegister.fullName",
      headerName: "Student Name",
      width: 400,
      valueGetter: (params) => params.row.studentRegister?.fullName || "", // Thêm kiểm tra để tránh lỗi nếu studentRegister không tồn tại
    },
    // Các cột khác nếu có
  ];

  const { data: competitions } = useQuery({
    queryKey: ["competitions"],
    queryFn: getCompetitions,
    onSuccess: (data) => {
      setSelectedOption({
        value: data?.data?.data[0]?.id,
        lable: data?.data?.data[0]?.name,
      });
      // setRows(data.data.data);
    },
  });

  useQuery({
    queryKey: ["registers", competition],
    enabled: competition,
    queryFn: () => getRegisterByCompetition(1),
    onSuccess: (data) => {
      setRows(data.data.data);
    },
  });

  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);

  // Xử lý sự kiện khi giá trị được chọn thay đổi
  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-2xl font-semibold">Register</span>
        {/* <Button
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
        </Button> */}
      </div>
      <label>Chọn một mục:</label>
      {selectedOption?.lable && (
        <Select
          defaultValue={selectedOption}
          options={competitions?.data?.data?.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          value={selectedOption}
          onChange={handleSelectChange}
        />
      )}
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default Register;
