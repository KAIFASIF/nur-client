import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../recoil/authAtom";
import Layout from "../../../components/Layout";
import { delteUser, fetchUsers } from "../../../service/accountService";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import AddUser from "./AddUser";
import { userTypes } from "../../../utilities/types/cartItemsTypes";

const Account = () => {
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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [userObj, setUserObj] = useState<any>({});
  const [disable, setDisable] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchAllUsers();
  }, [page, pageSize]);

  const fetchAllUsers = async () => {
    try {
      setLoader(true);
      const res = await fetchUsers(user?.id, page, pageSize);
      if (res?.status === 200) {
        setData(res?.data?.users);
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

  const handleModalClose = () => {
    setUserObj({});
    setDisable(false);
    setVisible(false);
    setId(null);
  };

  const openDeleteModal = (newId: number) => {
    setId(newId);
    setDeleteModalOpen(true);
  };

  const updateModal = (ele: userTypes) => {
    setUserObj(ele);
    setVisible(true);
    setDisable(true);
  };
  const handleUserModal = () => {
    setVisible(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoader(true);
      const res = await delteUser(user?.id, id);
      if (res?.status === 200) {
        fetchAllUsers();
        setMessage("User deleted sucessfully");
        setSeverity("success");
        setOpen(true);
        setDeleteModalOpen(false);
        setId(null);
      }
      setLoader(false);
    } catch (err: any) {
      setLoader(false);
    }
  };

  return (
    <div className="w-full bg-white rounded  p-5">
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
          handleModalClose={handleDeleteModalClose}
        >
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-semibold flex self-right">
              Are you sure you want to delete this user
            </h1>

            <div className="flex  justify-center">
              <Button
                label="Delete"
                className="btn btn-secondary"
                onClick={handleDelete}
              />
            </div>
          </div>
        </Modal>

        <div className="p-10  flex justify-end">
          <Button
            label="Add User"
            className="btn btn-primary-outline"
            onClick={handleUserModal}
          />
        </div>
        <AddUser
          visible={visible}
          setVisible={setVisible}
          handleModalClose={handleModalClose}
          setLoader={setLoader}
          setMessage={setMessage}
          setSeverity={setSeverity}
          setOpen={setOpen}
          userObj={userObj}
          disable={disable}
          fetchAllUsers={fetchAllUsers}
          setUserObj={setUserObj}
          setDisable={setDisable}
        />
        <UsersTable
          data={data}
          count={count}
          pageSize={pageSize}
          handleRefresh={handleRefresh}
          deleteModal={openDeleteModal}
          updateModal={updateModal}
        />
      </Layout>
    </div>
  );
};

export default React.memo(Account);
