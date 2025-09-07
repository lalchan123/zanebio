import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";

//Design UI Import

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

//Redux

import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "../../features/User/loginLogout";

//

import UserLogin from "../User/UserLogin";
import TopProfileDropdownMenu from "../shared/TopProfileDropdownMenu";

const Topbar = () => {
  //Top Profile Menu

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Redux

  const [openLoginPage, setOpenLoginPage] = useState(false);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo); // Access the user info from the store

  useEffect(() => {
    dispatch(initializeUser()); // Call initializeUser when the component mounts
  }, [dispatch]);

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white text-black flex items-center px-4 justify-end z-50 ">
      <div className="pr-6">
        <div className="">
          <ul class="py-2 flex flex-row gap-x-3 items-center">
            <li className="w-80">
              <form className="max-w-md mx-auto border-2 rounded-full">
                <label
                  for="default-search"
                  className=" text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 "
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </li>
            <li>
              <div className="bg-slate-100 p-1 rounded-full cursor-pointer border-2">
                <IoIosNotificationsOutline className="w-7 h-7" />
              </div>
            </li>
            <li>
              {userInfo.status ? (
                // <div
                //   className="flex items-center gap-4 bg-slate-100 rounded-full cursor-pointer border-2 border-green-200"
                //   onClick={() => setShowProfileMenu(!showProfileMenu)}
                // >
                //   <img
                //     className="w-10 h-10 rounded-full"
                //     src="https://png.pngitem.com/pimgs/s/254-2549122_girl-hd-png-download.png"
                //     alt="D"
                //   />
                // </div>
                <div className="">
                  <TopProfileDropdownMenu
                    open={open}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                  />
                </div>
              ) : (
                // <Link
                //   class="flex items-center justify-center bg-slate-100 rounded-full cursor-pointer border-2 w-10 h-10"
                //   to={"/login"}
                // >
                //   <svg
                //     class="absolute w-7 h-7 text-gray-500"
                //     fill="currentColor"
                //     viewBox="0 0 20 20"
                //     xmlns="http://www.w3.org/2000/svg"
                //   >
                //     <path
                //       fill-rule="evenodd"
                //       d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                //       clip-rule="evenodd"
                //     ></path>
                //   </svg>
                // </Link>
                <div className="">
                  <TopProfileDropdownMenu
                    open={open}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                  />
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
