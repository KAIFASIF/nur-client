import React, { useEffect } from "react";
import { userTypes } from "../../utilities/types/cartItemsTypes";
import RHFTextField from "../../libraries/form/RHFTextField";
import Button from "../../components/Button";
import {
  emailRegx,
  mobileRegx,
  nameNumRegx,
  nameRegx,
} from "../../utilities/regex";
import { FormProvider, useForm } from "react-hook-form";
import { updateUser } from "../../service/profileService";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface editProfileProps {
  user: userTypes;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<userTypes>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProfile: React.FC<editProfileProps> = ({
  user,
  setIsEdit,
  setUser,
  setLoader,
  setMessage,
  setSeverity,
  setOpen,
}) => {
  const methods = useForm();
  const { setValue, register } = methods;

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      for (let [key, value] of Object.entries(user)) {
        setValue(key, value);
      }
    }
  }, [user]);

  const validateFields = (data: userTypes) => {
    if (data?.password !== data?.confirmPassword) {
      setMessage("password did not match");
      setSeverity("error");
      setOpen(true);
      return false;
    }
    return true;
  };

  const onSubmit = async (data: any) => {
    if (!validateFields(data)) return;
    const newData = { ...data, mobile: parseInt(data?.mobile) };
    try {
      setLoader(true);
      const res = await updateUser(newData);
      if (res?.status === 200) {
        setUser(res?.data);
        setMessage("User updated sucessfully");
        setSeverity("success");
        setOpen(true);
        setIsEdit(true);
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
    <div className=" bg-white flex flex-col rounded  p-5 w-full">
      <div
        className="flex justify-end  cursor-pointer"
        onClick={() => setIsEdit(true)}
      >
        <AiOutlineInfoCircle className=" text-green-600 text-2xl font-light ml-4" />
      </div>
      <div className=" bg-white flex flex-col justify-center  rounded  items-center w-full">
        <FormProvider {...methods}>
          <input hidden {...register("id")} />
          <input hidden {...register("role")} />
          <input hidden {...register("isAuthorized")} />
          <input hidden {...register("gender")} />
          <div className="grid grid-cols-2 gap-4 p-5">
            <RHFTextField
              label="Enter fullname"
              name="fullname"
              pattern={nameRegx}
              required
            />
            <RHFTextField
              label="Enter username"
              name="username"
              pattern={nameNumRegx}
              required
            />
            <RHFTextField
              label="Enter email"
              name="email"
              pattern={emailRegx}
              required
            />
            <RHFTextField
              label="Enter Mobile"
              name="mobile"
              pattern={mobileRegx}
              required
            />

            <RHFTextField
              label="Enter password"
              name="password"
              required
              type="password"
            />
            <RHFTextField
              type="password"
              label="Enter confirm password"
              name="confirmPassword"
              required
            />
          </div>

          <div className="flex justify-center">
            <Button
              label="Submit"
              className="btn  btn-primary  mt-5"
              onClick={methods.handleSubmit(onSubmit)}
            />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default React.memo(EditProfile);
