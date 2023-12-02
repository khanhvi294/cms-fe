import { axiosClientPrivate } from "./axiosClient";

const url = "/rounds";
const RoundApi = {
  getRoundByCompetition: (competitionId) =>
    axiosClientPrivate.get(`${url}/${competitionId}/competition`),
  createRound: (round) => axiosClientPrivate.post(`${url}`, round),
  updateRound: (round) => axiosClientPrivate.patch(`${url}`, round),
  deleteRound: (id) => axiosClientPrivate.delete(`${url}/${id}`),
  getRoundById: (id) => axiosClientPrivate.get(`${url}/${id}`),
};
export const {
  createRound,
  getRoundByCompetition,
  deleteRound,
  updateRound,
  getRoundById,
} = RoundApi;
export default RoundApi;
