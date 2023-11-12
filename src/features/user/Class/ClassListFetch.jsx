import { Button, Chip } from "@mui/material";

const classes = [
  {
    id: 1,
    name: "Lập trình C++ 20231",
    course: "Lập trình C++",
    timeStart: "19-09-2023",
    timeEnd: "19-12-2023",
    status: 0,
  },

  {
    id: 3,
    name: "Lập trình Java 20231",
    course: "Lập trình Java",
    timeStart: "10-07-2023",
    timeEnd: "10-10-2023",
    status: 1,
  },
];
const ClassListFetch = () => {
  return (
    <div className="flex flex-wrap gap-5">
      {classes.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-white w-[416px] h-[230px] p-6 flex flex-col gap-8 drop-shadow-md rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex justify-between w-full">
                <p className="font-semibold mb-3">{item.name}</p>
                {item.status === 0 && (
                  <Chip
                    label="Ongoing"
                    className="!bg-[#ddf7ed] !text-[#28f2a5] !font-medium"
                  />
                )}
                {item.status === 1 && (
                  <Chip
                    label="Completed"
                    className="!bg-[#f6b2a6] !text-[#f54323] !font-medium"
                  />
                )}
              </div>
            </div>

            <p className="text-xs uppercase font-medium ">Time</p>
            <div>
              <div className="flex w-[95%] justify-between mb-2">
                <p>{item.timeStart}</p>
                <p>{item.timeEnd}</p>
              </div>
              <div className="w-[95%] h-[6px] bg-slate-400 rounded-3xl"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClassListFetch;
