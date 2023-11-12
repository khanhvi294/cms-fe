import { Button, Chip } from "@mui/material";

const cuocThi = {
  name: "Lập trình web",
  status: 2,
  timeStart: "20-10-2021",
  timeEnd: "20-10-20",
  soVong: 3,
};
const CompetitionListFetch = () => {
  return (
    <>
      {" "}
      <div className="bg-white w-[594px] h-[380px] p-5 flex flex-col gap-8 drop-shadow-md rounded-lg">
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
            <Button className="!bg-[#44badc] !text-white">Registration</Button>
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
          <span>36 participants</span>
        </p>
        <p className="text-xs uppercase font-medium ">DURATION</p>
        <div className="flex w-[80%] justify-between">
          <p>{cuocThi.timeStart}</p>
          <p>{cuocThi.timeEnd}</p>
        </div>

        <p>{cuocThi.soVong} rounds</p>
      </div>
    </>
  );
};

export default CompetitionListFetch;
