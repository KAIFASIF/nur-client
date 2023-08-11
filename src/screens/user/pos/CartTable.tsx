import React from "react";
import Table from "../../../libraries/Table";
import CartRow from "./CartRow";
import { cartItemsProps } from "../../../utilities/types/cartItemsTypes";

interface cartTableProps {
  cartItems: cartItemsProps[];
  setCartItems: any;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CartTable: React.FC<cartTableProps> = ({
  cartItems,
  setCartItems,
  setDiscount,
  setDisable,
  setMessage,
  setSeverity,
  setOpen,
}) => {
  const headers = [
    "Product",
    "Size",
    "Mrp",
    "Selling price",
    "Quantity",
    "Total",
    "Actions",
  ];
  return (
    <div>
      <Table
        tableData={cartItems}
        headers={headers}
        TableRow={CartRow}
        rowProps={{
          cartItems: cartItems,
          setCartItems: setCartItems,
          setDiscount: setDiscount,
          setDisable: setDisable,
          setMessage: setMessage,
          setSeverity: setSeverity,
          setOpen: setOpen,
        }}
      />
    </div>
  );
};

export default React.memo(CartTable);
