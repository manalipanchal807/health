import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const AddPrescriptions = () => {
  const [appointment, setAppointment] = useState("");
  const { id } = useParams();
  const { url } = useContext(AppContext);
  const token = localStorage.getItem("loginManaliToken");
  const navigate = useNavigate();
  const [patientCareTakers, setPatientCareTakers] = useState([]);

  // ⭐ Load appointment first
  useEffect(() => {
    fetchAppointmentById();
  }, []);

  // ⭐ After appointment loads → fetch the patient and update form data
  useEffect(() => {
    if (appointment && appointment.patient) {
      console.log('Appointment loaded:', appointment);
      setFormData(prev => ({
        ...prev,
        patient: appointment.patient,
        appointment: appointment._id  // Ensure we're using the correct field
      }));
      fetchPatientProfile(appointment.patient);
    }
  }, [appointment]);

  // ⭐ Fetch appointment
  const fetchAppointmentById = async () => {
    try {
      console.log('Fetching appointment with ID:', id);
      const res = await axios.get(`${url}/appointment/get`, {
        params: { id }, 
        headers: { 
          'Content-Type': 'application/json',
          'Auth': token 
        },
      });
      
      if (res.data && res.data.appointment) {
        console.log('Appointment data received:', res.data.appointment);
        setAppointment(res.data.appointment);
      } else {
        console.error('No appointment data in response:', res.data);
        alert('Error: Could not load appointment details. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching appointment:', error);
      alert(`Error loading appointment: ${error.message}`);
    }
  };

  // ⭐ Fetch patient
  const fetchPatientProfile = async (patientId) => {
    try {
      const res = await axios.get(`${url}/patient/get`, {
        params: { id: patientId }, 
        headers: { Auth: token },
      });

      setPatientCareTakers(res.data.patient.careTakers);
    } catch (err) {
      console.error("Error fetching patient profile", err);
    }
  };

  // ⭐ When appointment + caretakers both loaded → fill formData
  useEffect(() => {
    if (appointment) {
      setFormData((prev) => ({
        ...prev,
        patient: appointment.patient,
        appointment: appointment._id,
        caretakers: patientCareTakers.length > 0 
          ? patientCareTakers.map((c) => c.email || '').filter(Boolean) 
          : ['']
      }));
      
      // Log for debugging
      console.log('Form data updated with appointment:', {
        patient: appointment.patient,
        appointmentId: appointment._id,
        hasCaretakers: patientCareTakers.length > 0
      });
    }
  }, [appointment, patientCareTakers]);


  // ⭐ INITIAL formData MUST be empty for patient
  const [formData, setFormData] = useState({
    patient: "",     // ← FIXED
    caretakers: [""],
    appointment: id,
    diagnosis: "",
    additionalNotes: "",
    medicines: [
      {
        name: "",
        dosage: "",
        frequency: "",
        times: [""],
        duration: "",
        instructions: "",
        startDate: "",
      },
    ],
  });

  // HANDLERS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaretakerChange = (index, value) => {
    const updated = [...formData.caretakers];
    updated[index] = value;
    setFormData({ ...formData, caretakers: updated });
  };

  const addCaretaker = () => {
    setFormData({ ...formData, caretakers: [...formData.caretakers, ""] });
  };

  const handleMedicineChange = (index, field, value) => {
    const meds = [...formData.medicines];
    meds[index][field] = value;
    setFormData({ ...formData, medicines: meds });
  };

  const handleTimeChange = (medIndex, timeIndex, value) => {
    const meds = [...formData.medicines];
    meds[medIndex].times[timeIndex] = value;
    setFormData({ ...formData, medicines: meds });
  };

  const addTime = (medIndex) => {
    const meds = [...formData.medicines];
    meds[medIndex].times.push("");
    setFormData({ ...formData, medicines: meds });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [
        ...formData.medicines,
        {
          name: "",
          dosage: "",
          frequency: "",
          times: [""],
          duration: "",
          instructions: "",
          startDate: "",
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate required fields before submission
      if (!formData.patient) {
        alert('Error: Patient information is missing. Please try refreshing the page.');
        return;
      }

      if (!formData.diagnosis || formData.diagnosis.trim() === '') {
        alert('Please enter a diagnosis before saving.');
        return;
      }

      // Filter out empty medicine entries and validate required fields
      const validMedicines = formData.medicines
        .map(med => ({
          name: med.name.trim(),
          dosage: med.dosage.trim() || 'As directed',
          frequency: med.frequency.trim() || 'Daily',
          times: med.times.filter(time => time.trim() !== ''),
          duration: med.duration ? parseInt(med.duration) : 7, // Default to 7 days if not provided
          instructions: med.instructions.trim() || 'Take as directed by physician',
          startDate: med.startDate || new Date().toISOString().split('T')[0]
        }))
        .filter(med => med.name !== '');

      if (validMedicines.length === 0) {
        alert('Please add at least one medicine to the prescription.');
        return;
      }

      // Prepare the data in the format expected by the backend
      const prescriptionData = {
        patientId: formData.patient,
        appointmentId: formData.appointment,
        caretakers: formData.caretakers
          .map(c => c.trim())
          .filter(caretaker => {
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return caretaker !== '' && emailRegex.test(caretaker);
          }),
        diagnosis: formData.diagnosis.trim(),
        additionalNotes: formData.additionalNotes.trim(),
        medicines: validMedicines
      };

      console.log('Submitting prescription:', JSON.stringify(prescriptionData, null, 2));

      const res = await axios.post(
        `${url}/prescription/add-prescription`,
        prescriptionData,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Auth': token 
          },
          validateStatus: (status) => status < 500 // Don't throw for 4xx errors
        }
      );

      if (res.status === 201) {
        alert('Prescription saved successfully!');
        navigate('/doctor/get-appointments');
      } else if (res.data && res.data.message) {
        // Show server error message if available
        alert(`Error: ${res.data.message}`);
      } else {
        alert('Failed to save prescription. Please check all fields and try again.');
      }
    } catch (error) {
      console.error('Error submitting prescription:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Prescription</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Patient */}
        <input
          type="text"
          name="patient"
          value={formData.patient}
          placeholder="Patient ID"
          className="w-full p-2 border rounded"
          required
          readOnly
        />

        {/* Appointment */}
        <input
          type="text"
          name="appointment"
          value={formData.appointment}
          placeholder="Appointment ID"
          className="w-full p-2 border rounded"
          readOnly
          required
        />

        {/* Diagnosis */}
        <input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
          className="w-full p-2 border rounded"
        />

        {/* Additional Notes */}
        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Additional Notes"
          className="w-full p-2 border rounded"
        />

        {/* Caretakers */}
        <div>
          <h3 className="font-semibold">Caretakers</h3>
          {formData.caretakers.map((ct, i) => (
            <input
              key={i}
              type="email"
              value={ct}
              onChange={(e) => handleCaretakerChange(i, e.target.value)}
              placeholder="Caretaker Email"
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addCaretaker}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Caretaker
          </button>
        </div>

        {/* Medicines */}
        <div>
          <h3 className="font-semibold">Medicines</h3>

          {formData.medicines.map((med, i) => (
            <div key={i} className="border p-3 rounded mb-3">
              <input
                type="text"
                value={med.name}
                onChange={(e) =>
                  handleMedicineChange(i, "name", e.target.value)
                }
                placeholder="Medicine Name"
                className="w-full p-2 border rounded mb-2"
              />

              <input
                type="text"
                value={med.dosage}
                onChange={(e) =>
                  handleMedicineChange(i, "dosage", e.target.value)
                }
                placeholder="Dosage"
                className="w-full p-2 border rounded mb-2"
              />

              <input
                type="text"
                value={med.frequency}
                onChange={(e) =>
                  handleMedicineChange(i, "frequency", e.target.value)
                }
                placeholder="Frequency"
                className="w-full p-2 border rounded mb-2"
              />

              <div>
                <h4 className="text-sm font-medium">Times</h4>
                {med.times.map((t, j) => (
                  <input
                    key={j}
                    type="text"
                    value={t}
                    onChange={(e) =>
                      handleTimeChange(i, j, e.target.value)
                    }
                    placeholder="HH:MM AM/PM"
                    className="w-full p-2 border rounded mb-2"
                  />
                ))}

                <button
                  type="button"
                  onClick={() => addTime(i)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  + Add Time
                </button>
              </div>

              <input
                type="number"
                value={med.duration}
                onChange={(e) =>
                  handleMedicineChange(i, "duration", e.target.value)
                }
                placeholder="Duration (Days)"
                className="w-full p-2 border rounded mb-2"
              />

              <input
                type="text"
                value={med.instructions}
                onChange={(e) =>
                  handleMedicineChange(i, "instructions", e.target.value)
                }
                placeholder="Instructions"
                className="w-full p-2 border rounded mb-2"
              />

              <input
                type="date"
                value={med.startDate}
                onChange={(e) =>
                  handleMedicineChange(i, "startDate", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addMedicine}
            className="px-3 py-1 bg-purple-500 text-white rounded"
          >
            + Add Medicine
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Save Prescription
        </button>
      </form>
    </div>
  );
};

export default AddPrescriptions;
