import { axiosClientPrivate } from "./axiosClient";

const url = "/employees";
const employeeApi = {
  getEmployees: () => axiosClientPrivate.get(`${url}`),
  createEmployee: (employee) => axiosClientPrivate.post(`${url}`, employee),
};
export const { createEmployee, getEmployees } = employeeApi;
export default employeeApi;
