import { axiosClientPrivate } from "./axiosClient";

const url = "/judges";
const JudgesApi = {
  getJudgeByRound: (roundId) =>
    axiosClientPrivate.get(`${url}/round/${roundId}`),
  createJudges: (judges) => axiosClientPrivate.post(`${url}/multiple`, judges),
};
export const { createJudges, getJudgeByRound } = JudgesApi;
export default JudgesApi;
