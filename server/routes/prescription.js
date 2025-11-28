import express from 'express'
import { createPrescription, getPrescription } from '../controllers/prescription.js';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';

const router = express.Router()

router.post("/add-prescription",isAuthenticated,authorizeRoles("doctor"),createPrescription)
router.get("/get-prescription",isAuthenticated,authorizeRoles("doctor","patient"),getPrescription)

export default router;