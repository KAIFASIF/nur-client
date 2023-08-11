import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [loader, setLoader] = useState<boolean>(false);
  const logout = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setAuth("");
    }, 1000);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav>
      <div className="w-full flex justify-between mt-2 p-2 border-b-2 border-green-400">
        <div className="">
          <h1 className="ml-5 text-2xl font-semibold">Nur studio</h1>
        </div>
        <div className="flex items-center mr-5">
          <h1 className="mr-4  text-2xl  ">{auth?.user?.fullname}</h1>
          <Avatar>{auth?.user?.fullname.substring(0, 1).toUpperCase()}</Avatar>
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={toggleDropdown}
              onBlur={closeDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Options
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Account settings
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                  >
                    Support
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                  >
                    License
                  </a>
                  <form method="POST" action="#" role="none">
                    <button
                      type="submit"
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-3"
                      onClick={logout}
                    >
                      Sign out
                    </button>
                  </form>
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


import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [loader, setLoader] = useState<boolean>(false);
  const logout = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setAuth("");
    }, 1000);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav>
      <div className="w-full flex justify-between mt-2 p-2 border-b-2 border-green-400">
        <div className="">
          <h1 className="ml-5 text-2xl font-semibold">Nur studio</h1>
        </div>
        <div className="flex items-center mr-5">
          <h1 className="mr-4  text-2xl  ">{auth?.user?.fullname}</h1>
          <Avatar>{auth?.user?.fullname.substring(0, 1).toUpperCase()}</Avatar>
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={toggleDropdown}
              onBlur={closeDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Options
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Account settings
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                  >
                    Support
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                  >
                    License
                  </a>
                  <form method="POST" action="#" role="none">
                    <button
                      type="submit"
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-3"
                      onClick={logout}
                    >
                      Sign out
                    </button>
                  </form>
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

