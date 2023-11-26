import { axiosClientPrivate } from "./axiosClient";

const url = "/registers";
const registersApi = {
  registerCompetition: (competitionId) => {
    return axiosClientPrivate.post(`${url}`, { competitionId: competitionId });
  },
  getAllCompetitionByStudentId: () => {
    return axiosClientPrivate.get(`${url}/all/student`);
  },
  unRegisterCompetition: (competitionId) => {
    return axiosClientPrivate.delete(`${url}/${competitionId}`);
  },
};
export const {
  registerCompetition,
  getAllCompetitionByStudentId,
  unRegisterCompetition,
} = registersApi;
export default registersApi;
