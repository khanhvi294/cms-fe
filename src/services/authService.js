import axiosClient from "./axiosClient";

const url = "/auth";
const authService = {
  login: (account) => axiosClient.post(`${url}/login`, account),
  getInfo: () => axiosClient.get(`${url}/info`),
};
export const { login, getInfo } = authService;
export default authService;
