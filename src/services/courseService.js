import { axiosClientPrivate } from "./axiosClient";

const url = "/courses";
const CoursesApi = {
  getCourses: () => axiosClientPrivate.get(`${url}`),
  createCourse: (course) => axiosClientPrivate.post(`${url}`, course),
  updateCourse: (course) =>
    axiosClientPrivate.patch(`${url}/${course?.id}`, course),
  deleteCourse: (id) => axiosClientPrivate.delete(`${url}/${id}`),
};
export const { createCourse, getCourses, updateCourse, deleteCourse } =
  CoursesApi;
export default CoursesApi;
