import { axiosClientPrivate } from "./axiosClient";

const url = "/judges";
const JudgesApi = {
  getJudgeByRound: (roundId) =>
    axiosClientPrivate.get(`${url}/round${roundId}`),
  createRound: (round) => axiosClientPrivate.post(`${url}`, round),
};
export const { createRound, getJudgeByRound } = JudgesApi;
export default JudgesApi;
