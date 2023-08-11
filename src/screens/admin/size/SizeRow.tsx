import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { eleProps } from "../../../utilities/types";

interface sizeRowProps {
  ele: eleProps;
  deleteModal: (id: number, message: string) => void;
  updateModal: (ele: eleProps) => void;
}
const SizeRow: React.FC<sizeRowProps> = (props) => {
  const { ele, deleteModal, updateModal } = props;

  return (
    <tr className="tableBodyTr">
      <td className="tableBodyTd">
        {" "}
        {ele?.name}
        <span className="ml-1">({ele?.brief})</span>
      </td>

      <td className="tableBodyTd cursor-pointer">
        <div className="flex ">
          <MdOutlineDeleteOutline
            className=" text-red-600 text-2xl font-light"
            onClick={() =>
              deleteModal(ele?.id, "Are you sure you want to delete this size")
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

export default React.memo(SizeRow);
