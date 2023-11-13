import { Button } from "@mui/material";
import Table from "../../../components/Table/Table";

const Classes = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },

    { field: "courseid", headerName: "courseid", width: 200 },
    { field: "name", headerName: "name", width: 250 },
    { field: "timestart", headerName: "timestart", width: 250 },
    { field: "timeend", headerName: "timeend", width: 250 },
  ];
  const rows = [
    {
      id: "1",
      courseid: "4",
      email: "sv01@gmail.com",
      active: 1,
      name: "Nguyễn Thúy Hạnh",
    },
    {
      id: "2",
      email: "sv02@gmail.com",
      courseid: "6",
      active: 1,
      name: "Trần Thiên Bảo",
    },
  ];
  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <span className="text-2xl font-semibold">Classes</span>
        <Button variant="contained flex-end !bg-[#000] !text-white !rounded-md">
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
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default Classes;
