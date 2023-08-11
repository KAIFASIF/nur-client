import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { menuProps } from "../../utilities/types";

const Navbar = () => {
  const auth = useRecoilValue(authAtom);
  const dropDownOptions: menuProps[] = [
    { id: 2, label: "Profile", link: auth?.role ==="ROLE_ADMIN" ? "admin/profile":"user/profile"},
    { id: 3, label: "Logout", link: "/signout" },
  ];
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
    <div className="w-full flex justify-between mt-2 p-2 border-b-2 border-green-400">
      <div className="">
        <h1 className="ml-5 text-2xl font-semibold">Nur studio</h1>
      </div>
      <div className="flex items-center mr-5">
        <h1 className="mr-4 text-2xl">{auth?.user?.fullname}</h1>
        <Avatar onClick={toggleDropdown}>
          {auth?.user?.fullname.substring(0, 1).toUpperCase()}
        </Avatar>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="none">
                {dropDownOptions.length > 0 &&
                  dropDownOptions.map((ele: menuProps) => (
                    <Link
                      to={ele?.link}
                      onClick={closeDropdown}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
                      role="menuitem"
                      tabIndex={-1}
                      id={`menu-item-${ele?.id}`}
                      key={ele?.id}
                    >
                      {ele?.label}
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
  );
};

export default React.memo(Navbar);

