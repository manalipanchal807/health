import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser")
    localStorage.removeItem("loginManaliToken")
    localStorage.removeItem("roleManali")
    localStorage.removeItem("idManali")
    navigate("/")
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 min-h-full w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white p-5 shadow-xl rounded-r-2xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold tracking-wide">Admin Panel</h2>
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-3">
          <a
            href="#"
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              activeTab === "users"
                ? "bg-white text-indigo-700 font-semibold shadow"
                : "hover:bg-indigo-600"
            }`}
          >
            <FaUsers /> Manage Users
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("doctors")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              activeTab === "doctors"
                ? "bg-white text-indigo-700 font-semibold shadow"
                : "hover:bg-indigo-600"
            }`}
          >
            <FaUserMd /> Manage Doctors
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              activeTab === "appointments"
                ? "bg-white text-indigo-700 font-semibold shadow"
                : "hover:bg-indigo-600"
            }`}
          >
            <FaCalendarAlt /> Appointments
          </a>
          <a
            href="#"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              activeTab === "settings"
                ? "bg-white text-indigo-700 font-semibold shadow"
                : "hover:bg-indigo-600"
            }`}
          >
            <FaCog /> Settings
          </a>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-16 md:bottom-5 left-5 right-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden text-indigo-700 text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="hidden md:block font-medium text-gray-700">
              Welcome, Admin
            </span>
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold text-indigo-700">1,245</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold">Total Doctors</h2>
            <p className="text-3xl font-bold text-indigo-700">85</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold">Appointments</h2>
            <p className="text-3xl font-bold text-indigo-700">432</p>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">John Doe</td>
                <td className="p-3">Booked Appointment</td>
                <td className="p-3">Aug 15, 2025</td>
                <td className="p-3 text-green-600">Completed</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Dr. Smith</td>
                <td className="p-3">Approved Appointment</td>
                <td className="p-3">Aug 14, 2025</td>
                <td className="p-3 text-blue-600">Approved</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Jane Doe</td>
                <td className="p-3">Registered</td>
                <td className="p-3">Aug 13, 2025</td>
                <td className="p-3 text-yellow-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
