import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginManaliToken");
    localStorage.removeItem("roleManali");
    localStorage.removeItem("idManali");
    localStorage.removeItem("loggedUser");
    navigate("/login"); // redirect to login
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex justify-between items-center bg-blue-700 text-white px-6 py-3 shadow md:px-10">
        <h1 className="text-xl font-bold">Admin Panel</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/admin/get-doctors" className="hover:text-gray-200">
            Doctors
          </Link>
          <Link to="/admin/get-patients" className="hover:text-gray-200">
            Patients
          </Link>
          {/* <Link to="/admin/settings" className="hover:text-gray-200">Settings</Link> */}
          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-600">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-4 px-6 py-6">
          <Link
            to="/admin/get-doctors"
            className="hover:bg-blue-600 px-3 py-2 rounded"
            onClick={() => setSidebarOpen(false)}
          >
            Doctors
          </Link>
          <Link
            to="/admin/get-patients"
            className="hover:bg-blue-600 px-3 py-2 rounded"
            onClick={() => setSidebarOpen(false)}
          >
            Patients
          </Link>
          {/* <Link
            to="/admin/settings"
            className="hover:bg-indigo-600 px-3 py-2 rounded"
            onClick={() => setSidebarOpen(false)}
          >
            Settings
          </Link> */}

          {/* Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            className="bg-white text-blue-700 px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay (close sidebar on click outside) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminNavbar;
