import { axiosClientPrivate } from "./axiosClient";

const url = "/employees";
const employeeApi = {
  getEmployees: () => axiosClientPrivate.get(`${url}`),
  getAllTeacherAddJudge: (roundId) =>
    axiosClientPrivate.get(`${url}/judges/round/${roundId}`),

  createEmployee: (employee) => axiosClientPrivate.post(`${url}`, employee),
};
export const { createEmployee, getEmployees, getAllTeacherAddJudge } =
  employeeApi;
export default employeeApi;
