import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import RHFTextField from "../../../libraries/form/RHFTextField";
import {
  emailRegx,
  mobileRegx,
  nameNumRegx,
  nameRegx,
} from "../../../utilities/regex";
import RHFSelectField from "../../../libraries/form/RHFSelectField";
import RHFRadioField from "../../../libraries/form/RHFRadioField";
import Modal from "../../../components/Modal";
import { addNewUser } from "../../../service/accountService";
import { userTypes } from "../../../utilities/types/cartItemsTypes";
import { optionProps } from "../../../utilities/types";
import { authorizedOptions, genderOptions, rolesOptions } from "../../../utilities/options";

interface addUserProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalClose: () => void;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userObj: userTypes;
  disable: boolean;
  fetchAllUsers: () => void;
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
  setUserObj: any;
}
[];

const AddUser: React.FC<addUserProps> = ({
  visible,
  setVisible,
  handleModalClose,
  setLoader,
  setSeverity,
  setMessage,
  setOpen,
  userObj,
  disable,
  fetchAllUsers,
  setUserObj,
  setDisable,
}) => {
  const methods = useForm();
  const { reset, register, setValue } = methods;

  useEffect(() => {
    setValue("password", "");
    if (userObj && Object.keys(userObj).length > 0) {
      for (let [key, val] of Object.entries(userObj)) {
        setValue(key, val);
      }
    } else {
      reset();
    }
  }, [userObj]);

 

  const validateFields = (data: userTypes) => {
    if (!data?.id && data?.password !== data?.confirmPassword) {
      setMessage("password did not match");
      setSeverity("error");
      setOpen(true);

      return false;
    }
    return true;
  };

  const onSubmit = async (data: any) => {
    const newData: userTypes = {
      ...data,
      isAuthorized: data?.isAuthorized === "Yes" ? true : false,
    };

    if (!validateFields(newData)) return;

    console.log(newData);
    try {
      setLoader(true);
      const res = await addNewUser(newData);
      if (res?.status === 201) {
        setMessage(
          newData?.id
            ? "User updated sucessfully"
            :"New user created sucessfully"
        );
        setSeverity("success");
        setOpen(true);
        setVisible(false);
        fetchAllUsers();
        setUserObj({});
        setDisable(false);
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
    <Modal
      visible={visible}
      modalSize="w-[40%]"
      handleModalClose={handleModalClose}
    >
      <FormProvider {...methods}>
        <input hidden {...register("id")} />
        <div className="grid grid-cols-2 gap-4 p-5">
          {!disable && (
            <>
              <RHFTextField
                label="Enter fullname"
                name="fullname"
                pattern={nameRegx}
                required
                disabled={disable}
              />
              <RHFTextField
                label="Enter username"
                name="username"
                pattern={nameNumRegx}
                required
                disabled={disable}
              />
              <RHFTextField
                label="Enter email"
                name="email"
                pattern={emailRegx}
                required
                disabled={disable}
              />
              <RHFTextField
                label="Enter Mobile"
                name="mobile"
                pattern={mobileRegx}
                required
                disabled={disable}
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
                disabled={disable}
              />
            </>
          )}
          <RHFSelectField
            label="Select role"
            name="role"
            required
            defaultValue="ROLE_USER"
            options={rolesOptions}
          />
          <RHFSelectField
            label="Select Authorized"
            name="isAuthorized"
            defaultValue="Yes"
            required
            options={authorizedOptions}
          />
          {!disable && (
            <RHFRadioField
              label="Select gender"
              name="gender"
              required
              row
              options={genderOptions}
              disabled={disable}
            />
          )}
        </div>

        <div className="flex justify-center">
          <Button
            label="Submit"
            className="btn  btn-primary  mt-5"
            onClick={methods.handleSubmit(onSubmit)}
          />
        </div>
      </FormProvider>
    </Modal>
  );
};

export default React.memo(AddUser);
