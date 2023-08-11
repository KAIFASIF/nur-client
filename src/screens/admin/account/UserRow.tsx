import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { eleProps } from "../../../utilities/types";
import { userTypes } from "../../../utilities/types/cartItemsTypes";

interface userRowProps {
  ele: eleProps;
  deleteModal: (id: number) => void;
  updateModal: (ele: userTypes) => void;
}
const UserRow: React.FC<userRowProps> = (props) => {
  const { ele, deleteModal, updateModal } = props;

  return (
    <tr className="tableBodyTr">
      <td className="tableBodyTd"> {ele?.fullname}</td>
      <td className="tableBodyTd"> {ele?.mobile}</td>
      <td className="tableBodyTd"> {ele?.email}</td>
      <td className="tableBodyTd">
        {" "}
        {ele?.role === "ROLE_ADMIN" ? "Admin" : "User"}
      </td>
      <td className="tableBodyTd"> {ele?.isAuthorized ? "Yes" : "No"}</td>

      <td className="tableBodyTd cursor-pointer">
        <div className="flex ">
          <MdOutlineDeleteOutline
            className=" text-red-600 text-2xl font-light"
            onClick={() => deleteModal(ele?.id)}
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

export default React.memo(UserRow);
