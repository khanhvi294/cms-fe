import { axiosClientPrivate } from "./axiosClient";

const url = "/courses";
const CoursesApi = {
  getCourses: () => axiosClientPrivate.get(`${url}`),
  createCourse: (course) => axiosClientPrivate.post(`${url}`, course),
  updateCourse: (course) => axiosClientPrivate.patch(`${url}`, course),
};
export const { createCourse, getCourses, updateCourse } = CoursesApi;
export default CoursesApi;
