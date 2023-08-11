import React, { useEffect } from "react";
import Button from "../../../components/Button";
import RHFTextField from "../../../libraries/form/RHFTextField";
import RHFSelectField from "../../../libraries/form/RHFSelectField";
import { amountRegx } from "../../../utilities/regex";

interface paymentModeProps {
  id: number;
  label: string;
  value: string | number | boolean;
}
[];

interface billProps {
  methods: any;
  amount: number;
  grandTotal: number;
  setGrandTotal: React.Dispatch<React.SetStateAction<number>>;
  setSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pendingAmount: number;
  setPendingAmount: React.Dispatch<React.SetStateAction<number>>;
  discountValue: number;
  setDiscountValue: React.Dispatch<React.SetStateAction<number>>;
  setDiscountKey: React.Dispatch<React.SetStateAction<string>>;
  resetValues: () => void;
  disable: boolean;
}
const Bill: React.FC<billProps> = ({
  methods,
  amount,
  grandTotal,
  setGrandTotal,
  setSubmitModal,
  setMessage,
  setSeverity,
  setOpen,
  pendingAmount,
  setPendingAmount,
  discountValue,
  setDiscountValue,
  setDiscountKey,
  resetValues,
  disable,
}) => {
  const { setValue, getValues, clearErrors } = methods;

  const paymentModeOptions: paymentModeProps = [
    { id: 1, label: "Cash", value: "cash" },
    { id: 2, label: "Card", value: "card" },
    { id: 3, label: "Upi", value: "upi" },
  ];

  const handleAmountPaid = (e: any) => {
    clearErrors("amountPaid");
    const val = e.target.value;
    if (val.length === 0) {
      resetValues();
      return;
    } else if (parseInt(val) > grandTotal) {
      resetValues();
      setMessage("Amount paid is more than  grand total");
      setSeverity("error");
      setOpen(true);
      return;
    } else {
      setValue("amountPaid", parseInt(val));
      setPendingAmount(grandTotal - parseInt(val));
    }
  };

  const handleDiscount = (e: any) => {
    setValue("amountPaid", "");
    const value = e.target.value;
    if (value.length === 0) {
      resetValues();
    } else if (parseInt(value) > grandTotal) {
      resetValues();
      setMessage("Discount should not be more than amount");
      setSeverity("error");
      setOpen(true);
    } else if (value.includes("%")) {
      const updatedValue = parseInt(value.replace(/[^0-9.]/g, ""));
      const val = (amount * updatedValue) / 100;
      setValue("discount", value);
      setDiscountKey(value);
      setDiscountValue(val);
      setGrandTotal(amount - val);
      setPendingAmount(amount - val);
    } else {
      setValue("discount", value);
      setDiscountValue(parseInt(value));
      setDiscountKey(`flat ${value}`);
      setGrandTotal(parseInt(amount - parseInt(value)));
      setPendingAmount(parseInt(amount - parseInt(value)));
    }
  };

  const handleValidations = () => {
    if (grandTotal < 0 || pendingAmount < 0) {
      setMessage("Pending amount or grand total should not be negative");
      setSeverity("error");
      setOpen(true);
      return true;
    }
    return false;
  };

  const onSubmit = () => {
    if (handleValidations()) return;
    setSubmitModal(true);
  };

  return (
    <div className="flex  justify-between items-center  ">
      <div className="flex gap-5 justify-end p-2  ml-5">
        <h1 className="text-md font-semibold text-gray-400">
          Amount :{" "}
          <span className="text-lg font-semibold text-black"> {amount}</span>
        </h1>
        <h1 className="text-md font-semibold text-gray-400">
          DiscountValue :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            {discountValue}
          </span>
        </h1>

        <h1 className="text-md font-semibold text-gray-400">
          Grand total :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            {grandTotal}
          </span>
        </h1>
        <h1 className="text-md font-semibold text-gray-400">
          Pending Amount :{" "}
          <span className="text-lg font-semibold text-black">
            {" "}
            {pendingAmount}
          </span>
        </h1>
      </div>

      <div className="flex gap-2 justify-end p-2 w-[60%]">
        <RHFTextField
          placeholder="discount"
          name="discount"
          onChange={handleDiscount}
          disabled={disable}
        />
        <RHFTextField
          name="amountPaid"
          placeholder="Amount to be paid"
          pattern={amountRegx}
          required
          onChange={handleAmountPaid}
          disabled={disable}
        />
        <RHFSelectField
          name="paymentMode"
          options={paymentModeOptions}
          multiple
          required
          defaultValue={["card"]}
          disabled={disable}
        />
        <div className="flex  ml-5">
          <Button
            label="Submit"
            className="btn btn-primary large mt-5"
            onClick={methods.handleSubmit(onSubmit)}
            disabled={disable}
          />
        </div>
      </div>
    </div>
  );
};

export default Bill;
