import React, { useContext, useState } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";

const MyAppointments = () => {
  const { appointments, url } = useContext(AppContext);
  const token = localStorage.getItem("loginManaliToken");

  const [open, setOpen] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch prescription by appointment id
  const fetchPrescription = async (appointmentId) => {
    
    try {
      setLoading(true);
      const res = await axios.get(`${url}/prescription/get-prescription`, {
        params: { appointmentId: appointmentId },
        headers: { Auth: token },
      });
      console.log(res.data);
      
      setPrescription(res.data.appointment);
      setOpen(true);
    } catch (err) {
      console.error("Error fetching prescription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        My Appointments
      </h2>

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            {/* Doctor Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 capitalize">
                {appt.doctor.user.username.startsWith("Dr.")
                  ? appt.doctor.user.username
                  : "Dr. " + appt.doctor.user.username}
              </h3>
              <p className="text-sm text-gray-500">
                {appt.doctor.specialization}
              </p>
            </div>

            {/* Appointment Details */}
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">📅 Date:</span>{" "}
                {new Date(appt.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">⏰ Time:</span> {appt.timeSlot}
              </p>
              <p>
                <span className="font-medium">💡 Reason:</span> {appt.reason}
              </p>
            </div>

            {/* Status + Prescription button */}
            <div className="mt-4 flex gap-2 flex-wrap">
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full
                  ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : appt.status === "completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
              </span>
              {(appt.status === "completed" || appt.status === "confirmed") && (
                <button
                  onClick={() => fetchPrescription(appt._id)}
                  className="text-white px-3 py-1 text-sm rounded-2xl cursor-pointer bg-blue-700 hover:bg-blue-800 transition"
                >
                  Prescription
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-6 text-blue-700">
              Prescription Details
            </h3>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading prescription...</p>
              </div>
            ) : prescription ? (
              <div className="space-y-6">
                {/* Prescription Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong className="text-gray-700">Diagnosis:</strong>{" "}
                    <span className="text-gray-900">{prescription.diagnosis}</span>
                  </p>
                  {prescription.additionalNotes && (
                    <p className="mb-2">
                      <strong className="text-gray-700">Additional Notes:</strong>{" "}
                      <span className="text-gray-900">{prescription.additionalNotes}</span>
                    </p>
                  )}
                </div>

                {/* Caretakers */}
                {prescription.caretakers && prescription.caretakers.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Caretakers</h4>
                    <ul className="list-disc pl-5 text-gray-900">
                      {prescription.caretakers.map((email, index) => (
                        <li key={index}>{email}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Medicines Table */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">Medicines</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-blue-100">
                          <th className="border border-gray-300 px-3 py-2 text-left">Medicine</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Dosage</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Frequency</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Times</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Duration</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Instructions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prescription.medicines.map((med, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-3 py-2 font-medium">
                              {med.name}
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              {med.dosage}
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              {med.frequency}
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              {med.times && med.times.length > 0 
                                ? med.times.join(", ") 
                                : "As needed"}
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              {med.duration} days
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              {med.instructions || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No prescription found for this appointment.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
