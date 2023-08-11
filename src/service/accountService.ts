import api from "../config/api";
import { userTypes } from "../utilities/types/cartItemsTypes";

export const addNewUser = (data: userTypes) => {
  return api.post(`/admin/signup`, data);
};

export const fetchUsers = (userId: number, page: number, size: number) => {
  return api.get(`/admin/fetchUsers/${userId}?page=${page}&size=${size}`);
};

export const delteUser = (userId: number, id: number) => {
  return api.delete(`/admin/deleteUser/${userId}/${id}`);
};
