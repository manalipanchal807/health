import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";

dotenv.config();

// 📌 Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const { password: _, ...userData } = newUser._doc;

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// 📌 Login with Password
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      message: `Welcome ${user.username}`,
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// 📌 Get Logged-in User
export const me = async (req, res) => {
  const { password: _, ...userData } = req.user._doc;
  res.json({ success: true, user: userData });
};

// 📌 Send OTP to Email
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("📧 OTP request received for:", email);
    
    if (!email)
      return res.status(400).json({ message: "Email is required", success: false });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found", success: false });
    }

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    console.log("🔑 Generated OTP:", otp, "for user:", user.username);

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    console.log("💾 OTP saved to database");

    try {
      await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);
      console.log("✅ OTP email sent successfully");
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError.message);
      // Still return success but with a warning
      return res.json({ 
        message: "OTP generated but email failed. Check server logs. OTP: " + otp, 
        success: true,
        otp: process.env.NODE_ENV === 'development' ? otp : undefined // Only show OTP in dev mode
      });
    }

    res.json({ message: "OTP sent to email", success: true });
  } catch (error) {
    console.error("❌ Send OTP error:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// 📌 Verify OTP & Login
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ message: "Email and OTP are required", success: false });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP", success: false });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    const { password: _, ...userData } = user._doc;

    res.json({
      message: "OTP verified. Login successful",
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
