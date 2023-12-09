import { axiosClientPrivate } from './axiosClient';

const url = '/competitions';
const CompetitionApi = {
	getCompetitions: () => axiosClientPrivate.get(`${url}`),
	createCompetition: (competition) =>
		axiosClientPrivate.post(`${url}`, competition),
	getAllClassCanJoinCompetition: (timeStart) =>
		axiosClientPrivate.get(`${url}/${timeStart}/join`),
	getAllClassCanJoinCompetitionUpdate: (id) =>
		axiosClientPrivate.get(`${url}/${id}/classjoin`),
	getCompetitionById: (id) => axiosClientPrivate.get(`${url}/${id}`),
	getAllClassJoinCompetition: (id) =>
		axiosClientPrivate.get(`${url}/${id}/allclass`),
	deleteClassCompetition: (data) =>
		axiosClientPrivate.delete(
			`${url}/${data.competitionId}/class/${data.classId}`,
		),
	updateCompetition: (competition) =>
		axiosClientPrivate.patch(`${url}`, competition),
	addClassToCompetition: (data) =>
		axiosClientPrivate.post(`${url}/class/add`, data),
	getCompetitionResultByIdAndStudentId: (data) =>
		axiosClientPrivate.get(`${url}/${data.id}/result/${data.studentId}`),
};
export const {
	createCompetition,
	getCompetitions,
	getAllClassCanJoinCompetition,
	getCompetitionById,
	getAllClassJoinCompetition,
	deleteClassCompetition,
	getAllClassCanJoinCompetitionUpdate,
	updateCompetition,
	addClassToCompetition,
	getCompetitionResultByIdAndStudentId,
} = CompetitionApi;
export default CompetitionApi;
