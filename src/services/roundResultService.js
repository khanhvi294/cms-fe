import { axiosClientPrivate } from "./axiosClient";

const url = "/roundresults";
const RoundResultApi = {
  getRoundResultByRound: (roundId) =>
    axiosClientPrivate.get(`${url}/round/${roundId}`),
};
export const { getRoundResultByRound } = RoundResultApi;
export default RoundResultApi;
