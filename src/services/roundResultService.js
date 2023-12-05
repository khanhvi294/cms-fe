import { axiosClientPrivate } from "./axiosClient";

const url = "/roundresults";
const RoundResultApi = {
  getRoundResultByRound: (roundId) =>
    axiosClientPrivate.get(`${url}/round/${roundId}`),
  getRoundResultByRoundForTeacher: (roundId) =>
    axiosClientPrivate.get(`${url}/teacher/round/${roundId}`),
  updateRoundResult: (data) => axiosClientPrivate.patch(`${url}`, data),
};
export const {
  getRoundResultByRound,
  updateRoundResult,
  getRoundResultByRoundForTeacher,
} = RoundResultApi;
export default RoundResultApi;
