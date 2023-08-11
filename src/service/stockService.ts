import api from "../config/api";

// this api call is for saving or updating stock
export const saveStock = (
  userId: number,
  data: { id?: number; name: string }
) => {
  return api.post(`/admin/saveStock/${userId}`, data);
};
export const saveLastItemcode = (
  userId: number,
  data: { itemcode: string }
) => {
  return api.post(`/admin/saveLastItemcode/${userId}`, data);
};

export const fetchStocks = (userId: number, page: number, size: number) => {
  return api.get(`/admin/fetchStocks/${userId}?page=${page}&size=${size}`);
};

export const deleteStock = (userId: number, id: number) => {
  return api.delete(`/admin/deleteStock/${userId}/${id}`);
};

export const deleteAllStocks = (userId: number) => {
  return api.delete(`/admin/deleteAllStocks/${userId}`);
};

export const fetchAllSizes = (userId: number) => {
  return api.get(`/admin/fetchAllSizes/${userId}`);
};

export const fetchAllCategories = (userId: number) => {
  return api.get(`/admin/fetchAllCategories/${userId}`);
};

export const fetchLastItemcode = (userId: number) => {
  return api.get(`/admin/fetchLastItemcode/${userId}`);
};
