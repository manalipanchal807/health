import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to patient
      required: true,
    },
    caretakers: [
      {
        type: String, // Array of caretaker emails
        required: true,
      },
    ],
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    medicines: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        times: [{ type: String }], // e.g. ["08:00 AM", "08:00 PM"]
        duration: { type: Number, required: true }, // in days
        instructions: { type: String },
        startDate: { type: Date, default: Date.now },
      },
    ],
    diagnosis: {
      type: String,
      required: true,
    },
    additionalNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema
);
