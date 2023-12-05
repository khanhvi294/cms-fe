import { axiosClientPrivate } from "./axiosClient";

const url = "/scores";
const scoreApi = {
  getScoreByRoundResult: (roundResultId) =>
    axiosClientPrivate.get(`${url}/roundresult/${roundResultId}`),
};
export const { getScoreByRoundResult } = scoreApi;
export default scoreApi;
