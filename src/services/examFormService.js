import { axiosClientPrivate } from "./axiosClient";

const url = "/examforms";
const examFormApi = {
  getExamForms: () => axiosClientPrivate.get(`${url}`),
  createExamForm: (examForm) => axiosClientPrivate.post(`${url}`, examForm),
  updateExamForm: (examForm) => axiosClientPrivate.patch(`${url}`, examForm),
  deleteExamForm: (id) => axiosClientPrivate.delete(`${url}/${id}`),
};
export const { createExamForm, getExamForms, updateExamForm, deleteExamForm } =
  examFormApi;
export default examFormApi;
