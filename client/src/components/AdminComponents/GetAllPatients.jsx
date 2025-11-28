import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";

const GetAllPatients = () => {
  const { url } = useContext(AppContext);
  const token = localStorage.getItem("loginManaliToken");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${url}/patient/get-all`, {
          headers: {
            Auth: token,
          },
        });
        console.log("Patients:", res.data.patients);
        setPatients(res.data.patients || []);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [url, token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Patients</h2>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm uppercase tracking-wider">
              {/* <th className="py-3 px-4 border">Name</th> */}
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Phone</th>
              <th className="py-3 px-4 border">Age</th>
              <th className="py-3 px-4 border">Gender</th>
              <th className="py-3 px-4 border">Blood Group</th>
              <th className="py-3 px-4 border">Allergies</th>
              <th className="py-3 px-4 border">Care Takers</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {patients.length > 0 ? (
              patients.map((pat) => (
                <tr key={pat._id} className="text-center hover:bg-gray-50">
                  {/* <td className="py-3 px-4 font-medium capitalize text-gray-800">
                    {pat.user?.username || "N/A"}
                  </td> */}
                  <td className="py-3 px-4 text-gray-600">{pat.email}</td>
                  <td className="py-3 px-4 text-gray-600">{pat.phone}</td>
                  <td className="py-3 px-4 text-gray-600">{pat.age}</td>
                  <td className="py-3 px-4 text-gray-600">{pat.gender}</td>
                  <td className="py-3 px-4 text-gray-600">{pat.blood_group}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {pat.allergies?.join(", ")}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {pat.careTakers && pat.careTakers.length > 0 ? (
                      <ul className="list-disc list-inside text-left">
                        {pat.careTakers.map((c) => (
                          <li key={c._id}>
                            {c.name} ({c.relation}) - {c.phone}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No Caretakers"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-6 text-gray-500 text-center text-sm"
                >
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {patients.length > 0 ? (
          patients.map((pat) => (
            <div
              key={pat._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
            >
              <p className="text-lg font-semibold capitalize text-gray-800">
                {pat.user?.username || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {pat.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> {pat.phone}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Age:</span> {pat.age}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Gender:</span> {pat.gender}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Blood Group:</span>{" "}
                {pat.blood_group}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Allergies:</span>{" "}
                {pat.allergies?.join(", ") || "None"}
              </p>
              <div className="mt-3">
                <span className="font-medium text-gray-700">Care Takers:</span>
                {pat.careTakers && pat.careTakers.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {pat.careTakers.map((c) => (
                      <li key={c._id}>
                        {c.name} ({c.relation}) - {c.phone}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No Caretakers</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No patients found</p>
        )}
      </div>
    </div>
  );
};

export default GetAllPatients;
