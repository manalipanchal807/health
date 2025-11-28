import { Patient } from "../Models/Patient.js";

export const createOrUpdateProfile = async (req, res) => {
  try {
    const { age, gender, phone, email, blood_group, allergies, careTakers } =
      req.body;

    const patient = await Patient.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        age,
        gender,
        phone,
        email,
        blood_group,
        allergies,
        careTakers,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile created/updated successfully",
      patient,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPatientProfile = async(req,res) =>
{
   try {
    const profile = await Patient.findOne({user:req.user._id})
    if(!profile)
    {
      return res.status(400).json({message:"Patient not found",success:false})
    }
    res.status(200).json({message:"Patient Found",success:true,profile})
   } catch (error) {
    res.status(400).json({message:error.message})
   }
}

// get all patients
export const getAllPatients = async(req,res) =>{
  try {
    const patients = await Patient.find()
    if(!patients)
    {
      return res.status(400).json({message:"Something went wrong",success:false})
    }
    if(patients.length == 0)
    {
      return res.json({message:"No patient found"})
    }
    res.status(200).json({message:"Successfully found",success:true,patients})
  } catch (error) {
     res.status(400).json({message:error.message})
  }
}

// get patient profile by id for doctor
export const getPatientIdForDoctor = async(req,res) =>{
  try {
    const {id} = req.query;
    let patient = await Patient.findOne({user:id})
    if(!patient)
    {
      return res.status(400).json({message:"Patient not found",success:false})
    }
    res.status(200).json({message:"Found Successfully",success:true,patient})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}