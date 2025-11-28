import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'

const Appointments = () => {
  const { url } = useContext(AppContext);
  const [token, setToken] = useState(() => localStorage.getItem("loginManaliToken"));
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // for popup
  const [newStatus, setNewStatus] = useState("");

  // Sync token from localStorage
  useEffect(() => {
    const syncToken = () => {
      const newToken = localStorage.getItem("loginManaliToken");
      if (newToken !== token) {
        setToken(newToken);
      }
    };
    syncToken();
    window.addEventListener("authUpdate", syncToken);
    return () => window.removeEventListener("authUpdate", syncToken);
  }, [token]);

  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter(
    (appointment) => appointment.date && appointment.date.split("T")[0] === today
  );

  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token || !url) return;
      try {
        const res = await axios.get(`${url}/appointment/doctor`, {
          headers: { Auth: token },
        });
        // console.log(res.data.appointments);
        
        if (res.data && res.data.appointments) {
          setAppointments(res.data.appointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      }
    };
    fetchAppointments();
  }, [url, token]);

  // Open popup
  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setNewStatus(appointment.status);
  };

  // Update status
  const handleUpdateStatus = async () => {
    try {
      // console.log("id "+selectedAppointment._id);
      // console.log("status "+newStatus);
      
      
      const res = await axios.put(
        `${url}/appointment/status`,
        { 
          appointmentId:selectedAppointment._id,
          status: newStatus },
        { headers: { Auth: token } }
      );

    
      console.log(res);
      if(res.data.success)
      {
        toast.success("Update Successfully")
        setSelectedAppointment(null)
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ❌");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-md transition">
            <h2 className="text-2xl font-bold text-blue-600">
              {todaysAppointments.length}
            </h2>
            <p className="text-gray-500">Today's Patients</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-md transition">
            <h2 className="text-2xl font-bold text-green-600">
              {appointments.length}
            </h2>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Upcoming Appointments
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 sticky left-0 bg-gray-50">Patient</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Opr</th>
                  <th className="px-4 py-3">Prescription</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                        {appointment.patient?.username || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {appointment.date ? new Date(appointment.date).toLocaleDateString("en-IN") : "N/A"}
                      </td>
                      <td className="px-4 py-3">{appointment.timeSlot || "N/A"}</td>
                      <td className="px-4 py-3 text-green-600 font-medium">
                        {appointment.status || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="text-xl text-blue-600 hover:text-blue-800"
                          onClick={() => handleEditClick(appointment)}
                        >
                          <CiEdit />
                        </button>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <Link className="underline" to={`/doctor/prescription/add/${appointment._id}`}>Add</Link>
                        <Link to={`/doctor/prescription/${appointment._id}`} className="underline">Show</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popup Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                Update Status - {selectedAppointment.patient.username}
              </h2>

              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border rounded-lg p-2 mb-4"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Appointments;
