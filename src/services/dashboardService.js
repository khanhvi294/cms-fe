import { axiosClientPrivate } from "./axiosClient";

const url = "/dashboard";
const DashboardApi = {
    getOverviewAll: () => axiosClientPrivate.get(`${url}/overview/all`),

};
export const { getOverviewAll } =
  DashboardApi;
export default DashboardApi;
