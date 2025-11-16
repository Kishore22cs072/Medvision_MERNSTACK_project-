import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number },
  gender: { type: String },
  notes: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Patient", PatientSchema);
