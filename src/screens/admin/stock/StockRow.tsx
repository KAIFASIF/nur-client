import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

interface stockRowProps {
  ele: any
  deleteModal: (id: number, message: string) => void;
  updateModal: (ele:any) => void;
}
const StockRow: React.FC<stockRowProps> = (props) => {
  const { ele, deleteModal, updateModal } = props;

  return (
    <tr className="tableBodyTr">
      <td className="tableBodyTd"> {ele?.category}</td>
      <td className="tableBodyTd"> {ele?.itemcode}</td>
      <td className="tableBodyTd"> {ele?.size}</td>
      <td className="tableBodyTd"> {ele?.purchasedPrice}</td>
      <td className="tableBodyTd"> {ele?.purchasedQuantity}</td>
      <td className="tableBodyTd"> {ele?.availableQuantity}</td>     

      <td className="tableBodyTd cursor-pointer">
        <div className="flex ">
          <MdOutlineDeleteOutline
            className=" text-red-600 text-2xl font-light"
            onClick={() =>
              deleteModal(ele?.id, "Are you sure you want to delete this stock")
            }
          />
          <AiOutlineEdit
            className=" text-green-600 text-2xl font-light ml-4"
            onClick={() => updateModal(ele)}
          />
        </div>
      </td>
    </tr>
  );
};

export default React.memo(StockRow);
