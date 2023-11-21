import { axiosClientPrivate } from "./axiosClient";

const url = "/registers";
const registersApi = {
  registerCompetition: (competitionId) => {
    return axiosClientPrivate.post(`${url}`, { competitionId: competitionId });
  },
};
export const { registerCompetition } = registersApi;
export default registersApi;
