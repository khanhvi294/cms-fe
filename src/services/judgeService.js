import { axiosClientPrivate } from "./axiosClient";

const url = "/judges";
const JudgesApi = {
  getJudgeByRound: (roundId) =>
    axiosClientPrivate.get(`${url}/round/${roundId}`),
  createJudges: (judges) => axiosClientPrivate.post(`${url}/multiple`, judges),
  deleteJudgeInRound: (data) => {
    return axiosClientPrivate.delete(
      `${url}/${data.roundId}/employee/${data.employeeId}`
    );
  },
};
export const { createJudges, getJudgeByRound, deleteJudgeInRound } = JudgesApi;
export default JudgesApi;
