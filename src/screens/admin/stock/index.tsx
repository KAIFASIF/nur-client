import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../recoil/authAtom";
import Modal from "../../../components/Modal";
import {
  deleteAllStocks,
  deleteStock,
  fetchAllCategories,
  fetchAllSizes,
  fetchLastItemcode,
  fetchStocks,
} from "../../../service/stockService";
import StockTable from "./StockTable";
import CreateStock from "./CreateStock";

const Stock = () => {
  const { user } = useRecoilValue(authAtom);
  const [visible, setVisible] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [sizes, setSizes] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [id, setId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [itemcode, setItemcode] = useState<string>("");
  const [stockObj, setStockobj] = useState<any>({});

  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchAllStocks();
    getSizes();
    getCategories();
    getItemcode();
  }, [page, pageSize]);

  const handleStockModal = () => {
    setVisible(true);
  };

  const getItemcode = async () => {
    setLoader(true);
    try {
      const res = await fetchLastItemcode(user?.id);
      if (res?.status === 200) {
        setItemcode(res?.data?.lastItemcode);
      }
      setLoader(false);
    } catch (err: any) {
      setLoader(false);
    }
  };

  const getSizes = async () => {
    setLoader(true);
    try {
      const res = await fetchAllSizes(user?.id);
      if (res?.status === 200) {
        setSizes(
          res?.data.map((ele: any) => ({
            id: ele?.id,
            label: ele?.name,
            value: ele?.name,
          }))
        );
      }
      setLoader(false);
    } catch (err: any) {
      setLoader(false);
    }
  };

  const getCategories = async () => {
    setLoader(true);
    try {
      const res = await fetchAllCategories(user?.id);
      if (res?.status === 200) {
        setCategories(
          res?.data.map((ele: any) => ({
            id: ele?.id,
            label: ele?.name,
            value: ele?.name,
          }))
        );
      }
      setLoader(false);
    } catch (err: any) {
      setLoader(false);
    }
  };

  const fetchAllStocks = async () => {
    try {
      const res = await fetchStocks(user?.id, page, pageSize);
      if (res?.status === 200) {
        setData(res?.data?.stocks);
        setCount(res?.data?.count);
      }
      setLoader(false);
    } catch (err: any) {
      setLoader(false);
    }
  };

  const handleRefresh = (newPage: number, newPageSize: number): any => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const deleteModal = (id: number | null, message: string) => {
    setId(id);
    setMessage(message);
    setDeleteModalOpen(true);
  };

  const updateModal = (ele: eleProps) => {
    setStockobj(ele);
    setVisible(true);
  };

  const handleDelete = () => {
    if (id) {
      handleDeleteStock(id);
    } else {
      setId(null);
      handleDeleteAllStocks();
    }
  };

  const handleDeleteStock = async (newId: number) => {
    setLoader(true);
    try {
      const res = await deleteStock(user?.id, newId);
      if (res?.status === 200) {
        setId(null);
        setMessage(res?.data);
        setSeverity("success");
        setOpen(true);
        fetchAllStocks();
        setDeleteModalOpen(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const handleDeleteAllStocks = async () => {
    try {
      setLoader(true);
      const res = await deleteAllStocks(user?.id);
      if (res?.status === 200) {
        setMessage(res?.data);
        setSeverity("success");
        setOpen(true);
        fetchAllStocks();
        setDeleteModalOpen(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded">
      <Layout
        loader={loader}
        message={message}
        severity={severity}
        open={open}
        handleClose={handleClose}
      >
        <Modal
          visible={deleteModalOpen}
          modalSize="w-[20%]"
          handleModalClose={handleModalClose}
        >
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-semibold">{message}</h1>
            <div className="flex  justify-center">
              <Button
                label={id ? "Delete" : "Delete All"}
                className="btn btn-secondary"
                onClick={handleDelete}
              />
            </div>
          </div>
        </Modal>
        <div className="px-10">
          <CreateStock
            itemcode={itemcode}
            sizes={sizes}
            categories={categories}
            visible={visible}
            userId={user?.id}
            setVisible={setVisible}
            setLoader={setLoader}
            setMessage={setMessage}
            setSeverity={setSeverity}
            setOpen={setOpen}
            fetchAllStocks={fetchAllStocks}
            getItemcode={getItemcode}
            stockObj={stockObj}
            setStockobj={setStockobj}
          />

          <div className="p-10  flex justify-end">
            <Button
              label="Add stock"
              className="btn btn-primary-outline"
              onClick={handleStockModal}
            />

            {data.length > 0 && (
              <Button
                label="Delete all"
                className="btn btn-secondary-outline ml-2"
                onClick={() =>
                  deleteModal(
                    null,
                    "Are you sure you want to delete all stocks"
                  )
                }
              />
            )}
          </div>

          <StockTable
            data={data}
            count={count}
            pageSize={pageSize}
            handleRefresh={handleRefresh}
            deleteModal={deleteModal}
            updateModal={updateModal}
          />
        </div>
      </Layout>
    </div>
  );
};

export default React.memo(Stock);
