import express from 'express'
import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    timeSlot:{ type: String, required: true },
    reason:  { type: String },

    status:  { type: String, enum: ["pending", "cancelled","confirmed","completed"], default: "pending" },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },
    transactionId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    }
},{ timestamps: true })

export const Appointment = mongoose.model("Appointment", appointmentSchema);