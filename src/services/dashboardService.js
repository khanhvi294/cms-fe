import { axiosClientPrivate } from "./axiosClient";

const url = "/dashboard";
const DashboardApi = {
    getOverviewAll: () => axiosClientPrivate.get(`${url}/overview/all`),
    filterStudentByDate: (data) => axiosClientPrivate.get(`${url}/filter/student?from=${data.from}&to=${data.to}`),
    filterEmployeeByDate: (data) => axiosClientPrivate.get(`${url}/filter/employee?from=${data.from}&to=${data.to}`),
    filterTeacherByDate: (data) => axiosClientPrivate.get(`${url}/filter/teacher?from=${data.from}&to=${data.to}`),
    filterClassByDate: (data) => axiosClientPrivate.get(`${url}/filter/class?from=${data.from}&to=${data.to}`),
    filterCourseByDate: (data) => axiosClientPrivate.get(`${url}/filter/course?from=${data.from}&to=${data.to}`),
    filterCompetitionByDate: (data) => axiosClientPrivate.get(`${url}/filter/competition?from=${data.from}&to=${data.to}`),
};
export const { getOverviewAll,filterStudentByDate,filterEmployeeByDate,
    filterClassByDate,filterTeacherByDate,filterCourseByDate,filterCompetitionByDate
} =
  DashboardApi;
export default DashboardApi;
