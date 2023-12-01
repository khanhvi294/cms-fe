import { axiosClientPrivate } from "./axiosClient";

const url = "/employees";
const employeeApi = {
  getEmployees: () => axiosClientPrivate.get(`${url}`),
  getAllTeacherAddJudge: (roundId) =>
    axiosClientPrivate.get(`${url}/judges/round/${roundId}`),

  createEmployee: (employee) => axiosClientPrivate.post(`${url}`, employee),
  updateEmployee: (employee) =>
    axiosClientPrivate.patch(`${url}/byad`, employee),
  updateInfoEmployee: (employee) =>
    axiosClientPrivate.patch(`${url}`, employee),
  deleteEmployee: (id) => axiosClientPrivate.delete(`${url}/${id}`),
};
export const {
  createEmployee,
  getEmployees,
  getAllTeacherAddJudge,
  updateEmployee,
  deleteEmployee,
  updateInfoEmployee,
} = employeeApi;
export default employeeApi;
