import { axiosClientPrivate } from "./axiosClient";

const url = "/students";
const studentApi = {
  getStudents: () => axiosClientPrivate.get(`${url}`),
  createStudent: (student) => axiosClientPrivate.post(`${url}`, student),
};
export const { createStudent, getStudents } = studentApi;
export default studentApi;
