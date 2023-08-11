import api from "../config/api";

// this api call is for saving or updating size
export const saveSize = (
  data: { id?: number; name: string },
  userId: number
) => {
  return api.post(`/admin/saveSize/${userId}`, data);
};

export const fetchSizes = (userId: number, page: number, size: number) => {
  return api.get(`/admin/fetchSizes/${userId}?page=${page}&size=${size}`);
};

export const deleteSize = (userId: number, id: number) => {
  return api.delete(`/admin/deleteSize/${userId}/${id}`);
};

export const deleteAllSizes = (userId: number) => {
  return api.delete(`/admin/deleteAllSizes/${userId}`);
};
