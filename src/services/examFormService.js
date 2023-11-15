import axiosClient, { axiosClientPrivate } from "./axiosClient";

const url = "/examforms";
const examFormApi = {
  getExamForms: () => axiosClient.get(`${url}`),
  createExamForm: (examForm) => axiosClientPrivate.post(`${url}`, examForm),
};
export const { createExamForm, getExamForms } = examFormApi;
export default examFormApi;
