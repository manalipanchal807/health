import { Prescription } from "../Models/Prescription.js";
import { User } from "../Models/User.js";
import { transporter } from "./mail_transporter.js";
import cron from "node-cron";

export const createPrescription = async (req, res) => {
  try {
    const {
      patientId,
      appointmentId,
      caretakers = [],
      medicines = [],
      diagnosis = '',
      additionalNotes = ''
    } = req.body;

    // Validate required fields
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }
    if (!diagnosis || diagnosis.trim() === '') {
      return res.status(400).json({ message: 'Diagnosis is required' });
    }
    if (!medicines || medicines.length === 0) {
      return res.status(400).json({ message: 'At least one medicine is required' });
    }

    const newPrescription = new Prescription({
      patient: patientId,
      caretakers: Array.isArray(caretakers) ? caretakers : [],
      doctor: req.user._id,
      appointment: appointmentId,
      medicines: Array.isArray(medicines) ? medicines : [],
      diagnosis: diagnosis.trim(),
      additionalNotes: additionalNotes ? additionalNotes.trim() : ''
    });

    await newPrescription.save();

    // Get patient email
    const patientData = await User.findOne({ _id: patientId });
    
    if (!patientData || !patientData.email) {
      console.error('Patient not found or has no email:', patientId);
      return res.status(201).json({
        message: 'Prescription created but could not send email (patient email not found)',
        prescription: newPrescription,
        success: true,
      });
    }

    const patientEmail = patientData.email;

    // Create recipient list (patient + caretakers)
    const recipients = [patientEmail, ...caretakers];

    // Send email
    try {
      const recipients = [patientEmail, ...(Array.isArray(caretakers) ? caretakers : [])];
      
      // Process medicine times for scheduling
      const medicineSchedules = [];
      
      medicines.forEach((medicine) => {
        if (!medicine.times || !Array.isArray(medicine.times)) return;
        
        medicine.times.forEach((timeStr) => {
          if (!timeStr) return;
          
          try {
            const [time, period] = timeStr.split(' ');
            let [hour, minute] = time.split(':').map(Number);
            
            // Convert to 24-hour format
            if (period === 'PM' && hour < 12) hour += 12;
            if (period === 'AM' && hour === 12) hour = 0;
            
            medicineSchedules.push({
              minute,
              hour,
              medicine,
              timeStr
            });
          } catch (err) {
            console.error('Error parsing time:', timeStr, err);
          }
        });
      });
      
      // Schedule each unique time
      const uniqueTimes = [...new Set(medicineSchedules.map(m => `${m.hour}:${m.minute}`))];
      
      uniqueTimes.forEach(timeStr => {
        const [hour, minute] = timeStr.split(':').map(Number);
        const medsForThisTime = medicineSchedules
          .filter(m => m.hour === hour && m.minute === minute)
          .map(m => m.medicine);
        
        if (medsForThisTime.length > 0) {
          const job = cron.schedule(`${minute} ${hour} * * *`, () => {
            sendMail(
              recipients,
              diagnosis,
              medsForThisTime,
              additionalNotes,
              medsForThisTime[0].times[0] // Use the first time for the email subject
            );
          });
          
          // Stop job after the maximum duration
          const maxDuration = Math.max(...medsForThisTime.map(m => m.duration || 7));
          setTimeout(() => job.stop(), maxDuration * 24 * 60 * 60 * 1000);
        }
      });
    } catch (error) {
      console.error('Error scheduling emails:', error);
      // Don't fail the request if email scheduling fails
    }

    res.status(201).json({
      message: "Prescription created and emails sent!",
      prescription: newPrescription,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sendMail = async (
  recipients,
  diagnosis,
  medicines,
  additionalNotes,
  time
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: recipients,
    subject: `Medicine Reminder ⏰ (${time})`,
    text:
      `Hello, it's time to take your medicine.\n\nDiagnosis: ${diagnosis}\n\n` +
      `Medicine: ${medicines
        .map(
          (m) =>
            `${m.name} - ${m.dosage}, ${m.frequency}, ${m.instructions || ""}`
        )
        .join("\n")}\n\n` +
      `Additional Notes: ${additionalNotes || "None"}\n\nStay healthy!`,
  });
};

// get prescription for doctor/patient
export const getPrescription = async (req, res) => {
  try {
    const { appointmentId } = req.query; // use query instead of body
    let appointment = await Prescription.findOne({
      appointment: appointmentId,
    });

    if (!appointment) {
      return res.status(400).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Found Successfully",
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
