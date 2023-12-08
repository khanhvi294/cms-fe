import { axiosClientPrivate } from "./axiosClient";

const url = "/roundresults";
const RoundResultApi = {
  getRoundResultByRound: (roundId) =>
    axiosClientPrivate.get(`${url}/round/${roundId}`),
  getRoundResultByRoundForTeacher: (roundId) =>
    axiosClientPrivate.get(`${url}/teacher/round/${roundId}`),
  updateRoundResult: (data) => axiosClientPrivate.patch(`${url}`, data),
  checkStudentPassRound: (data) =>
    axiosClientPrivate.post(`${url}/check`, data),
};
export const {
  getRoundResultByRound,
  updateRoundResult,
  getRoundResultByRoundForTeacher,
  checkStudentPassRound,
} = RoundResultApi;
export default RoundResultApi;
