import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from "react-redux";

import ERDiagram from "./components/MainHomePage/ERDiagram";
import ServerProcess from "./components/MainHomePage/ServerProcess";
import FormBuilder from "./components/MainHomePage/FormBuilder";
import ApiShow from "./components/MainHomePage/ApiShow";
import PipeLine from "./components/MainHomePage/PipeLine";
import SettingPage from "./components/MainHomePage/SettingPage";
import SpyComponent from "./components/MainHomePage/SpyComponent";

import "./App.css";

import MainNavbarSideBar from "./components/layout/MainNavbarSideBar.jsx";
import BaseUrlSetup from "./components/baseUrl/baseUrlSetup";
import MainSildeBar from "./components/layout/MainSildeBar";

import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/MainHomePage/Login";
import Signup from "./components/MainHomePage/Signup.jsx";
import CustomFrom from "./components/MainHomePage/CustomFrom";
import FlowchartPage from "./components/MainHomePage/FlowchartPage";
import ApiCreate from "./components/MainHomePage/ApiCreate";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo); // Access the user info from the store
  
  return (
    <Router>
      <div className="flex">
        <Topbar />
        {userInfo.status ? (
          <div className="ml-60 flex-1">
            <Sidebar />
            <div className="p-5 flex justify-center items-center min-h-screen">
              <Routes>
                <Route path="/" element={<Navigate to="/er-diagram" replace />} />
                <Route path="/er-diagram" element={<ERDiagram />} />
                <Route path="/flowchart" element={<FlowchartPage />} />
                <Route path="/server-process" element={<ServerProcess />} />
                <Route path="/formbuilder" element={<FormBuilder />} />
                <Route path="/apishow" element={<ApiShow />} />
                <Route path="/pipeline" element={<PipeLine />} />
                <Route path="/setting" element={<SettingPage />} />
                <Route path="/scale-point" element={<SpyComponent />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/apicreate" element={<ApiCreate />} />
                <Route path="/customform" element={<CustomFrom />} />
              </Routes>
            </div>
          </div>
        ) : (
            <div className="ml-0 flex-1">
              <div className="p-5 flex justify-center items-center min-h-screen">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </div>
            </div>  
        )}
       
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </Router>
  );
}

export default App;
