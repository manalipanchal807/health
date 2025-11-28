import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import { TbBrandBooking } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const PatientNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loginManaliToken");
    localStorage.removeItem("roleManali");
    localStorage.removeItem("idManali");
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-3">
        <h1 className="text-lg sm:text-xl font-bold">Patient Panel</h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-6 items-center">
          <Link to="/patient/book-appointment" className="hover:text-gray-200 flex items-center gap-1">
            <TbBrandBooking size={20} /> Book Appointment
          </Link>
          <Link to="/patient/my-appointment" className="hover:text-gray-200  flex items-center gap-1">
            <FaCalendarAlt size={20} /> My Appointments
          </Link>
          <Link to="/patient/profile" className="hover:text-gray-200 flex items-center gap-1">
            <CgProfile size={20} />Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden block"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:hidden z-50`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-blue-500">
          <h1 className="text-lg font-bold">Patient Panel</h1>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-6">
          <Link
            to="/patient/book-appointment"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300 flex items-center gap-1"
          >
           <TbBrandBooking  /> Book Appointment
          </Link>
          <Link
            to="/patient/my-appointment"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300 flex items-center gap-1"
          >
           <FaCalendarAlt  /> My Appointments
          </Link>
          <Link
            to="/patient/profile"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <CgProfile  />Profile
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="bg-white text-blue-700 px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 sm:hidden z-40"
        ></div>
      )}
    </nav>
  );
};

export default PatientNavbar;
