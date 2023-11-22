import { axiosClientPrivate } from "./axiosClient";

const url = "/examforms";
const examFormApi = {
  getExamForms: () => axiosClientPrivate.get(`${url}`),
  createExamForm: (examForm) => axiosClientPrivate.post(`${url}`, examForm),
  updateExamForm: (examForm) => axiosClientPrivate.patch(`${url}`, examForm),
};
export const { createExamForm, getExamForms, updateExamForm } = examFormApi;
export default examFormApi;
