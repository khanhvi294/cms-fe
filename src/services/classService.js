import { axiosClientPrivate } from "./axiosClient";

const url = "/classes";
const ClassesApi = {
  getClasses: () => axiosClientPrivate.get(`${url}`),
  createClass: (Class) => axiosClientPrivate.post(`${url}`, Class),
  addStudents: (data) =>
    axiosClientPrivate.post(`${url}/student/add/multiple`, data),
};
export const { createClass, getClasses, addStudents } = ClassesApi;
export default ClassesApi;
