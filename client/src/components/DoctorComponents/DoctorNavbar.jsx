import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const DoctorNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginManaliToken");
    localStorage.removeItem("roleManali");
    localStorage.removeItem("idManali");
    localStorage.removeItem("loggedUser");
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow relative">
      {/* Top Navbar */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Doctor Panel</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/doctor/get-appointments" className="hover:text-gray-200 flex items-center gap-1 ">
           <FaCalendarAlt /> Appointments
          </Link>
          <Link to="/doctor/profile" className="hover:text-gray-200 flex items-center gap-1">
            <CgProfile />Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-500">
          <h2 className="text-lg font-bold">Doctor Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl text-white"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <Link
            to="/doctor/get-appointments"
            className="hover:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            Appointments
          </Link>
          <Link
            to="/doctor/profile"
            className="hover:text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
