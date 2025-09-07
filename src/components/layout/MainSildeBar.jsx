import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { IoIosNotificationsOutline } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import { RiFlowChart } from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
import { FaWpforms } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaPiedPiper } from "react-icons/fa";
import { LuScale } from "react-icons/lu";

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
    title: "Api Show",
    slug: "/apishow",
    icon: <FaPiedPiper />,
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

const MainSildeBar = () => {
  const [openLoginPage, setOpenLoginPage] = useState(false);

  const [selectNav, setSelectNav] = useState("/");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div>
      <nav className=" bg-white text-white p-4 min-h-[1000px]">
        <div className="space-y-4">
          <div className="text-4xl font-extrabold text-gray-500 mb-8 text-center">
            It Bangla
          </div>
          <ul className="space-y-2">
            {sideNavData.map((el, index) => (
              <li key={index}>
                <Link
                  onClick={() => setSelectNav(el.slug)}
                  to={el.slug}
                  className={`flex items-center p-3 text-slate-800 hover:bg-green-100 rounded-lg text-lg group ${
                    selectNav === el.slug ? "bg-green-100" : ""
                  }`}
                >
                  <div className="text-xl">{el.icon}</div>
                  <span className="ml-3">{el.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MainSildeBar;
