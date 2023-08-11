import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import Layout from "../../components/Layout";

import { userTypes } from "../../utilities/types/cartItemsTypes";
import { fetchUser } from "../../service/profileService";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";

const Profile = () => {
  const auth = useRecoilValue(authAtom);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [user, setUser] = useState<userTypes | {}>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoader(true);
    try {
      const res = await fetchUser(auth?.user?.id);
      if (res?.status === 200) {
        setUser(res?.data);
      }
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      if (error?.response?.status === 404 || 406) {
        setMessage(error?.response?.data);
        setSeverity("error");
        setOpen(true);
      }
    }
  };

  return (
    <div className="p-5 w-full  flex justify-center">
      <Layout
        loader={loader}
        message={message}
        severity={severity}
        open={open}
        handleClose={handleClose}
      >
        {isEdit ? (
          <ViewProfile user={user} setIsEdit={setIsEdit} />
        ) : (
          <EditProfile
            user={user}
            setUser={setUser}
            setIsEdit={setIsEdit}
            setLoader={setLoader}
            setMessage={setMessage}
            setSeverity={setSeverity}
            setOpen={setOpen}
          />
        )}
      </Layout>
    </div>
  );
};

export default React.memo(Profile);
