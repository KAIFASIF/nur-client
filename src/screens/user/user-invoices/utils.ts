import React from "react";
import { fetchUserInvoices } from "../../../service/userInvoiceService";

export const getUserInvoices = async (
  userId: number,
  page: number,
  size: number,
  search: string | null,
  startDate: string,
  endDate: string,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  setInvoices: any
) => {
  setLoader(true);
  try {
    const res = await fetchUserInvoices(
      userId,
      page,
      size,
      search,
      startDate,
      endDate
    );
    if (res?.status === 200) {
      setCount(res?.data?.count);
      setInvoices(res?.data?.invoices);
    }
    setLoader(false);
  } catch (error: any) {
    setLoader(false);
  }
};
