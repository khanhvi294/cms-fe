import { axiosClientPrivate } from "./axiosClient";

const url = "/competitions";
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
      `${url}/${data.competitionId}/class/${data.classId}`
    ),
  // updateCompetition: (competition) => axiosClientPrivate.patch()
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
} = CompetitionApi;
export default CompetitionApi;
