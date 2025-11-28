import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';
import { bookAppointment,verifyPayment, doctorAppointments, getAppointmentById, myAppointments, updateAppointmentStatus } from '../controllers/appointment.js';

const router = express()

// 📌 Book an appointment (only patients)
router.post("/", isAuthenticated, authorizeRoles("patient"), bookAppointment);

router.post(
  "/verify-payment",
  isAuthenticated,
  authorizeRoles("patient"),
  verifyPayment
);


// 📌 Get logged-in patient’s appointments
router.get("/my", isAuthenticated, authorizeRoles("patient"), myAppointments);

// 📌 Get doctor’s appointments
router.get("/doctor", isAuthenticated, authorizeRoles("doctor"), doctorAppointments);

// 📌 Update appointment status (doctor only)
router.put("/status", isAuthenticated, authorizeRoles("doctor"), updateAppointmentStatus);

// get appointment by id
router.get("/get", isAuthenticated, getAppointmentById);


export default router;