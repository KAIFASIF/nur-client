import api from "../config/api";

export const fetchUserInvoices = (
  userId: number,
  page: number,
  size: number,
  search: string | null,
  startDate: string,
  endDate: string
) => {
  return api.get(
    `/user/invoices/${userId}?search=${search}&page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`
  );
};
