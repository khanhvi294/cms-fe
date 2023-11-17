import { axiosClientPrivate } from "./axiosClient";

const url = "/competitions";
const CompetitionApi = {
  getCompetitions: () => axiosClientPrivate.get(`${url}`),
  createCompetition: (competition) =>
    axiosClientPrivate.post(`${url}`, competition),
};
export const { createCompetition, getCompetitions } = CompetitionApi;
export default CompetitionApi;
