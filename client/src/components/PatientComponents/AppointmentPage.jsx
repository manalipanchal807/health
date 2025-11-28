import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import toast from "react-hot-toast";

const AppointmentPage = () => {
  const [filters, setFilters] = useState({
    city: "",
    name: "",
    specialization: "",
  });

  const { doctors, fetchAllDoctorsForAdminOrPatient } = useContext(AppContext);
  const token = localStorage.getItem("loginManaliToken");
  
  useEffect(() => {
    if (token && (!doctors || doctors.length === 0)) {
      fetchAllDoctorsForAdminOrPatient();
    }
  }, [token, doctors, fetchAllDoctorsForAdminOrPatient]);

  const approvedDoctors = (doctors || []).filter(
    (doc) => doc && doc.isApproved === "approved"
  );

  const navigate = useNavigate();

  const filteredDoctors = approvedDoctors.filter((doctor) => {
    if (!doctor || !doctor.user) return false;
    return (
      (filters.city === "" ||
        (doctor.city && doctor.city.toLowerCase().includes(filters.city.toLowerCase()))) &&
      (filters.name === "" ||
        (doctor.user.username && doctor.user.username
          .toLowerCase()
          .includes(filters.name.toLowerCase()))) &&
      (filters.specialization === "" ||
        (doctor.specialization && doctor.specialization
          .toLowerCase()
          .includes(filters.specialization.toLowerCase())))
    );
  });

  const handleAppointmentRequest = (doctor) => {
    navigate(`/patient-appointment/form/${doctor.user._id}`);
    toast.success(`Appointment request sent to ${doctor.user.username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
        Book an Appointment
      </h1>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
          Search Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by City"
            className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Search by Doctor Name"
            className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Search by Specialization"
            className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
            value={filters.specialization}
            onChange={(e) =>
              setFilters({ ...filters, specialization: e.target.value })
            }
          />
        </div>
      </div>

      {/* Doctor List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800 capitalize">
                  {doctor.user?.username?.startsWith("Dr")
                    ? doctor.user.username
                    : "Dr. " + (doctor.user?.username || "Unknown")}
                </h3>

                <p className="text-sm text-gray-600">
                  {doctor.specialization || "N/A"}
                </p>

                <p className="text-sm text-gray-500">
                  {doctor.city || "N/A"}
                </p>

                {/* ✅ FEES ADDED HERE */}
                <p className="text-sm font-semibold text-green-700 mt-1">
                  Fees: ₹{doctor.fees || "Not Provided"}
                </p>
              </div>

              <button
                onClick={() => handleAppointmentRequest(doctor)}
                className="mt-4 w-full py-2 px-4 rounded-lg transition bg-blue-600 hover:bg-blue-700 text-white"
              >
                Request Appointment
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">
            No doctors found. Try changing filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
