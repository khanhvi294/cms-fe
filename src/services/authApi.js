import axiosClient from "./axiosClient";

const url = "/auth";
const authApi = {
  login: (account) => axiosClient.post(`${url}/login`, account),
};
export const { login } = authApi;
export default authApi;
