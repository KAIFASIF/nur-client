import React, { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import { FormProvider, useForm } from "react-hook-form";
import FilterSearch from "../../../components/FilterSearch";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../recoil/authAtom";
import { fetchTodaysDate } from "../../../utilities/dates";
import { getAdminInvoices } from "./utils";

const AdminInvoices = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { getValues, setValue } = methods;
  const { user } = useRecoilValue(authAtom);
  const [loader, setLoader] = useState<boolean>(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [invoices, setInvoices] = useState<any>([]);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    resetFilter();
  }, []);

  useEffect(() => {
    getAdminInvoices(
      page,
      size,
      getValues("search"),
      getValues("startDate"),
      getValues("endDate"),
      setLoader,
      setCount,
      setInvoices
    );
  }, [page, size]);

  const clearFilter = () => {
    setValue("search", "");
    setValue("startDate", "");
    setValue("endDate", "");
    setInvoices([]);
  };

  const resetFilter = () => {
    setValue("search", "");
    setValue("startDate", fetchTodaysDate());
    setValue("endDate", fetchTodaysDate());
    getAdminInvoices(
      0,
      10,
      "",
      fetchTodaysDate(),
      fetchTodaysDate(),
      setLoader,
      setCount,
      setInvoices
    );
  };

  const validateDates = () => {
    if (
      (getValues("search") === "" &&
        getValues("startDate") === "" &&
        getValues("endDate") !== "") ||
      (getValues("search") === "" &&
        getValues("startDate") !== "" &&
        getValues("endDate") === "") ||
      (getValues("search") === "" &&
        getValues("startDate") === "" &&
        getValues("endDate") === "")
    ) {
      setMessage("Please enter status or select  dates or both");
      setSeverity("error");
      setOpen(true);
      setLoader(false);
      return true;
    }

    const fromDate = new Date(getValues("startDate"));
    const toDate = new Date(getValues("endDate"));
    if (fromDate && toDate && fromDate > toDate) {
      setMessage("From date should not be more than from to date");
      setSeverity("error");
      setOpen(true);
      setLoader(false);
      return true;
    }
    return false;
  };

  const onSubmit = () => {
    // if (validateDates()) return;
    getAdminInvoices(
      0,
      10,
      getValues("search"),
      getValues("startDate"),
      getValues("endDate"),
      setLoader,
      setCount,
      setInvoices
    );
  };

  const handleRefresh = (newPage: number, newPageSize: number): any => {
    setPage(newPage);
    setSize(newPageSize);
  };
  return (
    <div className="w-full bg-white p-5">
      <Layout
        loader={loader}
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      >
        <FormProvider {...methods}>
          <div className="flex mt-10 mb-5">
            <FilterSearch
              placeholder="search by status or user"
              clearFilter={clearFilter}
              resetFilter={resetFilter}
              onSubmit={onSubmit}
            />
          </div>
        </FormProvider>

        <InvoiceTable
          data={invoices}
          count={count}
          size={size}
          handleRefresh={handleRefresh}
        />
      </Layout>
    </div>
  );
};

export default React.memo(AdminInvoices);
