import React, { useEffect, useState } from "react";
import ItemcodeModal from "./ItemcodeModal";
import CartTable from "./CartTable";
import Button from "../../../components/Button";
import ThermalBillModal from "./ThermalBillModal";

import Bill from "./Bill";
import {
  createBill,
  fetchBillWithCart,
  fetchLastBillNo,
} from "../../../service/posService";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../../../recoil/authAtom";
import { FormProvider, useForm } from "react-hook-form";
import BillPreviewModal from "./BillPreviewModal";
import Layout from "../../../components/Layout";
import { useParams } from "react-router-dom";

const Pos = () => {
  const methods = useForm();
  const [auth,setAuth] = useRecoilState(authAtom);
  const{user, cart} =auth

  const { id } = useParams();
  const { setValue, getValues } = methods;
  const [cartItems, setCartItems] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [discountKey, setDiscountKey] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [isThermalBillModal, setIsThermalBillModal] = useState<boolean>(false);
  const [submitModal, setSubmitModal] = useState<boolean>(false);
  const [billno, setBillno] = useState<number>(0);
  const [pendingAmount, setPendingAmount] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [apiRes, setApiRes] = useState<any | {}>({});
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!id) {
      handleAmount();
      resetValues();
    }
  }, [cartItems]);

  useEffect(() => {
    if (id) {
      getBillWithCart();
    }
    getLastBillNo();
  }, []);

  const resetValues = () => {
    setValue("discount", "");
    setValue("amountPaid", "");
    setDiscountKey("");
    handleGrandTotal();
    setDiscountValue(0);
    setPendingAmount(handleGrandTotal());
  };

  const getBillWithCart = async () => {
    setLoader(true);
    try {
      const res = await fetchBillWithCart(user?.id, id);

      if (res?.status === 200 || 201) {
        const obj = res?.data?.Invoice;
        setCartItems(res?.data?.billcart);
        setAmount(obj?.amount);
        setDiscountValue(obj?.discount);
        setGrandTotal(obj?.grandTotal);
        setPendingAmount(obj?.pendingAmount);
        setValue("discount", obj?.discountKey);
        setValue("amountPaid", obj?.amountPaid);
        setValue("paymentMode", JSON.parse(obj?.paymentMode));
        setDisable(true);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  const getLastBillNo = async () => {
    setLoader(true);
    try {
      const res = await fetchLastBillNo(user?.id);
      if (res?.status === 200 || 201) {
        setBillno(res?.data?.billNo + 1);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const handleGrandTotal = () => {
    const totalValue = cartItems.reduce(
      (acc, ele) =>
        acc +
        (ele?.sellingPrice > 0
          ? ele?.sellingPrice * ele?.quantity
          : ele?.mrp * ele?.quantity || 0),
      0
    );
    setGrandTotal(totalValue);
    return totalValue;
  };
  const handleAmount = () => {
    const totalValue = cartItems.reduce(
      (acc, ele) =>
        acc +
        (ele?.sellingPrice > 0
          ? ele?.sellingPrice * ele?.quantity
          : ele?.mrp * ele?.quantity || 0),
      0
    );
    setAmount(totalValue);
  };

  const handleModalClose = () => {
    setSubmitModal(false);
  };

  return (
    <div className="flex flex-col  bg-white  p-10 justify-between w-full">
      <Layout
        loader={loader}
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      >
        <ItemcodeModal
          visible={visible}
          setVisible={setVisible}
          setCartItems={setCartItems}
          setDiscount={setDiscount}
          setLoader={setLoader}
          setMessage={setMessage}
          setSeverity={setSeverity}
          setOpen={setOpen}
          setAuth={setAuth}
        />

        <ThermalBillModal
          apiRes={apiRes}
          isThermalBillModal={isThermalBillModal}
          setIsThermalBillModal={setIsThermalBillModal}
        />

        <BillPreviewModal
          methods={methods}
          cartItems={cartItems}
          submitModal={submitModal}
          handleModalClose={handleModalClose}
          billno={billno}
          amount={amount}
          grandTotal={grandTotal}
          discountKey={discountKey}
          discountValue={discountValue}
          pendingAmount={pendingAmount}
          setApiRes={setApiRes}
          setSubmitModal={setSubmitModal}
          setIsThermalBillModal={setIsThermalBillModal}
          setMessage={setMessage}
          setSeverity={setSeverity}
          setOpen={setOpen}
          getLastBillNo={getLastBillNo}
          userId={user?.id}
          setLoader={setLoader}
          setDisable={setDisable}
        />

        <div className="flex  justify-end mb-2">
          <Button
            label="Add item"
            className="btn btn-primary-outline ml-2"
            onClick={() => setVisible(true)}
          />
        </div>

        <FormProvider {...methods}>
          <div>
            <CartTable
              cartItems={cartItems}
              setCartItems={setCartItems}
              setDiscount={setDiscount}
              setDisable={setDisable}
              setMessage={setMessage}
              setSeverity={setSeverity}
              setOpen={setOpen}
            />

            <div className="mt-10">
              {cartItems.length > 0 && (
                <Bill
                  methods={methods}
                  amount={amount}
                  grandTotal={grandTotal}
                  setGrandTotal={setGrandTotal}
                  setSubmitModal={setSubmitModal}
                  setMessage={setMessage}
                  setSeverity={setSeverity}
                  setOpen={setOpen}
                  pendingAmount={pendingAmount}
                  setPendingAmount={setPendingAmount}
                  discountValue={discountValue}
                  setDiscountValue={setDiscountValue}
                  setDiscountKey={setDiscountKey}
                  resetValues={resetValues}
                  disable={disable}
                />
              )}
            </div>
          </div>
        </FormProvider>
      </Layout>
    </div>
  );
};

export default React.memo(Pos);
