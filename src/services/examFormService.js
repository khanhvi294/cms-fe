import { axiosClientPrivate } from "./axiosClient";

const url = "/examforms";
const examFormApi = {
  getExamForms: () => axiosClientPrivate.get(`${url}`),
  createExamForm: (examForm) => axiosClientPrivate.post(`${url}`, examForm),
};
export const { createExamForm, getExamForms } = examFormApi;
export default examFormApi;
