import { axiosClientPrivate } from "./axiosClient";

const url = "/students";
const studentApi = {
  getStudents: () => axiosClientPrivate.get(`${url}`),
  getStudentAddClass: (classId) =>
    axiosClientPrivate.get(`${url}/class/${classId}`),
  createStudent: (student) => axiosClientPrivate.post(`${url}`, student),
  getAllClassesByStudent: (id) =>
    axiosClientPrivate.get(`${url}/${id}/classes`),
  getCompetitionsForStudent: (id) =>
    axiosClientPrivate.get(`${url}/${id}/competitions`),
};
export const {
  createStudent,
  getStudents,
  getAllClassesByStudent,
  getCompetitionsForStudent,
  getStudentAddClass,
} = studentApi;
export default studentApi;
