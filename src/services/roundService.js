import { axiosClientPrivate } from "./axiosClient";

const url = "/rounds";
const RoundApi = {
  getRoundByCompetition: (competitionId) =>
    axiosClientPrivate.get(`${url}/${competitionId}/competition`),
  createRound: (round) => axiosClientPrivate.post(`${url}`, round),
};
export const { createRound, getRoundByCompetition } = RoundApi;
export default RoundApi;
