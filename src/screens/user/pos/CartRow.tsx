import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TextField as MuiTextField } from "@mui/material";
import { cartItemsProps } from "../../../utilities/types/cartItemsTypes";
import { SlClose } from "react-icons/Sl";

interface cartRowProps {
  ele: cartItemsProps;
  setCartItems: React.Dispatch<React.SetStateAction<cartItemsProps[] | []>>;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartRow = ({
  ele,
  setCartItems,
  setDiscount,
  setDisable,
  setMessage,
  setSeverity,
  setOpen,
}: cartRowProps) => {
  const methods = useForm();

  const removeCartItem = (id: any) => {
    setCartItems((prev) =>
      prev.filter((ele: cartItemsProps) => ele?.id !== id)
    );
    setDiscount(0);
  };

  const updateSellingPrice = (e: any, itemcode: number) => {
    if (e.key === "Enter") {
      const updatedValue = +e.target.value;
      setCartItems((prev: cartItemsProps[]) =>
        prev.map((ele: cartItemsProps) =>
          ele?.itemcode === itemcode
            ? {
                ...ele,
                isEditQty: false,
                isEditSellingPrice: false,
                sellingPrice:
                  updatedValue < 0 ? ele?.sellingPrice : updatedValue,
                amount:
                  updatedValue > 0
                    ? updatedValue * ele?.quantity
                    : ele?.mrp * ele?.quantity,
              }
            : { ...ele, isEditQty: false, isEditSellingPrice: false }
        )
      );
      setDiscount(0);
      setDisable(false);
    }
  };

  const updateQuantity = (e: any, itemcode: number) => {
    if (e.key === "Enter") {
      const updatedValue = +e.target.value;

      if (updatedValue > ele?.availableQuantity) {
        setDisable(false);
        setMessage("Quantity not available is more");
        setSeverity("error");
        setOpen(true);
        setCartItems((prev) =>
          prev.map((ele: cartItemsProps) =>
            ele?.itemcode === itemcode
              ? {
                  ...ele,
                  isEditQty: false,
                  isEditSellingPrice: false,
                }
              : ele
          )
        );
        return;
      }
      setCartItems((prev) =>
        prev.map((ele: cartItemsProps) =>
          ele?.itemcode === itemcode && updatedValue > 0
            ? {
                ...ele,
                quantity: updatedValue,
                isEditQty: false,
                isEditSellingPrice: false,
                amount:
                  ele?.sellingPrice > 0
                    ? ele?.sellingPrice * updatedValue
                    : ele?.mrp * updatedValue,
              }
            : {
                ...ele,
                isEditQty: false,
                isEditSellingPrice: false,
              }
        )
      );
      setDiscount(0);
      setDisable(false);
    }
  };

  const editSellingPrice = (id: any) => {
    setDisable(true);
    setCartItems((prev) =>
      prev.map((ele: cartItemsProps) =>
        ele?.id === id
          ? { ...ele, isEditQty: false, isEditSellingPrice: true }
          : { ...ele, isEditQty: false, isEditSellingPrice: false }
      )
    );
  };

  const editQuantity = (id: any) => {
    setDisable(true);
    setCartItems((prev) =>
      prev.map((ele: cartItemsProps) =>
        ele?.id === id
          ? { ...ele, isEditQty: true, isEditSellingPrice: false }
          : { ...ele, isEditQty: false, isEditSellingPrice: false }
      )
    );
  };

  return (
    <FormProvider {...methods}>
      <tr className="border-b">
        <td className="cartTableTr">
          {ele?.itemcode}{" "}
          <span className="text-md font-semibold">({ele?.category})</span>
        </td>
        <td className="cartTableTr">{ele?.size}</td>
        <td className="cartTableTr">{ele?.mrp}</td>
        <td className="cartTableTr" onClick={() => editSellingPrice(ele?.id)}>
          {ele?.isEditSellingPrice ? (
            <MuiTextField
              size="small"
              autoFocus
              onKeyPress={(e) => updateSellingPrice(e, ele?.itemcode)}
            />
          ) : ele?.sellingPrice > 0 ? (
            ele?.sellingPrice
          ) : (
            0
          )}
        </td>

        <td className="cartTableTr" onClick={() => editQuantity(ele?.id)}>
          {ele?.isEditQty ? (
            <MuiTextField
              size="small"
              autoFocus
              onKeyPress={(e) => updateQuantity(e, ele?.itemcode)}
            />
          ) : (
            ele?.quantity
          )}
        </td>
        <td className="cartTableTr">{ele?.amount}</td>
        {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {ele?.sellingPrice > 0
            ? ele?.sellingPrice * ele?.quantity
            : ele?.mrp * ele?.quantity}
        </td> */}
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <SlClose
            className="cursor-pointer text-red-600 text-2xl"
            onClick={() => removeCartItem(ele?.id)}
          />
        </td>
      </tr>
    </FormProvider>
  );
};

export default React.memo(CartRow);
