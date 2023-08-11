import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import Sidebar from "../sidebar";
import Navbar from "../Navbar";

const RoleWrapper = ({ role }: any) => {
  const auth = useRecoilValue(authAtom);
  const userRoles = [auth?.role];
  return userRoles?.includes(role) ? (
    <div className="bg-gray-100 h-screen p-1">
      <div className="">
        <Navbar />

        <div className="flex justify-between h-full">
          <div className="  w-[7%]">
            <Sidebar role={role}/>
          </div>
          <div className="flex w-[93%] p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default RoleWrapper;
