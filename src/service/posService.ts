import api from "../config/api";

export const fetchStockByItemcode = (itemcode: string) => {
  return api.get(`/user/stock/${itemcode}`);
};

export const fetchLastBillNo = (userId: number) => {
  return api.get(`/user/fetchLastBillNo/${userId}`);
};

export const createBill = (userId: number, data: any) => {
  return api.post(`/user/${userId}/createBill`, data);
};
export const fetchBillWithCart = (userId: number, id: any) => {
  return api.get(`/user/${userId}/fetchBillWithCart/${id}`);
};
