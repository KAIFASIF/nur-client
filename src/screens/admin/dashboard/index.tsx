import React, { useEffect, useState } from "react";
import Cards from "../../../components/Cards";
import Loader from "../../../components/Loader";
import { fetchStats } from "../../../service/statsService";
import FilterSearch from "../../../components/FilterSearch";
import { FormProvider, useForm } from "react-hook-form";
import { fetchTodaysDate } from "../../../utilities/dates";
import Layout from "../../../components/Layout";

const AdminDashboard = () => {
  const methods = useForm();
  const { setValue, getValues } = methods;
  const [data, setData] = useState<any>({});
  const [billDetailObj, setBillDetailObj] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    resetFilter();
  }, []);

  const clearFilter = () => {
    setValue("search", "");
    setValue("startDate", "");
    setValue("endDate", "");
    setData({});
  };

  const resetFilter = () => {
    setValue("search", "");
    setValue("startDate", fetchTodaysDate());
    setValue("endDate", fetchTodaysDate());
    getStats("", fetchTodaysDate(), fetchTodaysDate());
  };

  const getStats = async (
    newSearch: string,
    newStartDate: string,
    newEndDate: string
  ) => {
    try {
      setLoader(true);
      const res = await fetchStats(newSearch, newStartDate, newEndDate);
      if (res?.status === 200) {
        const { bills, ...obj } = res?.data;
        const discount = bills.reduce(
          (acc: any, cur: any) => acc + cur?.discount,
          0
        );
        const pendingAmount = bills.reduce(
          (acc: any, cur: any) => acc + cur?.pendingAmount,
          0
        );
        const amount = bills.reduce(
          (acc: any, cur: any) => acc + cur?.amount,
          0
        );
        const amountPaid = bills.reduce(
          (acc: any, cur: any) => acc + cur?.amountPaid,
          0
        );
        const grandTotal = bills.reduce(
          (acc: any, cur: any) => acc + cur?.grandTotal,
          0
        );
        console.log(obj);
        setData({
      ...obj,
          amount,
          discount,
          grandTotal,
          amountPaid,
          pendingAmount,
        });
        // setData(res?.data);
      }
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      setData({});
      if (error?.response?.status === 404) {
        setMessage(error?.response?.data);
        setSeverity("error");
        setOpen(true);
      }
    }
  };

  const onSubmit = () => {
    if (validateDates()) return;
    getStats(getValues("search"), getValues("startDate"), getValues("endDate"));
  };

  const validateDates = () => {
    const fromDate = new Date(getValues("startDate"));
    const toDate = new Date(getValues("endDate"));
    if (fromDate && toDate && fromDate > toDate) {
      setMessage("From date should not be more than from to date");
      setSeverity("error");
      setOpen(true);
      setLoader(false);
      return true;
    }
    
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
  };

  return (
    <Layout
      loader={loader}
      message={message}
      severity={severity}
      open={open}
      handleClose={handleClose}
    >
      <div className="w-full p-5 bg-white rounded overflow-hidden">
        <div className="flex mt-10 mb-5">
          <FormProvider {...methods}>
            <FilterSearch
              placeholder="search by status or user"
              clearFilter={clearFilter}
              resetFilter={resetFilter}
              onSubmit={onSubmit}
            />
          </FormProvider>
        </div>

        <div className="p-10  grid grid-cols-4 justify-center bg-gray-50 gap-10">
          {Object.keys(data).length > 0 &&
            Object.entries(data).map(([key, val]: any, index: number) => (
              <Cards key={index}>
                <div className=" flex flex-col justify-center overflow-y-visible">
                  <h1 className="text-5xl font-semibold flex self-center">
                    {" "}
                    {val}
                  </h1>
                  <h1 className="text-3xl mt-5 font-semibold flex self-center">
                    {" "}
                    {key}{" "}
                  </h1>
                </div>
              </Cards>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(AdminDashboard);
