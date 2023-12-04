import { axiosClientPrivate } from "./axiosClient";

const url = "/rounds";
const RoundApi = {
  getRoundByCompetition: (competitionId) =>
    axiosClientPrivate.get(`${url}/${competitionId}/competition`),
  createRound: (round) => axiosClientPrivate.post(`${url}`, round),
  updateRound: (round) => axiosClientPrivate.patch(`${url}`, round),
  deleteRound: (id) => axiosClientPrivate.delete(`${url}/${id}`),
  getRoundById: (id) => axiosClientPrivate.get(`${url}/${id}`),
  getRoundAlreadyStartByCompetition: (competitionId) =>
    axiosClientPrivate.get(`${url}/already/competition/${competitionId}`),
};
export const {
  createRound,
  getRoundByCompetition,
  deleteRound,
  updateRound,
  getRoundById,
  getRoundAlreadyStartByCompetition,
} = RoundApi;
export default RoundApi;
