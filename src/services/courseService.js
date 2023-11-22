import { axiosClientPrivate } from "./axiosClient";

const url = "/courses";
const CoursesApi = {
  getCourses: () => axiosClientPrivate.get(`${url}`),
  createCourse: (course) => axiosClientPrivate.post(`${url}`, course),
  updateCourse: (data) =>
    axiosClientPrivate.patch(`${url}/${data.id}`, data.course),
  deleteCourse: (id) => axiosClientPrivate.delete(`${url}/${id}`),
};
export const { createCourse, getCourses, updateCourse, deleteCourse } =
  CoursesApi;
export default CoursesApi;
