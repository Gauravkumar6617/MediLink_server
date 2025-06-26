import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  specialization: {
    type: [String],
    required: true,
  },

  phone: {
    type: Number,
    required: true, // ✅ fixed
  },

  experience: {
    type: Number,
    default: 0,
  },

  doctorCode: {
    type: String,
    required: true,
    unique: true, // e.g., HOSP-4567-DR001
  },

  role: {
    type: String,
    enum: ["doctor"],
    default: "doctor",
  },

  isActive: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    default: null,
  },

  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
}, { timestamps: true }); // ✅ Recommended

export default mongoose.model("Doctor", DoctorSchema);
