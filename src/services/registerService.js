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
  getRegisterByCompetition: (competitionId) => {
    return axiosClientPrivate.get(`${url}/competition/${competitionId}`);
  },
};
export const {
  registerCompetition,
  getAllCompetitionByStudentId,
  unRegisterCompetition,
  getRegisterByCompetition,
} = registersApi;
export default registersApi;
