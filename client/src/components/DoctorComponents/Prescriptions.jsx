import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const Prescriptions = () => {
  const { url } = useContext(AppContext);
  const { id } = useParams();
  const token = localStorage.getItem("loginManaliToken");

  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await axios.get(`${url}/prescription/get-prescription`, {
          params: { appointmentId: id },
          headers: { Auth: token },
        });
        setPrescription(res.data.appointment); // save in state
      } catch (err) {
        console.error(
          "Error fetching prescription:",
          err.response?.data || err.message
        );
      }
    };
    fetchPrescription();
  }, [id, url, token]);

  if (!prescription) {
    return <div className="p-6 text-center text-gray-500">Loading prescription...</div>;
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
        Prescription Details
      </h2>

      {/* Prescription Info */}
      <div className="mb-6 bg-white shadow rounded-lg p-4 md:p-6">
        <p className="mb-2">
          <strong>Diagnosis:</strong> {prescription.diagnosis}
        </p>
        <p className="mb-2">
          <strong>Additional Notes:</strong>{" "}
          {prescription.additionalNotes || "None"}
        </p>
        <p className="mb-2">
          <strong>Appointment ID:</strong> {prescription.appointment}
        </p>
      </div>

      {/* Caretakers */}
      <div className="mb-6 bg-white shadow rounded-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-2">Caretakers</h3>
        <ul className="list-disc pl-5 text-sm md:text-base">
          {prescription.caretakers.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      </div>

      {/* Medicines Table */}
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3">Medicines</h3>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2">Name</th>
                <th className="border border-gray-300 px-2 py-2">Dosage</th>
                <th className="border border-gray-300 px-2 py-2">Frequency</th>
                <th className="border border-gray-300 px-2 py-2">Times</th>
                <th className="border border-gray-300 px-2 py-2">Duration</th>
                <th className="border border-gray-300 px-2 py-2">Instructions</th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines.map((med, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2">{med.name}</td>
                  <td className="border border-gray-300 px-2 py-2">{med.dosage}</td>
                  <td className="border border-gray-300 px-2 py-2">{med.frequency}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    {med.times.join(", ")}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">{med.duration} days</td>
                  <td className="border border-gray-300 px-2 py-2">
                    {med.instructions || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
