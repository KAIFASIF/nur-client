import api from "../config/api";

export const fetchAdminInvoices = (
  page: number,
  size: number,
  search: string | null,
  startDate: string,
  endDate: string
) => {
  return api.get(
    `/admin/invoices?search=${search}&page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`
  );
};

export const fetchBilledcart = (id: number) => {
  return api.get(`/admin/fetchBillWithCart/${id}`);
};
