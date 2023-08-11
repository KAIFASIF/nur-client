import React, { useState } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { generateCurrentTime, todaysDate } from "../../../utilities/utils";
import { createBill } from "../../../service/posService";

interface billPreviewModalProps {
  methods: any;
  cartItems: any;
  submitModal: boolean;
  handleModalClose: () => void;
  billno: number;
  amount: number;
  grandTotal: number;
  discountKey: string;
  discountValue: number | "";
  pendingAmount: number;
  setApiRes: React.Dispatch<React.SetStateAction<any>>;
  setSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThermalBillModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getLastBillNo: () => void;
  userId: number;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillPreviewModal: React.FC<billPreviewModalProps> = ({
  methods,
  cartItems,
  submitModal,
  handleModalClose,
  billno,
  amount,
  grandTotal,
  discountKey,
  discountValue,
  pendingAmount,
  setApiRes,
  setSubmitModal,
  setIsThermalBillModal,
  setMessage,
  setSeverity,
  setOpen,
  getLastBillNo,
  userId,
  setLoader,
  setDisable
}) => {
  const { getValues } = methods;

  const previewData = {
    Amount: amount,
    "Discount value":
      getValues("discount") && getValues("discount").includes("%")
        ? discountValue
        : parseInt(getValues("discount"))
        ? parseInt(getValues("discount"))
        : 0,
    "Grand total": grandTotal,
    "Amount paid": parseInt(getValues("amountPaid")),
    "Pending amount": pendingAmount,
    "Payment mode":"define",
    Status: pendingAmount > 0 ? "pending" : "paid",
  };

  const constructBillcart = () => {
    const billcart = cartItems.map((ele: any) => {
      const { itemcode, category, size, mrp, sellingPrice, quantity, amount } =
        ele;
      return {
        itemcode,
        category,
        size,
        mrp,
        sellingPrice,
        quantity,
        amount,
      };
    });
    return billcart;
  };

  const onSubmit = async () => {
    setLoader(true);
    const billcart = constructBillcart();
    const data = {
      billno,
      amount,
      grandTotal,
      billcart,
      paymentMode: JSON.stringify(getValues("paymentMode")),
      time: generateCurrentTime(),
      discountKey,
      discount:
        getValues("discount") && getValues("discount").includes("%")
          ? discountValue
          : parseInt(getValues("discount"))
          ? parseInt(getValues("discount"))
          : 0,
      amountPaid: parseInt(getValues("amountPaid")),
      status: pendingAmount > 0 ? "pending" : "paid",
      pendingAmount,
    };
    try {
      const res = await createBill(userId, data);
      if (res?.status === 200 || 201) {
        await getLastBillNo();
        setApiRes(res?.data);
        setSubmitModal(false);
        setIsThermalBillModal(true);
        setMessage("Bill submitted successfully");
        setSeverity("success");
        setOpen(true);
        setDisable(true)
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <Modal
      visible={submitModal}
      modalSize="w-[20%]"
      handleModalClose={handleModalClose}
    >
      <div className="flex flex-col justify-center">
        <div className="mb-5 px-5 overflow-hidden">
          {Object.keys(previewData).length > 0 &&
            Object.entries(previewData).map(([key, val], index: number) => (
              <div className="flex justify-center mt-2" key={index}>
                <h1 className="text-lg font-semibold w-1/2"> {key}</h1>
                <h1
                  className={`text-lg font-semibold w-1/2 ${
                    val === "pending" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  : {val}
                </h1>
              </div>
            ))}
        </div>

        <h1 className="text-lg font-semibold flex self-right">
          Are you sure you want to submit and print this bill
        </h1>
        <div className="flex  justify-center">
          <Button
            label="Submit & print"
            className="btn btn-primary"
            onClick={onSubmit}           
          />
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(BillPreviewModal);
