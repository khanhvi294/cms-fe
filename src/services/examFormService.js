import { axiosClientPrivate } from "./axiosClient";

const url = "/examforms";
const examFormApi = {
  getExamForms: () => axiosClientPrivate.get(`${url}`),
  createExamForm: (examForm) => axiosClientPrivate.post(`${url}`, examForm),
  updateExamForm: (data) =>
    axiosClientPrivate.patch(`${url}/${data.id}`, data.examForm),
  deleteExamForm: (id) => axiosClientPrivate.delete(`${url}/${id}`),
};
export const { createExamForm, getExamForms, updateExamForm, deleteExamForm } =
  examFormApi;
export default examFormApi;
