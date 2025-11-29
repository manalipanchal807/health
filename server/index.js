import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import doctorRouter from "./routes/doctor.js";
import appointmentRouter from "./routes/appointment.js";
import patientRouter from "./routes/patient.js";
import prescriptionRouter from "./routes/prescription.js";
dotenv.config();

const app = express();

app.use(express.json());
// ✅ Configure CORS properly
app.use(cors({
  origin: [
    "http://localhost:5173", // Local development
    "https://personalhealthrecord.vercel.app",
    "https://personalhealthrecord.vercel.app/" // Netlify frontend (no trailing slash)
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Auth"],
  credentials: true
}));
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/patient", patientRouter);
app.use("/api/prescription",prescriptionRouter)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Health check endpoint to verify configuration
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || "development",
      mongoConnected: mongoose.connection.readyState === 1,
      emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
      emailUser: process.env.EMAIL_USER ? "✅ Set" : "❌ Not set"
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 App is running on port ${port}`);
});
