import React from "react";
import { fetchAdminInvoices } from "../../../service/adminInvoiceService";

export const getAdminInvoices = async (
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
    const res = await fetchAdminInvoices(
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
    setInvoices([])
    // setMessage("From date should not be more than from to date");
    //   setSeverity("error");
    //   setOpen(true);
    //   setLoader(false);
  }
};
