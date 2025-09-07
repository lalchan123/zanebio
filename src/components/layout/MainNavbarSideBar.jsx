import React, { useState } from "react";

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

import { useSelector } from "react-redux";
import UserLogin from "../User/UserLogin";

const MainNavbarSideBar = () => {
  //Redux

  const userInfo = useSelector((state) => state.userInfo);

  const [openLoginPage, setOpenLoginPage] = useState(false);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="w-full bg-white">
      <div className="flex justify-end mr-14">
        <div className="">
          <div className="">
            <ul class="py-2 flex flex-row gap-x-5 items-center">
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
                <div className="bg-red-500 p-1 rounded-full cursor-pointer border-2 border-green-200">
                  <IoIosNotificationsOutline className="w-7 h-7" />
                </div>
              </li>
              <li>
                {userInfo.status ? (
                  <div
                    className="flex items-center gap-4 bg-slate-100 rounded-full cursor-pointer border-2 border-green-200"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://png.pngitem.com/pimgs/s/254-2549122_girl-hd-png-download.png"
                      alt="D"
                    />
                  </div>
                ) : (
                  <div
                    class="flex items-center justify-center gap-4 bg-slate-100 rounded-full cursor-pointer border-2 border-green-200 w-10 h-10"
                    onClick={() => setOpenLoginPage(!openLoginPage)}
                  >
                    <svg
                      class="absolute w-7 h-7 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-[70px] mx-auto relative z-10">
        <div className="">
          <Dialog
            open={openLoginPage}
            onClose={setOpenLoginPage}
            className="relative ml-[25%]"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="w-full h-[400px]">
                    <UserLogin />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={() => setOpenLoginPage(false)}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setOpenLoginPage(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      </div>

      {/* Profile dropdown */}

      {showProfileMenu && (
        <div class="z-40 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow fixed top-0 right-2 mt-[70px]">
          <div class="px-4 py-3">
            <span class="block text-lg text-gray-900 dark:text-white">
              Bonnie Green
            </span>
            <span class="block text-md  text-gray-500 truncate dark:text-gray-400">
              name@flowbite.com
            </span>
          </div>
          <ul class="py-3" aria-labelledby="user-menu-button">
            <li>
              <a
                href="#"
                class="block px-6 py-2 text-md text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </a>
            </li>
            <li>
              <Link
                to="/setting"
                class="block px-6 py-2 text-md text-gray-700 hover:bg-gray-100"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                Settings
              </Link>
            </li>
            <li>
              <a
                href="#"
                class="block px-6 py-2 text-md text-gray-700 hover:bg-gray-100 "
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainNavbarSideBar;
