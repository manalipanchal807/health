import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';
import { createOrUpdateProfile, getAllPatients, getPatientIdForDoctor, getPatientProfile } from '../controllers/patient.js';

const router = express.Router()

router.put("/edit",isAuthenticated,createOrUpdateProfile);
router.get("/profile",isAuthenticated,getPatientProfile);
router.get("/get-all",isAuthenticated,authorizeRoles("admin"),getAllPatients);
router.get("/get",isAuthenticated,authorizeRoles("doctor"),getPatientIdForDoctor);

export default router;