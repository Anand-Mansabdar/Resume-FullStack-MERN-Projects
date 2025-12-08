import React from "react";
import ResumeBuilder from "./ResumeBuilder";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
