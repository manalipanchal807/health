import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  specialization: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  fees: { type: Number, required: true },
  city: { type: String, required: true },
  clinicAddress: { type: String },
  availability: { type: [String] }, // e.g. ["Mon-Fri 10am-5pm"]

  // New fields for verification
  medicalLicenseNumber: { type: String, required: true },
  licenseDocument: { type: String }, // Cloudinary/Firebase file URL
  degreeCertificate: { type: String },
  aadhaarCard: { type: String },

  isApproved: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
