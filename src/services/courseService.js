import { axiosClientPrivate } from "./axiosClient";

const url = "/courses";
const CoursesApi = {
  getCourse: () => axiosClientPrivate.get(`${url}`),
  createCourse: (Course) => axiosClientPrivate.post(`${url}`, Course),
};
export const { createCourse, getCourse } = CoursesApi;
export default CoursesApi;
