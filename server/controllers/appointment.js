import { Appointment } from "../Models/Appointment.js";
import { Doctor } from "../Models/Doctor.js";
import { transporter } from "./mail_transporter.js";
import { User } from "../Models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// patient appointment

// export const bookAppointment = async (req, res) => {
//   try {
//     const { doctorId, date, timeSlot, reason,amount } = req.body;
//     if (!doctorId || !date || !timeSlot) {
//       return res.status(400).json({
//         success: false,
//         message: "doctorId, date, timeSlot required",
//       });
//     }

//     // find doctor by userId
//     const doctor = await Doctor.findOne({ user: doctorId });
//     if (!doctor || !doctor.isApproved) {
//       return res
//         .status(400)
//         .json({ message: "Doctor not available", success: false });
//     }

//     // check if already booked
//     const existingAppointment = await Appointment.findOne({
//       patient: req.user._id,
//       doctor: doctor._id,
//       date: new Date(date),
//       timeSlot,
//     });

//     if (existingAppointment) {
//       return res.status(400).json({
//         message: "You already booked an appointment for this slot",
//         success: false,
//         existingAppointment,
//       });
//     }

//     const appt = await Appointment.create({
//       patient: req.user._id,
//       doctor: doctor._id, // ✅ store Doctor._id
//       date: new Date(date),
//       timeSlot,
//       reason,
//     });

//     res.status(201).json({
//       message: "Appointment Booked SuccessFully",
//       success: true,
//       appt,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;
    if (!doctorId || !date || !timeSlot)
      return res.status(400).json({ success: false, message: "Missing fields" });

    // Find doctor
    const doctor = await Doctor.findOne({ user: doctorId });
    if (!doctor || !doctor.isApproved)
      return res.status(400).json({ success: false, message: "Doctor not available" });

    const amount = doctor.fees; // assume doctor model has `fee` field

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in paise
      currency: "inr",
      metadata: { integration_check: "accept_a_payment" },
    });

    // Create appointment (pending payment)
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctor._id,
      date: new Date(date),
      timeSlot,
      reason,
      amount,
      paymentStatus: "unpaid",
      status: "pending",
    });

    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: "Payment initiated. Complete payment to confirm appointment.",
      appointmentId: appointment._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify payment after success
export const verifyPayment = async (req, res) => {
  try {
    const { appointmentId, transactionId } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ success: false, message: "Appointment not found" });

    appointment.paymentStatus = "paid";
    appointment.transactionId = transactionId;
    appointment.status = "confirmed";
    await appointment.save();

    res.status(200).json({ success: true, message: "Payment verified and appointment confirmed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// patient appointements
export const myAppointments = async (req, res) => {
  try {
    const list = await Appointment.find({ patient: req.user._id })
      .populate({
        path: "doctor",
        populate: { path: "user", select: "username email" },
      })

      .sort({ date: -1 });
    res.json({ success: true, appointments: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const doctorAppointments = async (req, res) => {
  try {
    // get doctor profile by logged-in user
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor profile not found" });
    }

    const list = await Appointment.find({ doctor: doctor._id })
      .populate({ path: "patient", select: "username email" })
      .sort({ date: -1 });

    res.json({ success: true, appointments: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update appointment status (accept / reject / completed)

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    // Validate status
    if (!["confirmed", "pending", "cancelled", "completed"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    // Find doctor linked to the logged-in user
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor profile not found" });
    }

    // Update appointment
    const appt = await Appointment.findOneAndUpdate(
      { _id: appointmentId, doctor: doctor._id }, // ✅ use Doctor _id, not User _id
      { status },
      { new: true }
    );

    if (!appt) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    // console.log(appt.patient, appt.doctor);

    let checkPatient = await User.findOne(appt.patient);
    if (!checkPatient) {
      return res
        .status(404)
        .json({ message: "Patient Not Found", success: false });
    }
    let checkDoctor = await Doctor.findOne(appt.doctor);
    if (!checkDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor not found", success: false });
    } else {
      checkDoctor = await User.findOne(checkDoctor.user);
      if (!checkDoctor) {
        return res.status(400).json({ message: "Not Found", success: false });
      }
    }
    // console.log(checkDoctor.username);
    // console.log(checkPatient.email);
    // console.log(status);

    await sendAppointmentMail(checkPatient.email, checkDoctor.username, status);
    // console.log("Heloo Maulik");

    res.json({ success: true, appointment: appt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//   send Mail form doctor to patient
const sendAppointmentMail = async (to, doctorName, status) => {
  let subject = "";
  let message = "";

  if (status === "confirmed") {
    subject = "Your Appointment is Confirmed ✅";
    message = `Hello, your appointment with Dr. ${doctorName} has been confirmed. Please make sure to arrive on time.`;
  } else if (status === "cancelled") {
    subject = "Your Appointment is Rejected ❌";
    message = `Hello, unfortunately your appointment with Dr. ${doctorName} has been cancelled. Please try rescheduling at your convenience.`;
  } else if (status === "completed") {
    subject = "Your Appointment is Completed ✅";
    message = `Hello, your appointment with Dr. ${doctorName} has been successfully completed. Thank you for visiting!`;
  } else {
    subject = "Your Appointment is Pending ⌛";
    message = `Hello, your appointment with Dr. ${doctorName} is pending confirmation. You will receive an update soon.`;
  }

  // const message =
  //   status === "accepted"
  //     ? `Hello, your appointment with Dr. ${doctorName} has been accepted. Please arrive on time.`
  //     : `Hello, unfortunately your appointment with Dr. ${doctorName} has been rejected. Please try rescheduling.`;

  await transporter.sendMail({
    from: `"HealthCare App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
  });
};



// get appointment by id 
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.query; // <-- from query
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(400).json({
        message: "Appointment not found",
        success: false,
      });
    }
console.log(appointment.patient);

    res.status(200).json({
      message: "Found Successfully",
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
