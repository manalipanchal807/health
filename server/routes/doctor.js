import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import {
  approveDoctor,
  getAllDoctors,
  getDoctorById,
  updateProfile,
} from "../controllers/doctor.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Update doctor profile (doctor only)
router.put(
  "/update",
  isAuthenticated,
  authorizeRoles("doctor"),
  upload.fields([
    { name: "licenseDocument", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "aadhaarCard", maxCount: 1 },
  ]),
  
  
  updateProfile
);

// Admin approves doctor
router.put(
  "/:id/approve",
  isAuthenticated,
  authorizeRoles("admin"),
  approveDoctor
);

// ✅ All doctors (must come before /:id)
router.get("/", isAuthenticated, authorizeRoles("admin","patient"), getAllDoctors);

// ✅ Single doctor by ID
router.get("/:id", isAuthenticated, getDoctorById);

export default router;
