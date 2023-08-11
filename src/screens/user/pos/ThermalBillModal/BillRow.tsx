import React from "react";
import { cartItemsProps } from "../../../../Utilities/types/cartItemsTypes";

interface billRowProps {
  ele: cartItemsProps;
}

const BillRow: React.FC<billRowProps> = ({ ele }) => {
  return (
    <tr className="">
      <td
        scope="col"
        className="text-base font-normal text-gray-900 px-2  text-left"
      >
        {ele?.itemcode} <span> ({ele?.category})</span>
      </td>
      <td
        scope="col"
        className="text-base font-normal text-gray-900 px-2  text-center"
      >
        {ele?.sellingPrice > 0 ? ele?.sellingPrice : ele?.mrp}
      </td>
      <td
        scope="col"
        className="text-base font-normal text-gray-900 px-2  text-center"
      >
        {ele?.quantity}
      </td>

      <td
        scope="col"
        className="text-base font-normal text-gray-900 px-2  text-center"
      >
        {ele?.sellingPrice > 0
          ? ele?.quantity * ele?.sellingPrice
          : ele?.quantity * ele?.mrp}
      </td>
    </tr>
  );
};

export default React.memo(BillRow);
