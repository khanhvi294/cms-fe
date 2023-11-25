import { axiosClientPrivate } from "./axiosClient";

const url = "/employees";
const employeeApi = {
  getEmployees: () => axiosClientPrivate.get(`${url}`),
  getAllTeacherAddJudge: (roundId) =>
    axiosClientPrivate.get(`${url}/judges/round/${roundId}`),

  createEmployee: (employee) => axiosClientPrivate.post(`${url}`, employee),
  updateEmployee: (employee) => axiosClientPrivate.patch(`${url}`, employee),
};
export const {
  createEmployee,
  getEmployees,
  getAllTeacherAddJudge,
  updateEmployee,
} = employeeApi;
export default employeeApi;
