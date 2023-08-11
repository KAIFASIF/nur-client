import api from "../config/api";

// this api call is for saving or updating category
export const saveCatgeory = (
  data: { id?: number; name: string },
  userId: number
) => {
  return api.post(`/admin/saveCategory/${userId}`, data);
};

export const fetchCategories = (userId: number, page: number, size: number) => {
  return api.get(`/admin/fetchCategories/${userId}?page=${page}&size=${size}`);
};

export const deleteCategory = (userId: number, id: number) => {
  return api.delete(`/admin/deleteCategory/${userId}/${id}`);
};

export const deleteAllCategories = (userId: number) => {
  return api.delete(`/admin/deleteAllCategories/${userId}`);
};
