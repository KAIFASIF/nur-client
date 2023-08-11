import React, { useEffect } from "react";
import Modal from "../../../components/Modal";
import RHFTextField from "../../../libraries/form/RHFTextField";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { saveSize } from "../../../service/sizeService";
import { eleProps } from "../../../utilities/types";

interface createSizeProps {
  sizeObj: eleProps;
  userId: React.Dispatch<React.SetStateAction<number>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllSizes: () => void;
}
const CreateSize: React.FC<createSizeProps> = ({
  sizeObj,
  userId,
  visible,
  setVisible,
  setLoader,
  setOpen,
  setSeverity,
  setMessage,
  fetchAllSizes,
}) => {
  const methods = useForm();
  const { setValue } = methods;

  useEffect(() => {
    if (Object.keys(sizeObj).length > 0) {
      for (let [key, value] of Object.entries(sizeObj)) {
        setValue(key, value);
      }
    }
  }, [sizeObj]);

  const handleSubmit = async (data: any) => {
    try {
      const updatedData = {
        ...data,
        brief: data.name.substring(0, 2).toUpperCase(),
      };
      setLoader(true);
      const res = await saveSize(updatedData, userId);
      if (res?.status === 201 || 200) {
        setMessage("Size added or updated");
        setSeverity("success");
        setOpen(true);
        setVisible(false);
        fetchAllSizes();
      }
      setLoader(false);
    } catch (err: any) {
      setVisible(false);
      setLoader(false);
      if (err?.response?.status === 400) {
        setMessage(err?.response?.data);
        setSeverity("error");
        setOpen(true);
      }
    }
  };

  const handleModalClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <Modal
        visible={visible}
        modalSize="w-[40%]"
        handleModalClose={handleModalClose}
      >
        <FormProvider {...methods}>
          <input {...methods.register("id")} hidden />
          <RHFTextField label="Enter Size" name="name" required autoFocus />
          <div className="flex justify-center">
            <Button
              label="Submit"
              className="btn  btn-primary  mt-5"
              onClick={methods.handleSubmit(handleSubmit)}
            />
          </div>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default React.memo(CreateSize);
