import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuProps } from "../../utilities/types";
import { ImStatsBars } from "react-icons/im";
import { FaFileInvoice } from "react-icons/fa";
import { CgShutterstock } from "react-icons/cg";
import { IoMdResize } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { MdSupervisorAccount } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";

interface sidebarProps {
  role: "ROLE_ADMIN" | "ROLE_USER";
}
const Sidebar: React.FC<sidebarProps> = ({ role }) => {
  const location = useLocation();
  const [menu, setMenu] = useState<menuProps[] | []>([]); 

  const userMenu: menuProps[] = [
    { id: 1, label: "Stats", link: "/user-dashboard", icon: <ImStatsBars /> },
    { id: 2, label: "Pos", link: "/user/pos", icon: <BsCartCheckFill /> },
    { id: 3, label: "Invoices", link: "/user/invoices", icon: <FaFileInvoice /> },
  ];
  const adminMenu: menuProps[] = [
    {
      id: 1,
      label: "Stats",
      link: "/admin-dashboard",
      icon: <ImStatsBars />,
    },
    {
      id: 2,
      label: "Invoices",
      link: "/admin/invoices",
      icon: <FaFileInvoice />,
    },
    { id: 3, label: "Stocks", link: "/admin/stocks", icon: <CgShutterstock /> },
    { id: 4, label: "Sizes", link: "/admin/sizes", icon: <IoMdResize /> },
    {
      id: 5,
      label: "Categories",
      link: "/admin/categories",
      icon: <MdCategory />,
    },
    {
      id: 6,
      label: "Account",
      link: "/admin/account",
      icon: <MdSupervisorAccount />,
    },
  ];

  useEffect(() => {
    role === "ROLE_USER" ? setMenu(userMenu) : setMenu(adminMenu);
  }, [role]);

  return (
    <div>
      {menu.length > 0 &&
        menu.map((ele: menuProps) => (
          <Link to={ele?.link} key={ele?.id}>
            <div
              className={`bg-red-400  border-b-2 border-green-600  h-24  flex flex-col justify-center items-center hover:bg-gray-100 hover:font-bold
            ${
              location?.pathname === ele?.link
                ? "bg-gray-200 font-bold"
                : "bg-white font-semibold "
            }`}
            >
              <div className="text-2xl">{ele?.icon}</div>
              {ele?.label}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default React.memo(Sidebar);
