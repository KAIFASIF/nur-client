import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RHFTextField from "../../libraries/form/RHFTextField";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom";

import Button from "../../components/Button";
import axios from "axios";
import Layout from "../../components/Layout";

const Signin = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const methods = useForm();
  const [loader, setLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: any) => {
    try {
      setLoader(true);
      const res = await axios.post("http://localhost:9090/signin", data);
      if (res?.status === 200) {
        localStorage.setItem("token", JSON.stringify(res?.data?.token));
        setAuth({ user: res?.data?.user, role: res?.data?.role, cart:[]});
        if (res?.data?.role === "ROLE_USER") navigate("/");
        else navigate("/admin-dashboard");
      }

      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      if (error?.response?.status === 404 || 406) {
        setMessage(error?.response?.data?.message);
        setSeverity("error");
        setOpen(true);
      }
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
      <FormProvider {...methods}>
        <div className="flex justify-center items-start h-screen bg-gray-100  p-10 sm:p-32 lg:p-2">
          <div className="w-full p-7 rounded-lg shadow-lg space-y-5 sm:p-10  lg:w-1/4  lg:mt-40  bg-white gap-4">
            <RHFTextField name="username" label="Username / Email" required />
            <RHFTextField
              name="password"
              label="Password"
              required
              type="password"
            />

            <div className="flex justify-center">
              <Button
                label="Submit"
                onClick={methods.handleSubmit(onSubmit)}
                className="btn btn-primary "
              />
            </div>
          </div>
        </div>
      </FormProvider>
    </Layout>
  );
};

export default React.memo(Signin);
