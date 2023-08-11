import React, { useEffect, useState } from "react";
import SizeTable from "./SizeTable";
import Button from "../../../components/Button";
import CreateSize from "./CreateSize";
import Layout from "../../../components/Layout";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../recoil/authAtom";
import {
  deleteAllSizes,
  deleteSize,
  fetchSizes,
} from "../../../service/sizeService";

import Modal from "../../../components/Modal";
import { eleProps } from "../../../utilities/types";

const Size = () => {
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
  const [id, setId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [sizeObj, setSizeObj] = useState<eleProps | {}>({});

  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchAllSizes();
  }, [page, pageSize]);

  const handleSizeModal = () => {
    setVisible(true);
  };

  const fetchAllSizes = async () => {
    try {
      const res = await fetchSizes(user?.id, page, pageSize);
      if (res?.status === 200) {
        setData(res?.data?.sizes);
        setCount(res?.data?.count);
      }
    } catch (err: any) {}
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
    setSizeObj(ele);
    setVisible(true);
  };

  const handleDelete = () => {
    if (id) {
      handleDeleteSize(id);
    } else {
      setId(null);
      handleDeleteAllSizes();
    }
  };

  const handleDeleteSize = async (newId: number) => {
    setLoader(true);
    try {
      const res = await deleteSize(user?.id, newId);
      if (res?.status === 200) {
        setId(null);
        setMessage(res?.data);
        setSeverity("success");
        setOpen(true);
        fetchAllSizes();
        setDeleteModalOpen(false);
      }

      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  const handleDeleteAllSizes = async () => {
    try {
      setLoader(true);
      const res = await deleteAllSizes(user?.id);
      if (res?.status === 200) {
        setMessage(res?.data);
        setSeverity("success");
        setOpen(true);
        fetchAllSizes();
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
    <div className="flex justify-center w-full bg-white rounded">
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
          <CreateSize
            sizeObj={sizeObj}
            visible={visible}
            userId={user?.id}
            setVisible={setVisible}
            setLoader={setLoader}
            setMessage={setMessage}
            setSeverity={setSeverity}
            setOpen={setOpen}
            fetchAllSizes={fetchAllSizes}
          />

          <div className="p-10  flex justify-end">
            <Button
              label="Add Size"
              className="btn btn-primary-outline"
              onClick={handleSizeModal}
            />

            {data.length > 0 && (
              <Button
                label="Delete all"
                className="btn btn-secondary-outline ml-2"
                onClick={() =>
                  deleteModal(null, "Are you sure you want to delete all sizes")
                }
              />
            )}
          </div>

          <SizeTable
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

export default React.memo(Size);
