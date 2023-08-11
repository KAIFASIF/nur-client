import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../recoil/authAtom";
import Modal from "../../../components/Modal";
import {
  deleteAllCategories,
  deleteCategory,
  fetchCategories,
} from "../../../service/categoryService";
import CreateCategory from "./CreateCategory";
import CategoryTable from "./CategoryTable";
import { eleProps } from "../../../utilities/types";

const Category = () => {
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
  const [categoryObj, setCategoryObj] = useState<eleProps | {}>({});
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchAllCategories();
  }, [page, pageSize]);

  const handleCategoryModal = () => {
    setVisible(true);
  };

  const fetchAllCategories = async () => {
    try {
      const res = await fetchCategories(user?.id, page, pageSize);
      if (res?.status === 200) {
        setData(res?.data?.categories);
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
    setCategoryObj(ele);
    setVisible(true);
  };

  const handleDelete = () => {
    if (id) {
      handleDeleteCategory(id);
    } else {
      setId(null);
      handleDeleteAllCategories();
    }
  };

  const handleDeleteCategory = async (newId: number) => {
    setLoader(true);
    try {
      const res = await deleteCategory(user?.id, newId);
      if (res?.status === 200) {
        setId(null);
        setMessage(res?.data);
        setSeverity("success");
        setOpen(true);
        fetchAllCategories();
        setDeleteModalOpen(false);
      }

      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  const handleDeleteAllCategories = async () => {
    try {
      setLoader(true);
      const res = await deleteAllCategories(user?.id);
      if (res?.status === 200) {
        setMessage(res?.data);
        setSeverity("success");
        setOpen(true);
        fetchAllCategories();
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
          setVisible={setDeleteModalOpen}
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
          <CreateCategory
            categoryObj={categoryObj}
            visible={visible}
            userId={user?.id}
            setVisible={setVisible}
            setLoader={setLoader}
            setMessage={setMessage}
            setSeverity={setSeverity}
            setOpen={setOpen}
            fetchAllCategories={fetchAllCategories}
          />

          <div className="p-10  flex justify-end">
            <Button
              label="Add category"
              className="btn btn-primary-outline"
              onClick={handleCategoryModal}
            />

            {data.length > 0 && (
              <Button
                label="Delete all"
                className="btn btn-secondary-outline ml-2"
                onClick={() =>
                  deleteModal(
                    null,
                    "Are you sure you want to delete all categories"
                  )
                }
              />
            )}
          </div>
          <CategoryTable
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

export default React.memo(Category);
