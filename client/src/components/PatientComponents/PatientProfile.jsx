import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";


const PatientProfile = () => {
  // window.location.reload();

  const { getPatientById, patientProfile, getPatientProfile } = useContext(AppContext);
  
  const navigate = useNavigate();

  // Refresh profile data when component mounts
 useEffect(() => {
  getPatientProfile();  // fetch patient data
}, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md md:max-w-2xl lg:max-w-4xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {getPatientById?.username || "—"}
            </h2>
            <p className="text-gray-500">Patient ID: {getPatientById?._id || "—"}</p>
            {/* <p className="text-blue-600 font-medium">Regular Checkup</p> */}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Patient Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Personal Info
            </h3>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Age:</span> {patientProfile?.age || "—"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Gender:</span>{" "}
              {patientProfile?.gender || "—"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> {patientProfile?.phone ? `+91 ${patientProfile.phone}` : "—"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {patientProfile?.email || "—"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Medical Info
            </h3>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Blood Group:</span>{" "}
              {patientProfile?.blood_group || "—"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Allergies:</span>{" "}
              {patientProfile?.allergies || "—"}
            </p>
            {/* <p className="text-gray-600"><span className="font-medium">Last Visit:</span> 10 Aug 2025</p>
            <p className="text-gray-600"><span className="font-medium">Doctor:</span> Dr. Smith</p> */}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Caretakers */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Caretakers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {patientProfile?.careTakers?.map((careTaker,index) => (
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
                <h4 className="text-md font-bold text-gray-800">Caretaker {index+1}</h4>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Name:</span> {careTaker.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Relation:</span> {careTaker.relation}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> +91 {careTaker.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {careTaker.email}
                </p>
              </div>
            ))}
            {/* Caretaker 1 */}
               {/* <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
              <h4 className="text-md font-bold text-gray-800">Caretaker 1</h4>
              <p className="text-gray-600 mt-2"><span className="font-medium">Name:</span> - </p>
              <p className="text-gray-600"><span className="font-medium">Relation:</span> -</p>
              <p className="text-gray-600"><span className="font-medium">Phone:</span> - </p>
              <p className="text-gray-600"><span className="font-medium">Email:</span> -</p>
            </div> */}
            {/* Caretaker 2 */}
            {/* <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
              <h4 className="text-md font-bold text-gray-800">Caretaker 2</h4>
              <p className="text-gray-600 mt-2"><span className="font-medium">Name:</span> -</p>
              <p className="text-gray-600"><span className="font-medium">Relation:</span> -</p>
              <p className="text-gray-600"><span className="font-medium">Phone:</span> -</p>
              <p className="text-gray-600"><span className="font-medium">Email:</span> -</p>
            </div> */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/patient/profile/edit")}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
          

        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
