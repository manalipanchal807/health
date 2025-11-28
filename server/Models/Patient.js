import mongoose from "mongoose";

const careTakersData = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => /^[0-9]{10}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
  },
});

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    unique: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => /^[0-9]{10}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
  },
  blood_group: {
    type: String,
  },
  allergies: {
    type: [String], 
    default: ["None"],
  },
  careTakers: [careTakersData], 
});

export const Patient = mongoose.model("Patient", patientSchema);
