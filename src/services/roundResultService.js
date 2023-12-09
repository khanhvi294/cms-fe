import { axiosClientPrivate } from './axiosClient';

const url = '/roundresults';
const RoundResultApi = {
	getRoundResultByRound: (roundId) =>
		axiosClientPrivate.get(`${url}/round/${roundId}`),
	getRoundResultByRoundForTeacher: (roundId) =>
		axiosClientPrivate.get(`${url}/teacher/round/${roundId}`),
	updateRoundResult: (data) => axiosClientPrivate.patch(`${url}`, data),
	getRoundResultByIdAndStudentId: (data) =>
		axiosClientPrivate.get(`${url}/${data.id}/student/${data.studentId}`),
	checkStudentPassRound: (data) =>
		axiosClientPrivate.post(`${url}/check`, data),
	confirmStudentPassRound: (data) =>
		axiosClientPrivate.post(`${url}/confirm`, data),
};
export const {
	getRoundResultByIdAndStudentId,
	getRoundResultByRound,
	updateRoundResult,
	getRoundResultByRoundForTeacher,
	checkStudentPassRound,
	confirmStudentPassRound,
} = RoundResultApi;
export default RoundResultApi;
