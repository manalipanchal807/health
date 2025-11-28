import express from 'express'
import { loginUser, me, registerUser, sendOtp, verifyOtp } from '../controllers/user.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/me",isAuthenticated,me)

// OTP-based login
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;


