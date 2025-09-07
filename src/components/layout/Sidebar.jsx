import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IoIosNotificationsOutline } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import { RiFlowChart } from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
import { FaWpforms } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaPiedPiper } from "react-icons/fa";
import { LuScale } from "react-icons/lu";
import { TbBrandZapier } from "react-icons/tb";

const sideNavData = [
  {
    title: "ER Diagram",
    slug: "/",
    icon: <FaProjectDiagram />,
  },
  {
    title: "Flowchart",
    slug: "/flowchart",
    icon: <RiFlowChart />,
  },
  {
    title: "Server Process",
    slug: "/server-process",
    icon: <VscServerProcess />,
  },
  {
    title: "Form Builder",
    slug: "/formbuilder",
    icon: <FaWpforms />,
  },
  {
    title: "Api Create",
    slug: "/apicreate",
    icon: <FaPiedPiper />,
  },
  {
    title: "Api Show",
    slug: "/apishow",
    icon: <TbBrandZapier />,
  },
  {
    title: "Pipe Line",
    slug: "/pipeline",
    icon: <IoAnalyticsOutline />,
  },
  {
    title: "Scale Point",
    slug: "/scale-point",
    icon: <LuScale />,
  },
];

const Sidebar = () => {
  const [openLoginPage, setOpenLoginPage] = useState(false);

  const [selectNav, setSelectNav] = useState("/");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-white text-black">
      <ul className="mt-16 space-y-2 p-x">
        {sideNavData?.map((el, index) => {
          return (
            <li key={index}>
              <Link
                to={el.slug}
                className={`block p-3 hover:bg-green-100 items-center ${
                  selectNav === el.slug ? "bg-green-100" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="text-xl">{el.icon}</div>
                  <span className="ml-3">{el.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
