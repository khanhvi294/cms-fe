import { axiosClientPrivate } from "./axiosClient";

const url = "/classes";
const ClassesApi = {
  getClasses: () => axiosClientPrivate.get(`${url}`),
  createClass: (Class) => axiosClientPrivate.post(`${url}`, Class),
  updateClass: (classRoom) => axiosClientPrivate.patch(`${url}`, classRoom),
  addStudents: (data) =>
    axiosClientPrivate.post(`${url}/student/add/multiple`, data),
  getAllStudentByClass: (classId) =>
    axiosClientPrivate.get(`${url}/${classId}/students`),
  deleteClass: (id) => axiosClientPrivate.delete(`${url}/${id}`),
  deleteStudentInClass: (data) => {
    return axiosClientPrivate.delete(
      `${url}/${data.classId}/student/${data.studentId}`
    );
  },
};
export const {
  createClass,
  getClasses,
  addStudents,
  getAllStudentByClass,
  updateClass,
  deleteClass,
  deleteStudentInClass,
} = ClassesApi;
export default ClassesApi;
