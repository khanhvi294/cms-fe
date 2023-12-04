import { axiosClientPrivate } from "./axiosClient";

const url = "/roundresults";
const RoundResultApi = {
  getRoundResultByRound: (roundId) =>
    axiosClientPrivate.get(`${url}/round/${roundId}`),
  updateRoundResult: (data) => axiosClientPrivate.get(`${url}`, data),
};
export const { getRoundResultByRound, updateRoundResult } = RoundResultApi;
export default RoundResultApi;
