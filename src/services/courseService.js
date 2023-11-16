import { axiosClientPrivate } from "./axiosClient";

const url = "/courses";
const CoursesApi = {
  getCourses: () => axiosClientPrivate.get(`${url}`),
  createCourse: (course) => axiosClientPrivate.post(`${url}`, course),
};
export const { createCourse, getCourses } = CoursesApi;
export default CoursesApi;
