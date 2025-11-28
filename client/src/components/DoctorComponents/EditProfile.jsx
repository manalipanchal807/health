import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { url } = useContext(AppContext);
  const doctorId = localStorage.getItem("idManali");
  const token = localStorage.getItem("loginManaliToken");
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    specialization: "",
    experienceYears: "",
    fees: "",
    clinicAddress: "",
    city: "",
    medicalLicenseNumber: "",
    aadhaarCard: "",
    degreeCertificate: "",
    licenseDocument: "",
  });

  // Fetch existing profile
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${url}/doctor/${doctorId}`, {
          headers: { Auth: token },
        });
        if (res.data.success) {
          setDoctor(res.data.doctor);
          setFormData(res.data.doctor);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctor();
  }, [doctorId, token, url]);

  // Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axios.put(
        `${url}/doctor/update`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Auth: token,
          },
        }
      );
      console.log(res);
      
      if (res.data.success) {
        toast.success("Profile updated successfully ✅");
        // window.location.reload();
        navigate("/doctor/profile")
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile ❌");
    }
  };

  // if (!doctor) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Experience (Years)</label>
          <input
            type="number"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Fees</label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Clinic Address</label>
          <input
            type="text"
            name="clinicAddress"
            value={formData.clinicAddress}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Medical License Number</label>
          <input
            type="text"
            name="medicalLicenseNumber"
            value={formData.medicalLicenseNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Aadhaar Card</label>
          {/* Show preview if already uploaded */}
          {doctor?.aadhaarCard && (
            <a
              href={doctor.aadhaarCard}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mb-1"
            >
              View Uploaded Aadhaar
            </a>
          )}
          <input
            type="file"
            name="aadhaarCard"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Degree Certificate</label>
          {doctor?.degreeCertificate && (
            <a
              href={doctor.degreeCertificate}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mb-1"
            >
              View Uploaded Certificate
            </a>
          )}
          <input
            type="file"
            name="degreeCertificate"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium">License Document</label>
          {doctor?.licenseDocument && (
            <a
              href={doctor.licenseDocument}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mb-1"
            >
              View Uploaded License
            </a>
          )}
          <input
            type="file"
            name="licenseDocument"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
