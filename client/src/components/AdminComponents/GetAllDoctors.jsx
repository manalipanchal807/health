import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";

const GetAllDoctors = () => {
  const { doctors, url } = useContext(AppContext);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("");
  const token = localStorage.getItem("loginManaliToken");

  // ✅ Update approval status API
  const updateApproval = async () => {
    try {
      const res = await axios.put(
        `${url}/doctor/${selectedDoctor._id}/approve`,
        { isApproved: approvalStatus },
        { headers: { Auth: token } }
      );
      console.log(res);
      setSelectedDoctor(null); // close popup after save
    } catch (error) {
      console.error("Approval update failed:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Doctors</h2>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm uppercase tracking-wider">
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Specialization</th>
              <th className="py-3 px-4 border">Experience</th>
              <th className="py-3 px-4 border">Fees</th>
              <th className="py-3 px-4 border">City</th>
              <th className="py-3 px-4 border">Clinic</th>
              <th className="py-3 px-4 border">License No.</th>
              <th className="py-3 px-4 border">Approved</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <tr
                  key={doc._id}
                  className="text-center hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium capitalize text-gray-800">
                    {doc.user?.username}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {doc.specialization}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {doc.experienceYears} yrs
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    ₹{doc.fees}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{doc.city}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {doc.clinicAddress}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {doc.medicalLicenseNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white font-medium ${
                        doc.isApproved === "approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {doc.isApproved}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setApprovalStatus(doc.isApproved);
                      }}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <MdOutlineEdit className="text-xl text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="py-6 text-gray-500 text-center text-sm"
                >
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
            >
              <p className="text-lg font-semibold capitalize text-gray-800">
                {doc.user?.username}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Specialization:</span>{" "}
                {doc.specialization}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Experience:</span>{" "}
                {doc.experienceYears} yrs
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Fees:</span> ₹{doc.fees}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">City:</span> {doc.city}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Clinic:</span> {doc.clinicAddress}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">License:</span>{" "}
                {doc.medicalLicenseNumber}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                    doc.isApproved === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {doc.isApproved}
                </span>
                <button
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setApprovalStatus(doc.isApproved);
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <MdOutlineEdit className="text-lg text-blue-600" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No doctors found</p>
        )}
      </div>

      {/* ✅ Popup Modal with All Extra Details */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Doctor Details - {selectedDoctor.user?.username}
            </h2>

            <p><b>Email:</b> {selectedDoctor.user?.email}</p>
            <p><b>Specialization:</b> {selectedDoctor.specialization}</p>
            <p><b>Experience:</b> {selectedDoctor.experienceYears} yrs</p>
            <p><b>Fees:</b> ₹{selectedDoctor.fees}</p>
            <p><b>City:</b> {selectedDoctor.city}</p>
            <p><b>Clinic Address:</b> {selectedDoctor.clinicAddress}</p>
            <p><b>Availability:</b> {selectedDoctor.availability?.join(", ")}</p>
            <p><b>Medical License No:</b> {selectedDoctor.medicalLicenseNumber}</p>

            {/* Document Links */}
            <div className="mt-3 space-y-2">
              <p><b>Aadhaar Card:</b> <a href={selectedDoctor.aadhaarCard} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a></p>
              <p><b>Degree Certificate:</b> <a href={selectedDoctor.degreeCertificate} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a></p>
              <p><b>License Document:</b> <a href={selectedDoctor.licenseDocument} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a></p>
            </div>

            {/* Approval Dropdown */}
            <div className="mt-4">
              <label className="block mb-2 font-medium">Approval Status</label>
              <select
                value={approvalStatus}
                onChange={(e) => setApprovalStatus(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={updateApproval}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllDoctors;
