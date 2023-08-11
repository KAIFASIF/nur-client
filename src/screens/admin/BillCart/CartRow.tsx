import React from "react";

interface cartRowProps {
  ele: any;
}

const CartRow = ({ ele }: cartRowProps) => {
  return (
    <tr className="border-b">
      <td className="cartTableTr">
        {ele?.itemcode}{" "}
        <span className="text-md font-semibold">({ele?.category})</span>
      </td>
      <td className="cartTableTr">{ele?.size}</td>
      <td className="cartTableTr">{ele?.mrp}</td>
      <td className="cartTableTr">{ele?.sellingPrice}</td>
      <td className="cartTableTr">{ele?.quantity}</td>
      <td className="cartTableTr">{ele?.amount}</td>
    </tr>
  );
};

export default React.memo(CartRow);
