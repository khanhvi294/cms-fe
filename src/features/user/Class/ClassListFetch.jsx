import { Chip } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAllClassesByStudent } from "../../../services/studentService";

const ClassListFetch = () => {
  const [classes, setClasses] = useState([]);
  const user = useSelector((state) => state.user?.data?.info);
  const currentDay = new Date();

  useQuery({
    queryKey: ["classes", user?.id],
    enabled: !!user?.id,
    queryFn: () => getAllClassesByStudent(user?.id),
    onSuccess: (data) => {
      const classes = data.data?.data?.map((item) => item.ClassStudentClass);

      setClasses(classes);
    },
  });
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
                {item.timeEnd < currentDay ? (
                  <Chip
                    label="Completed"
                    className="!bg-[#f6b2a6] !text-[#f54323] !font-medium"
                  />
                ) : (
                  <Chip
                    label="Ongoing"
                    className="!bg-[#ddf7ed] !text-[#28f2a5] !font-medium"
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
