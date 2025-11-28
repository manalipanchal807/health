import { Doctor } from "../Models/Doctor.js";
import { User } from "../Models/User.js";
import { transporter } from "./mail_transporter.js";


//update doctor profile
export const updateProfile = async (req, res) => {
  try {
    const {
      specialization,
      experienceYears,
      fees,
      city,
      clinicAddress,
      availability,
      medicalLicenseNumber
    } = req.body;

    if (!specialization || !experienceYears || !fees || !city || !medicalLicenseNumber) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }

    // Handle uploaded files
    let licenseDocument, degreeCertificate, aadhaarCard;
    if (req.files["licenseDocument"]) {
      licenseDocument = req.files["licenseDocument"][0].path;
    }
    if (req.files["degreeCertificate"]) {
      degreeCertificate = req.files["degreeCertificate"][0].path;
    }
    if (req.files["aadhaarCard"]) {
      aadhaarCard = req.files["aadhaarCard"][0].path;
    }

    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        specialization,
        experienceYears,
        fees,
        city,
        clinicAddress,
        availability,
        ...(licenseDocument && { licenseDocument }),
        ...(degreeCertificate && { degreeCertificate }),
        ...(aadhaarCard && { aadhaarCard }),
        medicalLicenseNumber
      },
      { new: true, runValidators: true, upsert: true }
    );

    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Something went wrong", success: false });
    }

    res.status(200).json({
      message: "Profile Updated Successfully",
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// approve doctor (Admin)
export const approveDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body; 

    const doc = await Doctor.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    let findDoctor = await User.findOne(doc.user)
    if(!findDoctor)
    {
      return res.status(400).json({message:"Doctor Not Found",success:false})
    }

    // ✅ Send Email Notification
    let subject, text;
    if (isApproved == "approved") {
      subject = "Doctor Account Approved ✅";
      text = `Dear Dr. ${findDoctor.username},\n\nYour account has been approved by the admin. You can now access the platform.\n\nBest Regards,\nHealthCare Team`;
    } else {
      subject = "Doctor Account Rejected ❌";
      text = `Dear Dr. ${findDoctor.username},\n\nWe regret to inform you that your account has been rejected by the admin. Please contact support for more details.\n\nBest Regards,\nHealthCare Team`;
    }

    await transporter.sendMail({
      from: `"HealthCare Admin" <${process.env.EMAIL_USER}>`,
      to: findDoctor.email,
      subject,
      text,
    });

    res.json({ success: true, doctor: doc, message: "Doctor status updated & mail sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// find doctor by doctor id
export const getDoctorById = async (req, res) => {
  try {
    // console.log(req.params.id);
    
    const doc = await Doctor.findOne({user:req.params.id}).populate("user", "username email role");
    // console.log(doc);
    
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, doctor: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Get all doctors (admin only)
export const getAllDoctors = async (_req, res) => {
  try {
    const docs = await Doctor.find().populate("user", "username email role");
    res.json({ success: true, doctors: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


