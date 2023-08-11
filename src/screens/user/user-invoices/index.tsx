import React, { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import { fetchUserInvoices } from "../../../service/userInvoiceService";
import { FormProvider, useForm } from "react-hook-form";
import FilterSearch from "../../../components/FilterSearch";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../recoil/authAtom";
import { fetchTodaysDate } from "../../../utilities/dates";
import { getUserInvoices } from "./utils";

const UserInvoices = () => {
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
    setValue("search", null);
    setValue("startDate", fetchTodaysDate());
    setValue("endDate", fetchTodaysDate());
    getUserInvoices(
      user?.id,
      page,
      size,
      null,
      getValues("startDate"),
      getValues("endDate"),
      setLoader,
      setCount,
      setInvoices
    );
  }, []);
  useEffect(() => {   
    getUserInvoices(  
      user?.id,
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

  const clearFilters = () => {
    setValue("search", null);
    setValue("startDate", "");
    setValue("endDate", "");
    getUserInvoices(
      user?.id,
      0,
      10,
      null,
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
      setMessage("please select from dates");
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

  const handleSubmit = () => {
    if (validateDates()) return;
    getUserInvoices(
      user?.id,
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
    <div className="w-full bg-white p-5 ">
    <Layout
      loader={loader}
      open={open}
      message={message}
      severity={severity}
      handleClose={handleClose}
    >
      <FormProvider {...methods}>
        <div className="flex mt-10 mb-5">
          <FilterSearch clearFilters={clearFilters} onClick={handleSubmit} />
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

export default React.memo(UserInvoices);
