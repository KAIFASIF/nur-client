import React, { useEffect } from "react";
import Modal from "../../../components/Modal";
import RHFTextField from "../../../libraries/form/RHFTextField";
import { FormProvider, useForm } from "react-hook-form";
import { amountRegx, numRegx, onlyCharRegx } from "../../../utilities/regex";
import Button from "../../../components/Button";
import { saveLastItemcode, saveStock } from "../../../service/stockService";
import RHFSelectField from "../../../libraries/form/RHFSelectField";

interface createStockProps {
  itemcode: string;
  sizes: { id: number; label: string; value: string }[] | [];
  categories: { id: number; label: string; value: string }[] | [];
  userId: React.Dispatch<React.SetStateAction<number>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllStocks: () => void;
  getItemcode: () => void;
  stockObj: any;
  setStockobj: React.Dispatch<React.SetStateAction<any>>;
}
const CreateStock: React.FC<createStockProps> = ({
  itemcode,
  sizes,
  categories,
  userId,
  visible,
  setVisible,
  setLoader,
  setOpen,
  setSeverity,
  setMessage,
  fetchAllStocks,
  getItemcode,
  stockObj,
  setStockobj,
}) => {
  const methods = useForm();
  const { setValue } = methods;

  useEffect(() => {
    if (Object.keys(stockObj).length > 0) {
      for (let [key, value] of Object.entries(stockObj)) {
        setValue(key, value);
      }
    } else {
      setValue("id", "");
      setValue("itemcode", itemcode);
    }
  }, [itemcode, stockObj]);

  const returnItemCode = (data: any) => {
    if (Object.keys(stockObj).length > 0) {
      return (
        data?.category.substring(0, 2).toUpperCase() +
        data?.itemcode.match(/\d+/g)[0] +
        data?.size.substring(0, 2).toUpperCase()
      );
    }
    return (
      data?.category.substring(0, 2).toUpperCase() +
      (parseInt(data?.itemcode) + 1) +
      data?.size.substring(0, 2).toUpperCase()
    );
  };
  const handleModalClose = () => {
    setStockobj({});
    setVisible(false);
  };

  const handleSubmit = async (data: any) => {
    const updatedData = {
      ...data,
      purchasedQuantity: parseInt(data?.purchasedQuantity),
      availableQuantity: parseInt(data?.purchasedQuantity),
      purchasedPrice: parseInt(data?.purchasedPrice),
      mrp: parseInt(data?.mrp),
      itemcode: returnItemCode(data),
    };
    try {
      setLoader(true);
      const res = await saveStock(userId, updatedData);
      if (res?.status === 201 || 200) {
        setMessage("Stock added or updated");
        setSeverity("success");
        setOpen(true);
        setVisible(false);
        fetchAllStocks();
        setStockobj({});
        getItemcode();
      }
      setLoader(false);
    } catch (err: any) {
      setLoader(false);
      setVisible(false);
    }
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
          <input {...methods.register("itemcode")} hidden />
          <div className="grid grid-cols-2 gap-2">
            <RHFSelectField
              label="Select category"
              name="category"
              options={categories}
              required
              defaultValue=""
            />
            <RHFSelectField
              label="Select size"
              name="size"
              options={sizes}
              required
              defaultValue=""
            />

            <RHFTextField
              label="Enter purchased price"
              name="purchasedPrice"
              pattern={amountRegx}
              required
              autoFocus
            />
            <RHFTextField
              label="Enter purchased quantity"
              name="purchasedQuantity"
              pattern={amountRegx}
              required
              autoFocus
            />
            <RHFTextField
              label="Enter mrp"
              name="mrp"
              pattern={amountRegx}
              required
              autoFocus
            />
          </div>
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

export default React.memo(CreateStock);
