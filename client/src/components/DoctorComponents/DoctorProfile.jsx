import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { getDoctor, getPatientById, getPatientLoggedData } = useContext(AppContext);

  // Use getDoctor from context which is already fetched in AppState
  const doctor = getDoctor;
  
  // Get user info (username, email) from the populated user field or from getPatientById (logged user data)
  // doctor.user should be populated by the API, but fallback to getPatientById which has logged user info
  const doctorUser = doctor?.user || getPatientById;

  // Ensure data is fetched when component mounts
  React.useEffect(() => {
    if (getPatientLoggedData) {
      getPatientLoggedData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {doctorUser?.username?.startsWith("Dr. ") || doctorUser?.username?.startsWith("Dr")
                ? doctorUser.username
                : `Dr. ${doctorUser?.username || "—"}`}
            </h2>

            <p className="text-blue-600 font-medium text-sm">
              {doctor?.specialization || "Specialization not set"}
            </p>

            <p className="text-gray-500 text-sm">
              {doctor?.isApproved === "approved"
                ? "✅ Approved Doctor"
                : "⏳ Pending Approval"}
            </p>
          </div>

          <button
            onClick={() => navigate("/doctor/profile/edit")}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition w-full md:w-auto"
          >
            Edit Profile
          </button>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="p-4 border rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700">
              Personal Info
            </h3>
            <div className="mt-2 space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {doctorUser?.username || "—"}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {doctorUser?.email || "—"}
              </p>
              <p>
                <span className="font-medium">City:</span>{" "}
                {doctor?.city || "—"}
              </p>
              <p>
                <span className="font-medium">Clinic Address:</span>{" "}
                {doctor?.clinicAddress || "—"}
              </p>
            </div>
          </div>

          {/* Professional Info */}
          <div className="p-4 border rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700">
              Professional Info
            </h3>
            <div className="mt-2 space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {doctor?.experienceYears
                  ? `${doctor.experienceYears} yrs`
                  : "—"}
              </p>
              <p>
                <span className="font-medium">Fees:</span>{" "}
                {doctor?.fees ? `₹${doctor.fees}` : "—"}
              </p>
              <p>
                <span className="font-medium">Availability:</span>{" "}
                {doctor?.availability?.length > 0
                  ? doctor.availability.join(", ")
                  : "—"}
              </p>
              <p>
                <span className="font-medium">Medical License No:</span>{" "}
                {doctor?.medicalLicenseNumber || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Uploaded Documents
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Aadhaar card */}
            <div className="p-3 border rounded-xl bg-gray-50">
              <p className="font-medium text-gray-700">Aadhaar Card</p>
              {doctor?.aadhaarCard ? (
                <a
                  href={doctor.aadhaarCard}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  View Document
                </a>
              ) : (
                <p className="text-gray-500 text-sm">Not uploaded</p>
              )}
            </div>

            {/* Degree */}
            <div className="p-3 border rounded-xl bg-gray-50">
              <p className="font-medium text-gray-700">Degree Certificate</p>
              {doctor?.degreeCertificate ? (
                <a
                  href={doctor.degreeCertificate}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  View Document
                </a>
              ) : (
                <p className="text-gray-500 text-sm">Not uploaded</p>
              )}
            </div>

            {/* License */}
            <div className="p-3 border rounded-xl bg-gray-50">
              <p className="font-medium text-gray-700">Medical License</p>
              {doctor?.licenseDocument ? (
                <a
                  href={doctor.licenseDocument}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  View Document
                </a>
              ) : (
                <p className="text-gray-500 text-sm">Not uploaded</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;
