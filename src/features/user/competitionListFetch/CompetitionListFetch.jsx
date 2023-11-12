import { Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";

const competitions = [
  {
    name: "Bảo mật thông tin",
    status: 0,
    timeStart: "19-11-2023",
    timeEnd: "22-11-2023",
    soVong: 2,
    people: 5,
  },
  {
    name: "Trí tuệ nhân tạo",
    status: 0,
    timeStart: "19-11-2023",
    timeEnd: "22-11-2023",
    soVong: 2,
    people: 5,
  },
  {
    name: "Lập trình ứng dụng",
    status: 1,
    timeStart: "10-11-2023",
    timeEnd: "05-12-2023",
    soVong: 3,
    people: 2,
  },
  {
    name: "Kiểm thử phần mềm",
    status: 2,
    timeStart: "01-11-2023",
    timeEnd: "11-11-2023",
    soVong: 2,
    people: 12,
  },

  {
    name: "Lập trình Java",
    status: 3,
    timeStart: "10-11-2023",
    timeEnd: "10-11-2023",
    soVong: 2,
    people: 5,
  },
];
const CompetitionListFetch = () => {
  return (
    <div className="flex flex-wrap gap-5">
      {competitions.map((cuocThi, index) => (
        <Link key={index} to={"/detail"}>
          <div className="bg-white w-[416px] h-[330px] p-5 flex flex-col gap-8 drop-shadow-md rounded-lg">
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
                <Button className="!bg-[#44badc] !text-white">
                  Registration
                </Button>
              )}
              {cuocThi.status === 2 && (
                <Button className="!bg-[#ec4848] !text-white">Results</Button>
              )}
            </div>
            <p className="text-gray-500 flex gap-1 items-center hover:underline">
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
            </p>
            <p className="text-xs uppercase font-medium ">DURATION</p>
            <div className="flex w-[80%] justify-between">
              <p>{cuocThi.timeStart}</p>
              <p>{cuocThi.timeEnd}</p>
            </div>

            <p>{cuocThi.soVong} rounds</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CompetitionListFetch;
