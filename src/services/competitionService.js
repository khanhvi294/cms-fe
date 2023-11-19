import { axiosClientPrivate } from "./axiosClient";

const url = "/competitions";
const CompetitionApi = {
  getCompetitions: () => axiosClientPrivate.get(`${url}`),
  createCompetition: (competition) =>
    axiosClientPrivate.post(`${url}`, competition),
  getAllClassCanJoinCompetition: (timeStart) =>
    axiosClientPrivate.get(`${url}/${timeStart}/join`),
  getCompetitionById: (id) => axiosClientPrivate.get(`${url}/${id}`),
};
export const {
  createCompetition,
  getCompetitions,
  getAllClassCanJoinCompetition,
  getCompetitionById,
} = CompetitionApi;
export default CompetitionApi;
