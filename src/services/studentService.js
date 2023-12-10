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
  deleteStudent: (id) => axiosClientPrivate.delete(`${url}/${id}`),
  updateStudent: (student) => axiosClientPrivate.patch(`${url}/byad`, student),
  updateProfileStudent: (student) =>
    axiosClientPrivate.patch(`${url}`, student),
};
export const {
  createStudent,
  getStudents,
  getAllClassesByStudent,
  getCompetitionsForStudent,
  getStudentAddClass,
  deleteStudent,
  updateStudent,
  updateProfileStudent,
} = studentApi;
export default studentApi;
