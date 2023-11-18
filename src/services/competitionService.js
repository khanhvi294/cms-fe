import { axiosClientPrivate } from "./axiosClient";

const url = "/competitions";
const CompetitionApi = {
  getCompetitions: () => axiosClientPrivate.get(`${url}`),
  createCompetition: (competition) =>
    axiosClientPrivate.post(`${url}`, competition),
  getAllClassCanJoinCompetition: (id) =>
    axiosClientPrivate.get(`${url}/${id}/join`),
};
export const {
  createCompetition,
  getCompetitions,
  getAllClassCanJoinCompetition,
} = CompetitionApi;
export default CompetitionApi;
