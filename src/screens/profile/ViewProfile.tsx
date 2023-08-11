import React from "react";
import { userTypes } from "../../utilities/types/cartItemsTypes";
import { BiSolidUserPin } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";

interface viewProfileProps {
  user: userTypes;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
const ViewProfile: React.FC<viewProfileProps> = ({ user, setIsEdit }) => {
  return (
    <div className="bg-white w-full p-5">
      <div
        className="flex justify-end  cursor-pointer"
        onClick={() => setIsEdit(false)}
      >
        <AiOutlineEdit className=" text-green-600 text-2xl font-light ml-4" />
      </div>
      <div className="p-10 ">
        <div className="flex justify-center">
          <BiSolidUserPin className="cursor-pointer text-gray-400 text-9xl" />
        </div>

        <div className="w-ful p-2  text-semibold text-gray-600 text-xl flex justify-center">
          Fullname :{" "}
          <span className=" text-gray-800 ml-2">{user?.fullname}</span>
        </div>

        <div className="w-ful p-2  text-semibold text-gray-600 text-xl flex justify-center">
          Username :
          <span className=" text-gray-800 ml-2">{user?.username}</span>
        </div>
        <div className="w-ful p-2  text-semibold text-gray-600 text-xl flex justify-center">
          Email : <span className=" text-gray-800 ml-2">{user?.email}</span>
        </div>
        <div className="w-ful p-2  text-semibold text-gray-600 text-xl flex justify-center">
          Mobile : <span className=" text-gray-800 ml-2">{user?.mobile}</span>
        </div>
      </div>
      <div className="w-ful p-5 bg-green-400 text-semibold text-white flex justify-center">
        {" "}
        View profile
      </div>
    </div>
  );
};

export default React.memo(ViewProfile);
