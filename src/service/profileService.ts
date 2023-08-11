import api from "../config/api";
import { userTypes } from "../utilities/types/cartItemsTypes";

export const fetchUser = (id: number) => {
  return api.get(`/fetch-user/${id}`);
}; 

export const updateUser = (data: userTypes) => {
  return api.put(`/update-user`, data);
};
