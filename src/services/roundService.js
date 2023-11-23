import { axiosClientPrivate } from "./axiosClient";

const url = "/rounds";
const RoundApi = {
  getRoundByCompetition: (competitionId) =>
    axiosClientPrivate.get(`${url}/${competitionId}/competition`),
  createRound: (round) => axiosClientPrivate.post(`${url}`, round),
  deleteRound: (id) => axiosClientPrivate.delete(`${url}/${id}`),
};
export const { createRound, getRoundByCompetition, deleteRound } = RoundApi;
export default RoundApi;
