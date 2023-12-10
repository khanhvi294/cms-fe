import axiosClient from './axiosClient';

const url = '/auth';
const authService = {
	login: (account) => axiosClient.post(`${url}/login`, account),
	getInfo: () => axiosClient.get(`${url}/info`),
	forgotPassword: (email) =>
		axiosClient.post(`${url}/forgot-password`, {
			email,
		}),
	resetPassword: (data) => axiosClient.post(`${url}/reset-password`, data),
};
export const { login, getInfo } = authService;
export default authService;
