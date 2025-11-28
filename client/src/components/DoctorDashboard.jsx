import React, { useState } from "react";
import { Menu, X, User, Calendar, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
    const handleLogout = () =>{
    localStorage.removeItem("loggedUser")
    localStorage.removeItem("loginManaliToken")
    localStorage.removeItem("roleManali")
    localStorage.removeItem("idManali")
    navigate("/")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 lg:static lg:inset-0 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Doctor Panel</h2>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <nav className="mt-4 space-y-2 px-4">
          <a className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 cursor-pointer">
            <User size={20} /> Profile
          </a>
          <a className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 cursor-pointer">
            <Calendar size={20} /> Appointments
          </a>
          <a className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 cursor-pointer">
            <FileText size={20} /> Prescriptions
          </a>
          <a className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 cursor-pointer">
            <button onClick={handleLogout}  className="flex gap-3"><LogOut size={20} /> Logout</button>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Doctor"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Dashboard Content */}

      </div>
    </div>
  );
};

export default DoctorDashboard;
