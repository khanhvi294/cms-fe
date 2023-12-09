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
};
export const {
	getRoundResultByRound,
	updateRoundResult,
	getRoundResultByRoundForTeacher,
	getRoundResultByIdAndStudentId,
} = RoundResultApi;
export default RoundResultApi;
