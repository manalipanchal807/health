import React from "react";
import { CalendarDays, FileText, Stethoscope, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const PatientDashboard = () => {

  const patientName =  localStorage.getItem("loggedUser"); // later replace with logged-in user data
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem("loggedUser")
    localStorage.removeItem("loginManaliToken")
    localStorage.removeItem("roleManali")
    localStorage.removeItem("idManali")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">Hello, {patientName}</span>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6 mt-6">
        {/* Upcoming Appointments */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between h-full hover:shadow-xl transition">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-blue-600" size={28} />
              <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            </div>
            <ul className="space-y-2">
              <li className="p-3 bg-gray-100 rounded-lg">
                20 Aug, 10:00 AM – Dr. Sharma (Dermatology)
              </li>
              <li className="p-3 bg-gray-100 rounded-lg">
                25 Aug, 3:00 PM – Dr. Mehta (Cardiology)
              </li>
            </ul>
          </div>
          <button onClick={()=>navigate("/appointment")} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
            Book New Appointment
          </button>
        </div>

        {/* Medical Records */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between h-full hover:shadow-xl transition">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="text-green-600" size={28} />
              <h2 className="text-lg font-semibold">Medical Records</h2>
            </div>
            <ul className="space-y-2">
              <li className="p-3 bg-gray-100 rounded-lg">
                Blood Test Report – July 2025
              </li>
              <li className="p-3 bg-gray-100 rounded-lg">
                X-Ray Report – June 2025
              </li>
            </ul>
          </div>
          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
            View All Records
          </button>
        </div>

        {/* Prescriptions */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between h-full hover:shadow-xl transition">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Stethoscope className="text-purple-600" size={28} />
              <h2 className="text-lg font-semibold">Prescriptions</h2>
            </div>
            <ul className="space-y-2">
              <li className="p-3 bg-gray-100 rounded-lg">Amoxicillin – 7 days</li>
              <li className="p-3 bg-gray-100 rounded-lg">Vitamin D3 – 30 days</li>
            </ul>
          </div>
          <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700">
            View All Prescriptions
          </button>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
