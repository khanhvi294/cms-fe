import { axiosClientPrivate } from "./axiosClient";

const url = "/employees";
const employeeApi = {
  getEmployees: () => axiosClientPrivate.get(`${url}`),
  createExamForm: (examForm) => axiosClientPrivate.post(`${url}`, examForm),
};
export const { createExamForm, getEmployees } = employeeApi;
export default employeeApi;
