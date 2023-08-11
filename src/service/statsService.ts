import api from "../config/api";

export const fetchStats = (
  search: string,
  startDate: string,
  endDate: string
) => {
  return api.get(
    `/admin/fetchStats?search=${search}&startDate=${startDate}&endDate=${endDate}`
  );
};
