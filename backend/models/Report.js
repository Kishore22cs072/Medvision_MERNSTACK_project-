import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  imageUrl: { type: String, required: true }, 
  originalName: { type: String },
  classification: { type: String, required: true },
  accuracy: { type: Number, default: 0 },
  suggestions: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Report", ReportSchema);
