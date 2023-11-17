import { axiosClientPrivate } from "./axiosClient";

const url = "/rounds";
const RoundApi = {
  getRounds: () => axiosClientPrivate.get(`${url}`),
  createRound: (round) => axiosClientPrivate.post(`${url}`, round),
};
export const { createRound, getRounds } = RoundApi;
export default RoundApi;
